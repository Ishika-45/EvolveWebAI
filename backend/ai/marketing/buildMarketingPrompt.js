const buildMarketingPrompt = (context) => `
You are an experienced Growth Marketer and SaaS Copywriter.

Create complete marketing content for the startup.

Startup

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

Return ONLY valid JSON.

{
  "headline": "",
  "subheadline": "",
  "cta": "",

  "features": [],

  "benefits": [],

  "seoKeywords": [],

  "socialPosts": [
    {
      "platform": "",
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

Do not return markdown.

Return ONLY JSON.
`;

module.exports = {
  buildMarketingPrompt,
};