import { type NextFunction, type Request, type Response } from "express";
import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { getRedisClient } from "./redis.js";

type RateLimitOptions = {
  keyPrefix: string;
  points: number;
  duration: number;
};

export function createRateLimitMiddleware(options: RateLimitOptions) {
  const redis = getRedisClient();
  const limiter = redis
    ? new RateLimiterRedis({
        storeClient: redis,
        points: options.points,
        duration: options.duration,
        keyPrefix: options.keyPrefix,
      })
    : new RateLimiterMemory({
        points: options.points,
        duration: options.duration,
        keyPrefix: options.keyPrefix,
      });

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const key = req.user?.id ?? req.ip ?? req.socket.remoteAddress ?? "anonymous";

    try {
      await limiter.consume(key);
      next();
    } catch {
      res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }
  };
}
