const { toArray, toObject, toStringValue } = require("../utils/jsonParser");

function validateBranding(data) {
  const obj = toObject(data);

  return {
    brandName: toStringValue(obj.brandName),
    tagline: toStringValue(obj.tagline),
    mission: toStringValue(obj.mission),
    vision: toStringValue(obj.vision),
    brandVoice: toStringValue(obj.brandVoice),
    brandValues: toArray(obj.brandValues),
    colorPalette: toArray(obj.colorPalette),
    targetAudience: toStringValue(obj.targetAudience),
  };
}

module.exports = {
  validateBranding,
};