function validateWebsiteTheme(data) {

  if (!data || typeof data !== "object") {
    throw new Error("Website Theme must be an object.");
  }

  return {

    themeName: data.themeName ?? "",

    designStyle: data.designStyle ?? "",

    visualMood: data.visualMood ?? "",

    colorPalette: data.colorPalette ?? {},

    gradients: data.gradients ?? [],

    typography: data.typography ?? {},

    spacing: data.spacing ?? {},

    borderRadius: data.borderRadius ?? {},

    shadows: data.shadows ?? {},

    buttons: data.buttons ?? {},

    cards: data.cards ?? {},

    animationStyle: data.animationStyle ?? "",

    microInteractions: data.microInteractions ?? [],

    iconStyle: data.iconStyle ?? "",

    illustrationStyle: data.illustrationStyle ?? "",

    responsiveStrategy: data.responsiveStrategy ?? "",

    accessibilityNotes: data.accessibilityNotes ?? []

  };

}

module.exports = {
  validateWebsiteTheme,
};