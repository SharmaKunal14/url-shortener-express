import crc32 from "crc32";

const isValidHttpURL = (string) => {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};

const getDomain = (url) => {
  let splitLongURL = url.split(".");
  splitLongURL = splitLongURL[splitLongURL.length - 2];
  let domain = splitLongURL.split("/");
  domain = domain[domain.length - 1];

  return domain;
};

const generateHash = (url) => {
  return parseInt(crc32(url), 32);
};

export { isValidHttpURL, getDomain, generateHash };
