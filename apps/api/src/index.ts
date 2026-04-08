import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import http from "node:http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { Queue } from "bullmq";
import { Server as SocketIOServer } from "socket.io";
import { corsOrigins, env } from "./config/env.js";
import { getRedisClient } from "./lib/redis.js";
import { optionalAuth } from "./middleware/auth.js";
import { globalErrorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { restRouter } from "./routers/rest.js";
import { createContext } from "./trpc/context.js";
import { appRouter } from "./trpc/router.js";
import { webhookRouter } from "./webhooks/routes.js";

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: corsOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.emit("connection_ack", { connectedAt: new Date().toISOString() });
});

const redis = getRedisClient();
if (redis) {
  // A baseline queue scaffold for lead follow-up and notifications.
  new Queue("lead-followups", { connection: redis });
}

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }),
);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/webhooks", webhookRouter);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(optionalAuth);

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "magnence-api",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

app.use("/api", restRouter);
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use(notFoundHandler);
app.use(globalErrorHandler);

server.listen(env.PORT, () => {
  console.log(`[api] running at http://localhost:${env.PORT}`);
});
