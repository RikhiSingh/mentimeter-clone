// api/unsubscribe-room.js

import initRedis from "./init-redis";

export default async (req, res) => {
  // Initialize Redis connection
  const redis = await initRedis();

  try {
    const { room } = req.body;

    // Logic to handle unsubscribing from a room
    // Example: const subRedis = await initRedis();
    // Perform actions to unsubscribe from the room

    res.status(200).json({ message: `Unsubscribed from room: ${room}` });
  } catch (error) {
    console.error("Error unsubscribing from room:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the Redis connection
    await redis.quit();
  }
};
