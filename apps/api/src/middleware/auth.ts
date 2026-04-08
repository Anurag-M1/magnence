import { type NextFunction, type Request, type Response } from "express";
import { getAuthenticatedUserFromAccessToken } from "../services/auth.service.js";

type AuthUser = {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "TEAM_MEMBER" | "CLIENT";
  name: string | null;
  phone: string | null;
  twoFactorEnabled: boolean;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}

function parseBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const token = parseBearerToken(req.headers.authorization);
  if (!token) {
    next();
    return;
  }

  try {
    const user = await getAuthenticatedUserFromAccessToken(token);
    req.user = user ?? undefined;
  } catch {
    req.user = undefined;
  }

  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
