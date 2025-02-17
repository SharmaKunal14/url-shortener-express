import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
dotenv.config();

let MONGO_URL = process.env.MONGODB_URL;
mongoose.connection.once("open", () => {
  console.log("MongoDB connection established");
});
mongoose.connection.on("error", (err) => console.log(err));

const mongoConnect = async () => {
  if (process.env.NODE_ENV == "local") {
    MONGO_URL = MONGO_URL.replace("<client>", "127.0.0.1");
  } else {
    MONGO_URL = MONGO_URL.replace("<client>", "mongo-nodejs");
  }
  await mongoose.connect(MONGO_URL);
};
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};
export { mongoConnect, mongoDisconnect };
