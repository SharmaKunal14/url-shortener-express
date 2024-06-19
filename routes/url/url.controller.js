import { redisClient } from "../../cache/redis.js";
import {
  checkLongURLAlreadyExists,
  saveShortenedURL,
  topDomainsShortened,
} from "../../models/url.model.js";
import {
  generateBase64Encoding,
  getDomain,
  isValidHttpURL,
} from "../../utils/utils.js";

const shortenURLAndSaveToDBAndCache = async (req, res) => {
  // long URL
  try {
    const { longURL } = req.body;

    const isValidUrl = isValidHttpURL(longURL);

    if (!isValidUrl) {
      return res.status(400).send({ ok: false, message: "Invalid URL" });
    }

    const shortURL = await checkLongURLAlreadyExists(longURL);

    if (shortURL) {
      return res.status(200).send({
        ok: true,
        message: "Long URL already exists",
        shortURL: shortURL,
      });
    }

    let base64Value = generateBase64Encoding(longURL);
    base64Value = base64Value.slice(0, 15);

    let domain = getDomain(longURL);

    const shortenedURL = process.env.BASE_URL + "/" + base64Value;
    const saveToDB = await saveShortenedURL(longURL, shortenedURL, domain);
    const saveToCache = await redisClient.set(base64Value, longURL);
    if (saveToDB && saveToCache) {
      return res.status(200).send({
        ok: true,
        message: "URL Shortened",
        shortenedURL: shortenedURL,
      });
    }
  } catch (err) {
    return res.status(500).send({ ok: false, message: err.message });
  }
};

const topDomains = async (req, res) => {
  try {
    const response = await topDomainsShortened();
    return res.status(200).send({
      ok: true,
      message: "Top 3 Domains Shortened",
      domains: response,
    });
  } catch (err) {
    return res.status(500).send({ ok: false, message: err.message });
  }
};

const redirectToLongURL = async (req, res) => {
  const { shortURL } = req.params;
  const longURL = await redisClient.get(shortURL);
  if (longURL) {
    return res.status(301).redirect(longURL);
  }
  return res
    .status(404)
    .send({ ok: false, message: "Requested URL not found" });
};

export { shortenURLAndSaveToDBAndCache, topDomains, redirectToLongURL };
