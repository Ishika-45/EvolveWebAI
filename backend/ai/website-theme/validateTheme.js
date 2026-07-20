function validateTheme(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Theme must be a JSON object.");
  }

  return {
    themeName: data.themeName ?? "",
    themeDescription: data.themeDescription ?? "",

    colorSystem: data.colorSystem ?? {},

    typography: data.typography ?? {},

    spacing: data.spacing ?? {},

    borderRadius: data.borderRadius ?? {},

    shadows: data.shadows ?? {},

    buttons: data.buttons ?? {},

    cards: data.cards ?? {},

    forms: data.forms ?? {},

    animations: data.animations ?? {},

    darkMode: data.darkMode ?? {},

    lightMode: data.lightMode ?? {},
  };
}

module.exports = {
  validateTheme,
};