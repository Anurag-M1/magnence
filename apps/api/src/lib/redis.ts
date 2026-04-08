import { Redis } from "ioredis";
import { env } from "../config/env.js";

type RedisClient = Redis;

let client: RedisClient | null = null;

export function getRedisClient(): RedisClient | null {
  if (!env.REDIS_URL) {
    return null;
  }

  if (client) {
    return client;
  }

  client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    lazyConnect: true,
  });

  client.on("error", (error: unknown) => {
    console.error("Redis connection error", error);
  });

  void client.connect().catch((error: unknown) => {
    console.error("Redis initial connection failed", error);
  });

  return client;
}
