import express from "express";
import {
  redirectToLongURL,
  shortenURLAndSaveToDBAndCache,
  topDomains,
} from "./url.controller.js";

const urlRouter = express.Router();

urlRouter.post("/shorten-url", shortenURLAndSaveToDBAndCache);
urlRouter.get("/top-domains-shortened", topDomains);
urlRouter.get("/:shortURL", redirectToLongURL);

export default urlRouter;
