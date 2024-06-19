import http from "http";
import { mongoConnect } from "./db/mongo.js";
import app from "./app.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
