import { prisma, type User } from "@magnence/db";
import { compare, hash } from "bcryptjs";
import speakeasy from "speakeasy";
import { env } from "../config/env.js";
import { signAccessToken, verifyAccessToken } from "../lib/jwt.js";
import {
  decryptSensitiveValue,
  encryptSensitiveValue,
  generateSecureToken,
  sha256,
} from "../lib/security/crypto.js";

const BCRYPT_COST = 12;
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

type LoginInput = {
  email: string;
  password: string;
  totpCode?: string;
  backupCode?: string;
};

type PublicAuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: User["role"];
  phone: string | null;
  twoFactorEnabled: boolean;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: Date;
};

export async function loginWithCredentials(input: LoginInput): Promise<
  | { requiresTwoFactor: true; message: string }
  | { requiresTwoFactor: false; user: PublicAuthUser; tokens: AuthTokens }
> {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user || !user.passwordHash) {
    return invalidCredentialsResponse();
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw new Error("Account temporarily locked due to too many failed attempts.");
  }

  const validPassword = await compare(input.password, user.passwordHash);
  if (!validPassword) {
    await recordFailedLogin(user);
    return invalidCredentialsResponse();
  }

  await resetFailedLoginState(user.id);

  if (user.twoFactorEnabled) {
    const twoFactorPassed = await verifyTwoFactorChallenge(user, input);
    if (!twoFactorPassed) {
      if (!input.totpCode && !input.backupCode) {
        return {
          requiresTwoFactor: true,
          message: "2FA code required to complete login.",
        };
      }
      throw new Error("Invalid two-factor authentication code.");
    }
  }

  const tokens = await issueAuthTokens(user);
  return {
    requiresTwoFactor: false,
    user: toPublicUser(user),
    tokens,
  };
}

export async function refreshAuthToken(refreshToken: string): Promise<{ user: PublicAuthUser; tokens: AuthTokens }> {
  const tokenHash = sha256(refreshToken);
  const existing = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!existing) {
    throw new Error("Invalid refresh token.");
  }

  if (existing.revokedAt) {
    // Potential token replay: invalidate entire family.
    await prisma.refreshToken.updateMany({
      where: { family: existing.family, userId: existing.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    throw new Error("Refresh token replay detected. Please log in again.");
  }

  if (existing.expiresAt <= new Date()) {
    await prisma.refreshToken.update({
      where: { id: existing.id },
      data: { revokedAt: new Date() },
    });
    throw new Error("Refresh token expired.");
  }

  const tokens = await rotateRefreshToken(existing.id, existing.user);
  return {
    user: toPublicUser(existing.user),
    tokens,
  };
}

export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  const tokenHash = sha256(refreshToken);
  await prisma.refreshToken.updateMany({
    where: {
      tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function setupTwoFactor(userId: string): Promise<{
  otpauthUrl: string;
  base32: string;
  backupCodes: string[];
}> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found.");
  }

  const secret = speakeasy.generateSecret({
    length: 20,
    name: `Magnence (${user.email})`,
    issuer: "Magnence",
  });

  if (!secret.base32 || !secret.otpauth_url) {
    throw new Error("Failed to generate TOTP secret.");
  }

  const encryptedSecret = encryptSensitiveValue(secret.base32);
  const backupCodes = generateBackupCodes();

  await prisma.$transaction(async (tx) => {
    await tx.twoFactorBackupCode.deleteMany({ where: { userId } });
    await tx.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: encryptedSecret,
        twoFactorEnabled: false,
      },
    });
    await tx.twoFactorBackupCode.createMany({
      data: backupCodes.map((code) => ({
        userId,
        codeHash: sha256(code),
      })),
    });
  });

  return {
    otpauthUrl: secret.otpauth_url,
    base32: secret.base32,
    backupCodes,
  };
}

export async function verifyTwoFactorSetup(userId: string, code: string): Promise<{ success: true }> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.twoFactorSecret) {
    throw new Error("2FA setup is not initialized.");
  }

  const decryptedSecret = decryptSensitiveValue(user.twoFactorSecret);
  if (!decryptedSecret) {
    throw new Error("Failed to decrypt TOTP secret.");
  }

  const valid = speakeasy.totp.verify({
    secret: decryptedSecret,
    encoding: "base32",
    token: code,
    window: 1,
  });

  if (!valid) {
    throw new Error("Invalid TOTP code.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorEnabled: true },
  });

  return { success: true };
}

