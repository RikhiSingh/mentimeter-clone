import { Server as IoServer } from "socket.io";
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_CONNECTION_STRING);
const subRedis = new Redis(process.env.REDIS_CONNECTION_STRING);

let io: IoServer;

export default function handler(req, res) {
  if (!io) {
    io = new IoServer({
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", async (socket) => {
      const { id } = socket;

      socket.on("join-room", async (room: string) => {
        console.log("User joined room: ", room);

        const subscribedRooms = await redis.smembers("subscribed-rooms");
        await socket.join(room);
        await redis.sadd(`rooms:${id}`, room);
        await redis.hincrby("room-connections", room, 1);

        if (!subscribedRooms.includes(room)) {
          subRedis.subscribe(room, async (err) => {
            if (err) {
              console.error("Failed to subscribe", err);
            } else {
              await redis.sadd("subscribed-rooms", room);
              console.log("Subscribed to room: ", room);
            }
          });
        }
      });

      socket.on("disconnect", async () => {
        const { id } = socket;
        const joinedRooms = await redis.smembers(`rooms:${id}`);
        await redis.del(`rooms:${id}`);

        joinedRooms.forEach(async (room) => {
          const remainingConnections = await redis.hincrby(
            "room-connections",
            room,
            -1
          );

          if (remainingConnections <= 0) {
            await redis.hdel("room-connections", room);

            subRedis.unsubscribe(room, async (err) => {
              if (err) {
                console.error("Failed to unsubscribe", err);
              } else {
                await redis.srem("subscribed-rooms", room);
                console.log("Unsubscribed from room: ", room);
              }
            });
          }
        });
      });
    });
  }

  res.end("Socket.io server running");
}
