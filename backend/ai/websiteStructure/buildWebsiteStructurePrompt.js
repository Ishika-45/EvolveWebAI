const buildWebsiteStructurePrompt = (context) => `
You are an expert UX Architect.

Your ONLY task is planning the website structure.

DO NOT generate:

- UI
- Components
- Colors
- Images
- Code
- Animations

Project

${context.project.title}

Website Plan

${JSON.stringify(context.website, null, 2)}

Return ONLY JSON.

{
  "pages":[
    {
      "name":"",
      "path":"",
      "sections":[]
    }
  ]
}

Example

{
  "pages":[

    {
      "name":"Home",
      "path":"/",
      "sections":[
        "Hero",
        "Trusted By",
        "Features",
        "How It Works",
        "Benefits",
        "Testimonials",
        "Pricing",
        "FAQ",
        "CTA",
        "Footer"
      ]
    },

    {
      "name":"Pricing",
      "path":"/pricing",
      "sections":[
        "Pricing Hero",
        "Plans",
        "Comparison",
        "FAQ"
      ]
    }

  ]
}

Only JSON.

No explanation.
`;

module.exports = {
  buildWebsiteStructurePrompt,
};