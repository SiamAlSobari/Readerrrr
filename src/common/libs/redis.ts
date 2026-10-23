import Redis from "ioredis";
import { getEnv } from "../utils/env";

export const client = new Redis(getEnv().REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  retryStrategy(times) {
    if (times > 3) return null;
    return Math.min(times * 100, 2000);
  },
});

client.on("error", (err) => {
  console.warn("[Redis Warning] Connection error:", err.message);
});
