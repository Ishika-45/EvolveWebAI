function validateBranding(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Branding must be a JSON object.");
  }

  const stringFields = [
    "brandName",
    "tagline",
    "mission",
    "vision",
    "brandVoice",
    "targetAudience",
  ];

  for (const field of stringFields) {
    if (typeof data[field] !== "string") {
      throw new Error(`Branding ${field} must be a string.`);
    }
  }

  if (!Array.isArray(data.brandValues)) {
    throw new Error("Branding brandValues must be an array.");
  }

  if (!Array.isArray(data.colorPalette)) {
    throw new Error("Branding colorPalette must be an array.");
  }

  if (data.brandValues.length > 6) {
    throw new Error("Branding cannot contain more than 6 brand values.");
  }

  if (data.colorPalette.length > 6) {
    throw new Error("Branding cannot contain more than 6 colors.");
  }

  for (const value of data.brandValues) {
    if (typeof value !== "string") {
      throw new Error("Branding brandValues must contain strings.");
    }
  }

  for (const color of data.colorPalette) {
    if (typeof color !== "string") {
      throw new Error("Branding colorPalette must contain strings.");
    }
  }

  return {
    brandName: data.brandName.trim(),
    tagline: data.tagline.trim(),
    mission: data.mission.trim(),
    vision: data.vision.trim(),
    brandVoice: data.brandVoice.trim(),
    brandValues: data.brandValues.map((value) => value.trim()),
    colorPalette: data.colorPalette.map((color) => color.trim()),
    targetAudience: data.targetAudience.trim(),
  };
}

module.exports = { validateBranding };