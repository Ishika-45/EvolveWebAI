function validateBranding(data) {
  if (!data) {
    throw new Error("Empty AI response.");
  }

  if (typeof data !== "object") {
    throw new Error("Branding must be an object.");
  }

  return {
    brandName: data.brandName ?? "",
    tagline: data.tagline ?? "",
    mission: data.mission ?? "",
    vision: data.vision ?? "",
    brandVoice: data.brandVoice ?? "",
    brandValues: data.brandValues ?? [],
    colorPalette: data.colorPalette ?? [],
    targetAudience: data.targetAudience ?? "",
  };
}

module.exports = {
  validateBranding,
};