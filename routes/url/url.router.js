import express from "express";
import { urlController } from "./url.controller.js";

const urlRouter = express.Router();

urlRouter.get("/", urlController);

export default urlRouter;
