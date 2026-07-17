function validateAnalysis(data) {
  if (!data) {
    throw new Error("Empty AI response.");
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Analysis must be a JSON object.");
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

module.exports = {
  validateAnalysis,
};