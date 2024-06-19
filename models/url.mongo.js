import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortURL: {
    type: String,
    required: true,
    index: true,
  },
  longURL: {
    type: String,
    required: true,
    index: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

export default mongoose.model("URL", urlSchema);
