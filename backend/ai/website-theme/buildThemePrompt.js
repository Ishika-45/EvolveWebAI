const buildThemePrompt = (context) => `
You are a Senior Product Designer and Design System Architect.

Your task is NOT to build a website.

Your task is ONLY to design the visual design system.

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

Website Blueprint:
${JSON.stringify(context.websitePlanner, null, 2)}

Create a premium, modern design system.

Return ONLY valid JSON.

{
  "themeName": "",
  "themeDescription": "",

  "colorSystem": {
    "primary": "",
    "secondary": "",
    "accent": "",
    "background": "",
    "surface": "",
    "text": "",
    "border": "",
    "success": "",
    "warning": "",
    "error": ""
  },

  "typography": {
    "headingFont": "",
    "bodyFont": "",
    "displayFont": "",
    "codeFont": "",
    "fontWeights": [],
    "scale": []
  },

  "spacing": {
    "xs": "",
    "sm": "",
    "md": "",
    "lg": "",
    "xl": "",
    "xxl": ""
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
    "modal": "",
    "dropdown": ""
  },

  "buttons": {
    "style": "",
    "size": "",
    "hoverEffect": ""
  },

  "cards": {
    "style": "",
    "border": "",
    "padding": ""
  },

  "forms": {
    "inputStyle": "",
    "focusStyle": "",
    "validationStyle": ""
  },

  "animations": {
    "style": "",
    "duration": "",
    "easing": ""
  },

  "darkMode": {
    "enabled": true
  },

  "lightMode": {
    "enabled": true
  }
}

Do not explain.

Do not use markdown.

Return ONLY JSON.
`;

module.exports = {
  buildThemePrompt,
};