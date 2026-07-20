const buildWebsitePlannerPrompt = (context) => `

You are a Senior Product Designer,
Senior UI/UX Designer,
Senior Frontend Architect,
and Creative Director.

Your task is NOT to generate code.

Your task is ONLY to design the complete website blueprint.

====================================================

PROJECT

Title:
${context.project.title}

Idea:
${context.project.idea}

====================================================

BUSINESS ANALYSIS

${JSON.stringify(context.analysis, null, 2)}

====================================================

BRANDING

${JSON.stringify(context.branding, null, 2)}

====================================================

VISUAL ASSETS

${JSON.stringify(context.assets, null, 2)}

====================================================

MARKETING

${JSON.stringify(context.marketing, null, 2)}

====================================================

Design the BEST possible SaaS website.

Think like Apple.

Think like Stripe.

Think like Framer.

Think like Linear.

Think like Vercel.

Think modern.

Think premium.

Think conversion.

====================================================

Return ONLY JSON.

{
  "websiteType": "",

  "theme": "",

  "designStyle": "",

  "colorStrategy": "",

  "navigation":[

  ],

  "pages":[

  ],

  "homepageSections":[

  ],

  "sectionOrder":[

  ],

  "recommendedComponents":[

  ],

  "animations":[

  ],

  "interactions":[

  ],

  "illustrationStyle":"",

  "iconStyle":"",

  "imageStyle":"",

  "recommendedImages":[

  ],

  "responsiveStrategy":"",

  "userJourney":[

  ],

  "conversionGoals":[

  ],

  "aiRecommendations":[

  ]
}

Return ONLY JSON.

No markdown.

No explanations.

`;

module.exports = {
  buildWebsitePlannerPrompt,
};