const buildAnalysisPrompt = (context) => `
You are an experienced startup consultant.

Analyze this startup idea.

PROJECT
Title: ${context.project.title}
Idea: ${context.project.idea}

Return ONLY valid JSON.

{
  "ideaScore": 0,
  "strengths": [],
  "weaknesses": [],
  "opportunities": [],
  "marketPotential": "",
  "recommendations": []
}

RULES
- ideaScore: integer 0-100
- strengths: exactly 4 items
- weaknesses: exactly 4 items
- opportunities: exactly 4 items
- recommendations: exactly 4 items
- Each array item: maximum 12 words
- marketPotential: maximum 25 words
- No markdown.
- No explanations.
- No statistics or unsupported claims.
- JSON only.
`;

module.exports = { buildAnalysisPrompt };