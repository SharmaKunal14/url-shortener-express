import { redisClient } from "../../cache/redis.js";
import {
  checkLongURLAlreadyExists,
  checkShortURLAlreadyExists,
  saveShortenedURL,
  topDomainsShortened,
} from "../../models/url.model.js";
import { charcterMap } from "../../utils/constants.js";
import { generateHash, getDomain, isValidHttpURL } from "../../utils/utils.js";

const shortenURLAndSaveToDBAndCache = async (req, res) => {
  try {
    const { longURL } = req.body;

    const isValidUrl = isValidHttpURL(longURL);

    if (!isValidUrl) {
      return res.status(400).send({ ok: false, message: "Invalid URL" });
    }

    const shortURL = await checkLongURLAlreadyExists(longURL);
    let domain = getDomain(longURL);

    if (shortURL) {
      return res.status(200).send({
        ok: true,
        message: "Long URL already exists",
        shortURL: shortURL,
      });
    }

    let hash = parseInt(generateHash(longURL));
    let tempHash = hash;
    let base62Encoding = "";

    while (tempHash > 0) {
      const rem = tempHash % 62;
      const char = charcterMap[rem];
      base62Encoding += char;
      tempHash /= 62;
      tempHash = parseInt(tempHash);
    }

    const shortenedURL = process.env.BASE_URL + "/" + base62Encoding;
    const saveToDB = await saveShortenedURL(longURL, shortenedURL, domain);
    const saveToCache = await redisClient.set(base62Encoding, longURL);
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
  let longURL = await redisClient.get(shortURL);

  if (longURL) {
    return res.status(301).redirect(longURL);
  }

  longURL = await checkShortURLAlreadyExists(shortURL);

  if (longURL) {
    await redisClient.set(shortURL, longURL);
    return res.status(301).redirect(longURL);
  }

  return res
    .status(404)
    .send({ ok: false, message: "Requested URL not found" });
};

export { shortenURLAndSaveToDBAndCache, topDomains, redirectToLongURL };
