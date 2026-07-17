function validateAssets(data) {

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Assets must be a JSON object.");
  }

  return {

    logoConcept: data.logoConcept ?? {},

    designSystem: data.designSystem ?? {},

    typography: data.typography ?? {},

    icons: data.icons ?? {},

    illustrationStyle: data.illustrationStyle ?? "",

    uiStyle: data.uiStyle ?? "",

    imagePrompts: data.imagePrompts ?? [],

  };

}

module.exports = {
  validateAssets,
};