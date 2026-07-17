const buildAnalysisPrompt = (project) => `
You are an experienced startup consultant.

Analyze this startup idea.

Title:
${project.title}

Idea:
${project.idea}

Return ONLY valid JSON.

{
  "ideaScore": 85,
  "strengths": [],
  "weaknesses": [],
  "opportunities": [],
  "marketPotential": "",
  "recommendations": []
}

Do not include markdown.
Do not explain.
Only return JSON.
`;
module.exports = {
  buildAnalysisPrompt,
};