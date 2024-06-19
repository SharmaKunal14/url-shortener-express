import urlModel from "./url.mongo.js";

const checkLongURLAlreadyExists = async (longURL) => {
  const response = await urlModel.findOne({ longURL: longURL });

  if (response) {
    return response.shortURL;
  }
};

const saveShortenedURL = async (longURL, shortURL, domain) => {
  const response = await urlModel.create({
    longURL: longURL,
    shortURL: shortURL,
    domain: domain,
  });

  return response;
};

const topDomainsShortened = async () => {
  const response = await urlModel.aggregate([
    {
      $group: { _id: "$domain", count: { $sum: 1 } },
    },
    { $sort: { count: -1 } },
    { $limit: 3 },
  ]);

  return response;
};

export { checkLongURLAlreadyExists, saveShortenedURL, topDomainsShortened };
