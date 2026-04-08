import { type NextFunction, type Request, type Response } from "express";
import { ZodError } from "zod";

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: "Route not found",
  });
}

export function globalErrorHandler(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: error.flatten(),
    });
    return;
  }

  const message = error.message.toLowerCase();

  if (message.includes("not found")) {
    res.status(404).json({ error: error.message });
    return;
  }

  if (message.includes("locked")) {
    res.status(423).json({ error: error.message });
    return;
  }

  if (
    message.includes("unauthorized") ||
    message.includes("invalid credential") ||
    message.includes("invalid two-factor") ||
    message.includes("refresh token") ||
    message.includes("signature")
  ) {
    res.status(401).json({
      error: error.message,
    });
    return;
  }

  if (message.includes("required") || message.includes("failed")) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  console.error("Unhandled API error", error);
  res.status(500).json({
    error: "Internal server error",
  });
}
