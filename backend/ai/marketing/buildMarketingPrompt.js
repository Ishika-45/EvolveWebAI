const buildMarketingPrompt = (context) => `
You are a senior SaaS Growth Marketer and Conversion Copywriter.

Generate complete marketing content for the startup.

PROJECT
-------
Title:
${context.project.title}

Idea:
${context.project.idea}

ANALYSIS
--------
${JSON.stringify(context.analysis, null, 2)}

BRANDING
--------
${JSON.stringify(context.branding, null, 2)}

ASSETS
------
${JSON.stringify(context.assets, null, 2)}

IMPORTANT RULES
---------------
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT add explanations.
- Do NOT add comments.
- Every field must be present.
- Use double quotes for all strings.
- Arrays must contain valid JSON objects or strings only.

Return this exact JSON schema:

{
  "headline": "",
  "subheadline": "",
  "cta": "",

  "features": [
    {
      "name": "",
      "description": ""
    }
  ],

  "benefits": [
    ""
  ],

  "seoKeywords": [
    ""
  ],

  "socialPosts": [
    {
      "platform": "Twitter",
      "content": ""
    },
    {
      "platform": "LinkedIn",
      "content": ""
    },
    {
      "platform": "Facebook",
      "content": ""
    }
  ],

  "emailCampaign": {
    "subject": "",
    "body": ""
  },

  "adCopies": [
    {
      "title": "",
      "description": ""
    }
  ]
}
`;

module.exports = {
  buildMarketingPrompt,
};