import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { env } from "../config/env.js";

export type AccessTokenPayload = {
  sub: string;
  role: "SUPER_ADMIN" | "ADMIN" | "TEAM_MEMBER" | "CLIENT";
  email: string;
  tokenVersion: number;
  type: "access";
};

export function signAccessToken(payload: Omit<AccessTokenPayload, "type">): string {
  return jwt.sign({ ...payload, type: "access" }, env.JWT_ACCESS_SECRET, {
    jwtid: crypto.randomUUID(),
    expiresIn: "15m",
    subject: payload.sub,
    issuer: "magnence-api",
    audience: "magnence-clients",
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload & { iat: number; exp: number; jti: string } {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: "magnence-api",
    audience: "magnence-clients",
  }) as AccessTokenPayload & {
    iat: number;
    exp: number;
    jti: string;
  };
}