export async function rotateBackupCodes(userId: string): Promise<string[]> {
  const backupCodes = generateBackupCodes();
  await prisma.$transaction(async (tx) => {
    await tx.twoFactorBackupCode.deleteMany({ where: { userId } });
    await tx.twoFactorBackupCode.createMany({
      data: backupCodes.map((code) => ({
        userId,
        codeHash: sha256(code),
      })),
    });
  });
  return backupCodes;
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<{ success: true }> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.passwordHash) {
    throw new Error("Password authentication is not available for this account.");
  }

  const valid = await compare(currentPassword, user.passwordHash);
  if (!valid) {
    throw new Error("Current password is incorrect.");
  }

  const nextHash = await hash(newPassword, BCRYPT_COST);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: nextHash,
        passwordChangedAt: new Date(),
        tokenVersion: {
          increment: 1,
        },
      },
    }),
    prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  return { success: true };
}

export async function getAuthenticatedUserFromAccessToken(token: string): Promise<PublicAuthUser | null> {
  try {
    const payload = verifyAccessToken(token);
    if (payload.type !== "access") {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return null;
    }

    if (payload.tokenVersion !== user.tokenVersion) {
      return null;
    }

    if (user.passwordChangedAt) {
      const issuedAtMs = payload.iat * 1000;
      if (issuedAtMs < user.passwordChangedAt.getTime()) {
        return null;
      }
    }

    return toPublicUser(user);
  } catch {
    return null;
  }
}

export async function encryptPhone(phone: string | null | undefined): Promise<{
  phone: null;
  phoneEncrypted: string | null;
}> {
  if (!phone) {
    return { phone: null, phoneEncrypted: null };
  }

  return {
    phone: null,
    phoneEncrypted: encryptSensitiveValue(phone),
  };
}

function toPublicUser(user: User): PublicAuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: decryptSensitiveValue(user.phoneEncrypted) ?? user.phone ?? null,
    twoFactorEnabled: user.twoFactorEnabled,
  };
}

async function verifyTwoFactorChallenge(
  user: User,
  input: { totpCode?: string; backupCode?: string },
): Promise<boolean> {
  const totpCode = input.totpCode?.trim();
  if (totpCode) {
    const decryptedSecret = decryptSensitiveValue(user.twoFactorSecret);
    if (!decryptedSecret) {
      return false;
    }
    return speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: "base32",
      token: totpCode,
      window: 1,
    });
  }

  const backupCode = input.backupCode?.trim().toUpperCase();
  if (!backupCode) {
    return false;
  }

  const codeHash = sha256(backupCode);
  const backupCodeRow = await prisma.twoFactorBackupCode.findFirst({
    where: {
      userId: user.id,
      codeHash,
      usedAt: null,
    },
  });

  if (!backupCodeRow) {
    return false;
  }

  await prisma.twoFactorBackupCode.update({
    where: { id: backupCodeRow.id },
    data: { usedAt: new Date() },
  });
  return true;
}

async function issueAuthTokens(user: User): Promise<AuthTokens> {
  const refreshToken = generateSecureToken(64);
  const refreshExpiresAt = new Date(Date.now() + env.JWT_REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  const family = generateSecureToken(32);
  const tokenHash = sha256(refreshToken);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      family,
      expiresAt: refreshExpiresAt,
    },
  });

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  });

  return {
    accessToken,
    refreshToken,
    refreshExpiresAt,
  };
}

async function rotateRefreshToken(currentTokenId: string, user: User): Promise<AuthTokens> {
  const nextRefreshToken = generateSecureToken(64);
  const nextExpiresAt = new Date(Date.now() + env.JWT_REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  const nextTokenHash = sha256(nextRefreshToken);

  const existing = await prisma.refreshToken.findUnique({
    where: { id: currentTokenId },
  });
  if (!existing) {
    throw new Error("Refresh token not found.");
  }

  const nextToken = await prisma.refreshToken.create({
    data: {
      userId: user.id,
      family: existing.family,
      tokenHash: nextTokenHash,
      expiresAt: nextExpiresAt,
    },
  });

  await prisma.refreshToken.update({
    where: { id: currentTokenId },
    data: {
      revokedAt: new Date(),
      replacedByTokenId: nextToken.id,
    },
  });

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  });

  return {
    accessToken,
    refreshToken: nextRefreshToken,
    refreshExpiresAt: nextExpiresAt,
  };
}

async function resetFailedLoginState(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });
}

async function recordFailedLogin(user: User): Promise<void> {
  const nextFailedCount = user.failedLoginAttempts + 1;
  await prisma.user.update({
    where: { id: user.id },
    data: {
      failedLoginAttempts: nextFailedCount,
      lockedUntil: nextFailedCount >= MAX_FAILED_ATTEMPTS ? new Date(Date.now() + LOCK_DURATION_MS) : null,
    },
  });
}

function invalidCredentialsResponse(): never {
  throw new Error("Invalid credentials.");
}

function generateBackupCodes(count = 8): string[] {
  return Array.from({ length: count }, () => {
    const token = generateSecureToken(6).replace(/[^A-Z0-9]/gi, "").toUpperCase();
    const normalized = token.padEnd(10, "X").slice(0, 10);
    return `${normalized.slice(0, 5)}-${normalized.slice(5)}`;
  });
}
