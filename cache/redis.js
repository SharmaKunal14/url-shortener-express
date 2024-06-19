import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redisClient;
const redisConnect = async () => {
  const env = process.env.NODE_ENV;
  let host;
  if (env == "local") {
    host = "127.0.0.1";
  } else {
    host = "redis-nodejs";
  }

  redisClient = createClient({
    socket: {
      host: host,
      port: 6379,
      keepAlive: 1,
    },
    database: 0,
    password: "",
  });

  redisClient.on("error", async (error) => {
    console.error(`Redis client error:`, error);
    await redisClient.disconnect();
  });
  await redisClient.connect();
};

const redisDisconnect = async () => {
  await redisClient.disconnect();
};

export { redisConnect, redisDisconnect, redisClient };
