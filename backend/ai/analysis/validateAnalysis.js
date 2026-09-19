const { toArray, toObject, toStringValue, toNumber } = require("../utils/jsonParser");

function validateAnalysis(data) {
  const obj = toObject(data);

  return {
    ideaScore: toNumber(obj.ideaScore, 0),
    strengths: toArray(obj.strengths),
    weaknesses: toArray(obj.weaknesses),
    opportunities: toArray(obj.opportunities),
    marketPotential: toStringValue(obj.marketPotential),
    recommendations: toArray(obj.recommendations),
  };
}

module.exports = {
  validateAnalysis,
};