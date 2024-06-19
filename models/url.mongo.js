import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
  longURL: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("URL", urlSchema);
