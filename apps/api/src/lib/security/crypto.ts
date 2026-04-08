import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { env } from "../../config/env.js";

const IV_LENGTH = 12;

function getEncryptionKey(): Buffer {
  return createHash("sha256").update(env.PII_ENCRYPTION_KEY).digest();
}

export function encryptSensitiveValue(plainText: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64url")}.${tag.toString("base64url")}.${encrypted.toString("base64url")}`;
}

export function decryptSensitiveValue(payload: string | null | undefined): string | null {
  if (!payload) {
    return null;
  }

  const [ivPart, tagPart, dataPart] = payload.split(".");
  if (!ivPart || !tagPart || !dataPart) {
    return null;
  }

  try {
    const key = getEncryptionKey();
    const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivPart, "base64url"));
    decipher.setAuthTag(Buffer.from(tagPart, "base64url"));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(dataPart, "base64url")), decipher.final()]);
    return decrypted.toString("utf8");
  } catch {
    return null;
  }
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function hmacSha256(secret: string, payload: string | Buffer): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function safeEqualHex(aHex: string, bHex: string): boolean {
  try {
    const a = Buffer.from(aHex, "hex");
    const b = Buffer.from(bHex, "hex");
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function generateSecureToken(byteLength = 48): string {
  return randomBytes(byteLength).toString("base64url");
}
