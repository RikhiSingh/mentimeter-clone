// api/init-redis.js

import { Redis } from "ioredis";

export default async () => {
  // Create a new Redis connection
  const redis = new Redis(process.env.REDIS_CONNECTION_STRING);
  return redis;
};
