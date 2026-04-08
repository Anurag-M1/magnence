import { env } from "../../config/env.js";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) {
    // If not configured, treat as permissive in non-production environments.
    return env.NODE_ENV !== "production";
  }

  const payload = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });

  if (remoteIp) {
    payload.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as TurnstileResponse;
  return result.success;
}
