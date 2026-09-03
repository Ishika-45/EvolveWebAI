function validateAnalysis(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Analysis must be a JSON object.");
  }

  if (
    typeof data.ideaScore !== "number" ||
    data.ideaScore < 0 ||
    data.ideaScore > 100
  ) {
    throw new Error("Analysis ideaScore must be a number between 0 and 100.");
  }

  if (!Array.isArray(data.strengths)) {
    throw new Error("Analysis strengths must be an array.");
  }

  if (!Array.isArray(data.weaknesses)) {
    throw new Error("Analysis weaknesses must be an array.");
  }

  if (!Array.isArray(data.opportunities)) {
    throw new Error("Analysis opportunities must be an array.");
  }

  if (!Array.isArray(data.recommendations)) {
    throw new Error("Analysis recommendations must be an array.");
  }

  if (typeof data.marketPotential !== "string") {
    throw new Error("Analysis marketPotential must be a string.");
  }

  const limits = {
    strengths: 5,
    weaknesses: 5,
    opportunities: 5,
    recommendations: 5,
  };

  for (const [field, limit] of Object.entries(limits)) {
    if (data[field].length > limit) {
      throw new Error(
        `Analysis ${field} cannot contain more than ${limit} items.`
      );
    }

    for (const item of data[field]) {
      if (typeof item !== "string") {
        throw new Error(`Analysis ${field} items must be strings.`);
      }
    }
  }

  return {
    ideaScore: data.ideaScore,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    opportunities: data.opportunities,
    marketPotential: data.marketPotential,
    recommendations: data.recommendations,
  };
}

module.exports = { validateAnalysis };