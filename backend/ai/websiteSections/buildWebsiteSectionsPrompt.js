const buildWebsiteSectionsPrompt = (context) => `
You are a Senior UX Architect.

Your task is a STRUCTURE TRANSFORMATION task.

Convert the existing WEBSITE STRUCTURE into structured section objects.

DO NOT redesign the website.
DO NOT make strategic decisions.
DO NOT explain your reasoning.

PROJECT:
Title: ${context.project.title}
Idea: ${context.project.idea}

WEBSITE STRUCTURE:
${JSON.stringify(context.website?.structure || {})}

STRICT RULES:

1. Return EVERY page from WEBSITE STRUCTURE.
2. Keep every page name exactly unchanged.
3. Keep every page path exactly unchanged.
4. Keep the existing sections exactly as provided.
5. Do NOT add pages.
6. Do NOT remove pages.
7. Do NOT add sections.
8. Do NOT remove sections.
9. Do NOT rename section titles.
10. Convert each existing section string into an object.
11. Every section object MUST contain exactly:

* id
* title
* purpose
* priority

12. id must be lowercase kebab-case.
13. id must be unique within its page.
14. title must exactly match the existing section name.
15. purpose must be a SHORT description of what that section does.
16. purpose must be maximum 12 words.
17. priority must be exactly one of:
    "high"
    "medium"
    "low"
18. Use "high" for sections essential to the page's main purpose.
19. Use "medium" for useful supporting sections.
20. Use "low" for optional/supporting sections.
21. Do not generate website copy.
22. Do not generate UI instructions.
23. Do not generate components.
24. Do not generate code.
25. Do not generate colors.
26. Do not generate images.
27. Do not generate animations.
28. Do not use markdown.
29. Do not explain anything.
30. Do not output reasoning or analysis.
31. Output ONLY the final JSON.
32. The output must be valid JSON.
33. Do not add any fields outside the required schema.

OUTPUT FORMAT:

{
"pages": [
{
"name": "Home",
"path": "/",
"sections": [
{
"id": "hero",
"title": "Hero",
"purpose": "Explain the main value proposition.",
"priority": "high"
}
]
}
]
}

Return ONLY JSON.
`;

module.exports = {
buildWebsiteSectionsPrompt,
};
