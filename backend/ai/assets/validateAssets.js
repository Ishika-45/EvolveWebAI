const { toArray, toObject, toStringValue } = require("../utils/jsonParser");

function validateAssets(data) {
  const obj = toObject(data);

  return {
    logoConcept: toObject(obj.logoConcept),
    designSystem: toObject(obj.designSystem),
    typography: toObject(obj.typography),
    icons: toObject(obj.icons),
    illustrationStyle: toStringValue(obj.illustrationStyle),
    uiStyle: toStringValue(obj.uiStyle),
    imagePrompts: toArray(obj.imagePrompts),
  };
}

module.exports = {
  validateAssets,
};