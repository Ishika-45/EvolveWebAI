const { toArray, toObject, toStringValue } = require("../utils/jsonParser");

function validateWebsiteTheme(data) {
  const obj = toObject(data);

  return {
    themeName: toStringValue(obj.themeName),
    designStyle: toStringValue(obj.designStyle),
    visualMood: toStringValue(obj.visualMood),

    colorPalette: toObject(obj.colorPalette),

    gradients: toArray(obj.gradients).slice(0, 2),

    typography: toObject(obj.typography),
    spacing: toObject(obj.spacing),
    borderRadius: toObject(obj.borderRadius),

    shadows: toObject(obj.shadows),
    buttons: toObject(obj.buttons),
    cards: toObject(obj.cards),

    animationStyle: toStringValue(obj.animationStyle),

    microInteractions: toArray(obj.microInteractions).slice(0, 3),

    iconStyle: toStringValue(obj.iconStyle),
    illustrationStyle: toStringValue(obj.illustrationStyle),
    responsiveStrategy: toStringValue(obj.responsiveStrategy),

    accessibilityNotes: toArray(obj.accessibilityNotes).slice(0, 3),
  };
}

module.exports = {
  validateWebsiteTheme,
};