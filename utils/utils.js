import crypto from "crypto";

const generateBase64Encoding = (inputString) => {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  return hash.digest("base64");
};

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
export { generateBase64Encoding, isValidHttpURL, getDomain };
