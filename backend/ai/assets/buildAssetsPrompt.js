const buildAssetsPrompt = (context) => `
You are a senior UI/UX designer and Brand Identity expert.

Based on the startup information below, create the complete visual identity.

Startup

Title:
${context.project.title}

Idea:
${context.project.idea}

Business Analysis:
${JSON.stringify(context.analysis, null, 2)}

Brand Identity:
${JSON.stringify(context.branding, null, 2)}

Return ONLY valid JSON.

{
  "logoConcept": {
    "style": "",
    "description": "",
    "symbol": ""
  },

  "designSystem": {
    "primaryColor": "",
    "secondaryColor": "",
    "accentColor": "",
    "backgroundColor": "",
    "textColor": ""
  },

  "typography": {
    "headingFont": "",
    "bodyFont": ""
  },

  "icons": {
    "style": ""
  },

  "illustrationStyle": "",

  "uiStyle": "",

  "imagePrompts": [
    ""
  ]
}

Do not return markdown.

Only JSON.
`;

module.exports = {
  buildAssetsPrompt,
};