const buildBrandingPrompt = (context) => `
You are an expert Brand Strategist.

Using the startup idea and analysis below, create a complete brand identity.

Project Title:
${context.project.title}

Project Idea:
${context.project.idea}

Analysis:
${JSON.stringify(context.analysis, null, 2)}

Return ONLY valid JSON.

{
  "brandName": "",
  "tagline": "",
  "mission": "",
  "vision": "",
  "brandVoice": "",
  "brandValues": [],
  "colorPalette": [],
  "targetAudience": ""
}
`;

module.exports = {
  buildBrandingPrompt,
};