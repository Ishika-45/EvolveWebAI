const buildWebsiteThemePrompt = (context) => `

You are a world-class UI Design Director.

Your responsibility is ONLY to create the visual design system.

Do NOT design pages.

Do NOT generate code.

=================================================

PROJECT

${context.project.title}

${context.project.idea}

=================================================

BRANDING

${JSON.stringify(context.branding, null, 2)}

=================================================

MARKETING

${JSON.stringify(context.marketing, null, 2)}

=================================================

WEBSITE PLAN

${JSON.stringify(context.website, null, 2)}

=================================================

Design a premium SaaS design system.

Take inspiration from

• Apple
• Stripe
• Framer
• Linear
• Vercel
• Notion

The design must feel modern,
minimal,
premium,
interactive,
and highly polished.

Return ONLY valid JSON.

{

"themeName":"",

"designStyle":"",

"visualMood":"",

"colorPalette":{

"primary":"",
"secondary":"",
"accent":"",
"background":"",
"surface":"",
"text":"",
"muted":"",
"success":"",
"warning":"",
"danger":""

},

"gradients":[

],

"typography":{

"headingFont":"",
"bodyFont":"",
"displayFont":"",

"headingWeight":"",
"bodyWeight":""

},

"spacing":{

"base":"",
"sectionGap":"",
"cardPadding":""

},

"borderRadius":{

"small":"",
"medium":"",
"large":"",
"pill":""

},

"shadows":{

"card":"",
"button":"",
"modal":""

},

"buttons":{

"primary":"",
"secondary":"",
"ghost":""

},

"cards":{

"style":"",
"hoverEffect":""

},

"animationStyle":"",

"microInteractions":[

],

"iconStyle":"",

"illustrationStyle":"",

"responsiveStrategy":"",

"accessibilityNotes":[

]

}

Return ONLY JSON.

No markdown.

`;

module.exports = {
  buildWebsiteThemePrompt,
};