import http from "http";
import { mongoConnect, mongoDisconnect } from "./db/mongo.js";
import app from "./app.js";
import { redisConnect, redisDisconnect } from "./cache/redis.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const cleanup = async () => {
  await mongoDisconnect();
  await redisDisconnect();
};
const startServer = async () => {
  await mongoConnect();
  await redisConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
