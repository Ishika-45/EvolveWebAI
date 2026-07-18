const buildAnalysisPrompt = (context) => `
You are an experienced startup consultant.

Analyze this startup idea.

Title:
${context.project.title}

Idea:
${context.project.idea}

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