function validateWebsiteTheme(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Website Theme must be an object.");
  }

  const requiredObjects = [
    "colorPalette",
    "typography",
    "spacing",
    "borderRadius",
    "shadows",
    "buttons",
    "cards",
  ];

  for (const field of requiredObjects) {
    if (
      data[field] !== undefined &&
      (typeof data[field] !== "object" || Array.isArray(data[field]))
    ) {
      throw new Error(`Website Theme field "${field}" must be an object.`);
    }
  }

  const requiredArrays = [
    "gradients",
    "microInteractions",
    "accessibilityNotes",
  ];

  for (const field of requiredArrays) {
    if (
      data[field] !== undefined &&
      !Array.isArray(data[field])
    ) {
      throw new Error(`Website Theme field "${field}" must be an array.`);
    }
  }

  return {
    themeName: data.themeName ?? "",
    designStyle: data.designStyle ?? "",
    visualMood: data.visualMood ?? "",

    colorPalette: data.colorPalette ?? {},

    gradients: Array.isArray(data.gradients)
      ? data.gradients.slice(0, 2)
      : [],

    typography: data.typography ?? {},
    spacing: data.spacing ?? {},
    borderRadius: data.borderRadius ?? {},

    shadows: data.shadows ?? {},
    buttons: data.buttons ?? {},
    cards: data.cards ?? {},

    animationStyle: data.animationStyle ?? "",

    microInteractions: Array.isArray(data.microInteractions)
      ? data.microInteractions.slice(0, 3)
      : [],

    iconStyle: data.iconStyle ?? "",
    illustrationStyle: data.illustrationStyle ?? "",
    responsiveStrategy: data.responsiveStrategy ?? "",

    accessibilityNotes: Array.isArray(data.accessibilityNotes)
      ? data.accessibilityNotes.slice(0, 3)
      : [],
  };
}

module.exports = {
  validateWebsiteTheme,
};