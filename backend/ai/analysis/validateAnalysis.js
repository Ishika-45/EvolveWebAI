function validateAnalysis(data) {
  if (!data) {
    throw new Error("Empty AI response.");
  }

  if (typeof data !== "object") {
    throw new Error("Analysis must be an object.");
  }

  return {
    ideaScore: data.ideaScore ?? 0,
    strengths: data.strengths ?? [],
    weaknesses: data.weaknesses ?? [],
    opportunities: data.opportunities ?? [],
    marketPotential: data.marketPotential ?? "",
    recommendations: data.recommendations ?? [],
  };
}

module.exports = validateAnalysis;