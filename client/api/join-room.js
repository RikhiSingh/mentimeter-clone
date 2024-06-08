// api/join-room.js

import { Redis } from "ioredis";

export default async (req, res) => {
  // Create a new Redis connection
  const redis = new Redis(process.env.REDIS_CONNECTION_STRING);

  try {
    const { room } = req.body;

    // Logic to join room
    // Example: await redis.sadd(`rooms:${req.id}`, room);

    res.status(200).json({ message: `Joined room: ${room}` });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the Redis connection
    await redis.quit();
  }
};
