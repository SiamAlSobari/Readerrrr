import Redis from "ioredis"
import { getEnv } from "../utils/env";

export const client = new Redis(getEnv().REDIS_URL);
await client.set('foo', 'bar');