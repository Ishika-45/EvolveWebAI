const buildWebsiteThemePrompt = (context) => `
You are a SaaS UI Design System Architect.

Create ONLY a compact visual design system for this product.

Do NOT design pages.
Do NOT generate HTML, CSS, Tailwind, JSX, or code.
Do NOT explain your reasoning.

PROJECT
Title: ${context.project.title}
Idea: ${context.project.idea}

BRANDING
${JSON.stringify(context.branding)}

MARKETING
${JSON.stringify(context.marketing)}

WEBSITE PLAN
${JSON.stringify(context.website)}

RULES
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- Keep every string short.
- Use standard web-safe design values.
- Use HEX colors.
- Do not generate CSS code.
- Do not invent brand claims or statistics.
- Arrays must be short.
- Prefer concise design tokens over descriptions.

OUTPUT EXACTLY THIS JSON STRUCTURE:

{
  "themeName": "",
  "designStyle": "",
  "visualMood": "",

  "colorPalette": {
    "primary": "",
    "secondary": "",
    "accent": "",
    "background": "",
    "surface": "",
    "text": "",
    "muted": "",
    "success": "",
    "warning": "",
    "danger": ""
  },

  "gradients": [],

  "typography": {
    "headingFont": "",
    "bodyFont": "",
    "displayFont": "",
    "headingWeight": "",
    "bodyWeight": ""
  },

  "spacing": {
    "base": "",
    "sectionGap": "",
    "cardPadding": ""
  },

  "borderRadius": {
    "small": "",
    "medium": "",
    "large": "",
    "pill": ""
  },

  "shadows": {
    "card": "",
    "button": "",
    "modal": ""
  },

  "buttons": {
    "primary": "",
    "secondary": "",
    "ghost": ""
  },

  "cards": {
    "style": "",
    "hoverEffect": ""
  },

  "animationStyle": "",

  "microInteractions": [],

  "iconStyle": "",

  "illustrationStyle": "",

  "responsiveStrategy": "",

  "accessibilityNotes": []
}

LIMITS
- gradients: maximum 2 items
- microInteractions: maximum 3 items
- accessibilityNotes: maximum 3 items
- Each array item: maximum 8 words
- themeName: maximum 6 words
- designStyle: maximum 4 words
- visualMood: maximum 6 words
- animationStyle: maximum 8 words
- iconStyle: maximum 6 words
- illustrationStyle: maximum 8 words
- responsiveStrategy: maximum 12 words
- buttons values: maximum 8 words
- cards values: maximum 8 words

Return ONLY the JSON object.
`;

module.exports = {
  buildWebsiteThemePrompt,
};