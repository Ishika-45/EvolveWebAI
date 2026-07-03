const buildAnalysisPrompt = (project) => `
You are a senior startup consultant.

Analyze the following startup idea.

Title:
${project.title}

Idea:
${project.idea}

Return ONLY valid JSON.

{
  "ideaScore": 0,
  "strengths": [],
  "weaknesses": [],
  "opportunities": [],
  "marketPotential": "",
  "recommendations": []
}
`;

module.exports = {
  buildAnalysisPrompt,
};