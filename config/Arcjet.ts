import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY || "", // safer fallback (avoid using "!")
  rules: [
    tokenBucket({
      mode: "LIVE",               // Blocks requests in real mode
      characteristics: ["userId"], // Use "ip" if you don’t have a user ID system
      refillRate: 5000,              // Add 5 tokens every interval
      interval: 30 * 24 * 60 * 60 * 1000,               // Interval of 10 seconds
      capacity: 5000,               // Max tokens in the bucket
    }),
  ],
});

export default aj;
