import { createHmac, timingSafeEqual } from "node:crypto";
import express, { Router } from "express";
import Stripe from "stripe";
import { env } from "../config/env.js";
import { hmacSha256 } from "../lib/security/crypto.js";

export const webhookRouter = Router();

const stripeClient = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

webhookRouter.post("/stripe", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.header("stripe-signature");
  if (!signature || !env.STRIPE_WEBHOOK_SECRET || !stripeClient) {
    res.status(400).json({ error: "Stripe webhook is not configured." });
    return;
  }

  try {
    const event = stripeClient.webhooks.constructEvent(req.body, signature, env.STRIPE_WEBHOOK_SECRET);

    // Handle the minimum expected event flow for billing status updates.
    if (event.type === "checkout.session.completed") {
      // TODO: Link checkout session to invoice/project status updates.
    }

    res.json({ received: true });
  } catch {
    res.status(400).json({ error: "Invalid Stripe signature." });
  }
});

webhookRouter.post("/whatsapp", express.raw({ type: "application/json" }), (req, res) => {
  const verifyToken = req.query["hub.verify_token"];
  if (verifyToken && verifyToken === env.WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(req.query["hub.challenge"]);
    return;
  }

  const signatureHeader = req.header("x-hub-signature-256");
  if (!env.WHATSAPP_APP_SECRET || !signatureHeader?.startsWith("sha256=")) {
    res.status(400).json({ error: "WhatsApp webhook signature is missing." });
    return;
  }

  const incomingSignature = signatureHeader.replace("sha256=", "");
  const expectedSignature = hmacSha256(env.WHATSAPP_APP_SECRET, req.body);
  if (!safeEqual(incomingSignature, expectedSignature)) {
    res.status(401).json({ error: "Invalid WhatsApp signature." });
    return;
  }

  res.json({ received: true });
});

webhookRouter.post("/calendly", express.raw({ type: "application/json" }), (req, res) => {
  const signatureHeader = req.header("calendly-webhook-signature");
  if (!signatureHeader || !env.CALENDLY_WEBHOOK_SIGNING_KEY) {
    res.status(400).json({ error: "Calendly signature configuration missing." });
    return;
  }

  const [timestampPart, signaturePart] = signatureHeader.split(",");
  const timestamp = timestampPart?.replace("t=", "").trim();
  const signature = signaturePart?.replace("v1=", "").trim();
  if (!timestamp || !signature) {
    res.status(400).json({ error: "Malformed Calendly signature." });
    return;
  }

  const signedPayload = `${timestamp}.${req.body.toString("utf8")}`;
  const expected = createHmac("sha256", env.CALENDLY_WEBHOOK_SIGNING_KEY).update(signedPayload).digest("hex");
  if (!safeEqual(signature, expected)) {
    res.status(401).json({ error: "Invalid Calendly signature." });
    return;
  }

  res.json({ received: true });
});

function safeEqual(a: string, b: string): boolean {
  try {
    const aBuffer = Buffer.from(a, "hex");
    const bBuffer = Buffer.from(b, "hex");
    return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
  } catch {
    return false;
  }
}
