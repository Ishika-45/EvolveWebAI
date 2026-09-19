const buildWebsiteThemePrompt = (context) => `
You are a SaaS UI Design System Architect.

Create a compact visual design system for this product.

Do NOT design pages.
Do NOT generate HTML, CSS, Tailwind, JSX, or code.
Do NOT explain reasoning.

PROJECT:
Title: ${context.project.title}
Idea: ${context.project.idea}

BRANDING:
${JSON.stringify(context.branding)}

MARKETING:
${JSON.stringify(context.marketing)}

WEBSITE PLAN:
${JSON.stringify(context.website)}

STRICT RULES:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanations.
4. No reasoning.
5. No extra fields.
6. Keep every string extremely concise.
7. Use HEX colors.
8. Use standard web-safe values.
9. Do not invent claims or statistics.
10. Keep arrays short.
11. Do not generate CSS.
12. Do not generate code.

OUTPUT EXACTLY:

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

OUTPUT LIMITS:

themeName: maximum 4 words
designStyle: maximum 3 words
visualMood: maximum 4 words

gradients: maximum 1 item
microInteractions: maximum 2 items
accessibilityNotes: maximum 2 items

Each array item: maximum 5 words.

Use short values for:

* typography
* spacing
* borderRadius
* shadows
* buttons
* cards

responsiveStrategy: maximum 8 words
animationStyle: maximum 5 words
iconStyle: maximum 4 words
illustrationStyle: maximum 5 words

Return ONLY the JSON object.
`;

module.exports = {
buildWebsiteThemePrompt,
};
