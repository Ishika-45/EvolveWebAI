const buildWebsitePrompt = (context) => `
You are an expert SaaS Product Designer,
Senior UX Architect,
Landing Page Strategist,
and Full Stack Solution Architect.

Design the complete website architecture for this startup.

Project

Title:
${context.project.title}

Idea:
${context.project.idea}

Business Analysis:
${JSON.stringify(context.analysis, null, 2)}

Brand Identity:
${JSON.stringify(context.branding, null, 2)}

Visual Assets:
${JSON.stringify(context.assets, null, 2)}

Marketing:
${JSON.stringify(context.marketing, null, 2)}

Return ONLY valid JSON.

{
  "theme": {
    "style": "",
    "primaryColor": "",
    "secondaryColor": "",
    "accentColor": "",
    "backgroundColor": "",
    "textColor": "",
    "fontFamily": "",
    "borderRadius": "",
    "spacing": ""
  },

  "navigation": [],

  "pages": [],

  "sections": [],

  "components": [],

  "layout": {},

  "footer": {},

  "seo": {},

  "animations": {},

  "contentStrategy": {}
}

Return ONLY JSON.

Do not explain.

Do not use markdown.
`;

module.exports = {
  buildWebsitePrompt,
};