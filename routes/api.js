import express from "express";
import urlRouter from "./url/url.router.js";

const api = express.Router();

api.use("/url", urlRouter);

export default api;
