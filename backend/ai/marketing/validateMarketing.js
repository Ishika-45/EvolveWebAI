const { toArray, toObject, toStringValue } = require("../utils/jsonParser");

function validateMarketing(data) {
  const obj = toObject(data);

  return {
    headline: toStringValue(obj.headline),
    subheadline: toStringValue(obj.subheadline),
    cta: toStringValue(obj.cta),
    features: toArray(obj.features).slice(0, 4),
    benefits: toArray(obj.benefits).slice(0, 5),
    seoKeywords: toArray(obj.seoKeywords).slice(0, 8),
    socialPosts: toArray(obj.socialPosts).slice(0, 3),
    emailCampaign: toObject(obj.emailCampaign),
    adCopies: toArray(obj.adCopies).slice(0, 3),
  };
}

module.exports = {
  validateMarketing,
};