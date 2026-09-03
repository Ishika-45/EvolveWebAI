function validateAssets(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Assets must be a JSON object.");
  }

  const requiredObjects = [
    "logoConcept",
    "designSystem",
    "typography",
    "icons",
  ];

  for (const field of requiredObjects) {
    if (
      !data[field] ||
      typeof data[field] !== "object" ||
      Array.isArray(data[field])
    ) {
      throw new Error(`Assets ${field} must be an object.`);
    }
  }

  const stringFields = [
    "illustrationStyle",
    "uiStyle",
  ];

  for (const field of stringFields) {
    if (typeof data[field] !== "string") {
      throw new Error(`Assets ${field} must be a string.`);
    }
  }

  if (!Array.isArray(data.imagePrompts)) {
    throw new Error("Assets imagePrompts must be an array.");
  }

  if (data.imagePrompts.length > 5) {
    throw new Error("Assets cannot contain more than 5 image prompts.");
  }

  for (const prompt of data.imagePrompts) {
    if (typeof prompt !== "string") {
      throw new Error("Assets imagePrompts must contain strings.");
    }
  }

  const logoFields = ["style", "description", "symbol"];

  for (const field of logoFields) {
    if (typeof data.logoConcept[field] !== "string") {
      throw new Error(`Assets logoConcept.${field} must be a string.`);
    }
  }

  const designFields = [
    "primaryColor",
    "secondaryColor",
    "accentColor",
    "backgroundColor",
    "textColor",
  ];

  for (const field of designFields) {
    if (typeof data.designSystem[field] !== "string") {
      throw new Error(`Assets designSystem.${field} must be a string.`);
    }
  }

  const typographyFields = ["headingFont", "bodyFont"];

  for (const field of typographyFields) {
    if (typeof data.typography[field] !== "string") {
      throw new Error(`Assets typography.${field} must be a string.`);
    }
  }

  if (typeof data.icons.style !== "string") {
    throw new Error("Assets icons.style must be a string.");
  }

  return {
    logoConcept: data.logoConcept,
    designSystem: data.designSystem,
    typography: data.typography,
    icons: data.icons,
    illustrationStyle: data.illustrationStyle.trim(),
    uiStyle: data.uiStyle.trim(),
    imagePrompts: data.imagePrompts.map((prompt) => prompt.trim()),
  };
}

module.exports = { validateAssets };