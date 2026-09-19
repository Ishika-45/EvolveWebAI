const { toArray, toObject, toStringValue } = require("../utils/jsonParser");

function validateWebsitePlanner(data) {
  const obj = toObject(data);

  return {
    websiteType: toStringValue(obj.websiteType),
    goal: toStringValue(obj.goal),
    framework: toStringValue(obj.framework, "React"),
    themeRecommendation: toStringValue(obj.themeRecommendation),
    primaryCTA: toStringValue(obj.primaryCTA),
    secondaryCTA: toStringValue(obj.secondaryCTA),
    navigation: toArray(obj.navigation),
    pages: toArray(obj.pages),
  };
}

module.exports = {
  validateWebsitePlanner,
};