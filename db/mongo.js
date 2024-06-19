import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;
mongoose.connection.once("open", () => {
  console.log("MongoDB connection established");
});
mongoose.connection.on("error", (err) => console.log(err));

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}
export { mongoConnect, mongoDisconnect };
