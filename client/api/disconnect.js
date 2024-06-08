// api/disconnect.js

import initRedis from "./init-redis";

export default async (req, res) => {
  // Initialize Redis connection
  const redis = await initRedis();

  try {
    const { id } = req.body;

    // Logic to handle disconnecting from a room
    // Example: const joinedRooms = await redis.smembers(`rooms:${id}`);
    // Perform actions to disconnect from each room

    res.status(200).json({ message: "Disconnected successfully" });
  } catch (error) {
    console.error("Error disconnecting:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the Redis connection
    await redis.quit();
  }
};
