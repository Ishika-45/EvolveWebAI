const axios = require("axios");

const generateWebsiteHtml = async (project) => {
  try {
    const prompt = `
You are a senior frontend designer and SaaS landing page expert.

Generate a COMPLETE premium startup landing page as FULL HTML.

Startup Idea:
${project.evolvedIdea || project.idea || project.title || "AI Startup"}

Problem:
${project.blueprint?.problem || ""}

Target Audience:
${project.blueprint?.targetAudience || ""}

Core Features:
${project.blueprint?.coreFeatures?.join(", ") || ""}

Unique Selling Proposition:
${project.blueprint?.uniqueSellingProposition || ""}

Monetization Strategy:
${project.blueprint?.monetizationStrategy || ""}

Future Scope:
${project.blueprint?.futureScope || ""}

Rules:
- Return ONLY clean HTML
- No markdown
- No explanation
- Include <!DOCTYPE html>
- Include full <html>, <head>, and <body>
- Use TailwindCSS CDN
- Use premium modern SaaS styling
- Dark background with beautiful gradients
- Fully responsive
- Add navbar
- Add hero section
- Add features section
- Add problem/solution section
- Add CTA section
- Add footer
- Use startup-specific text, not placeholders
- Make buttons and cards visually polished
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are an expert landing page designer who returns only valid HTML.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "EvolveWeb AI",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content || "";
    console.log("RAW WEBSITE HTML:", content);

    const cleaned = content
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    if (!cleaned || !cleaned.includes("<html") || !cleaned.includes("<body")) {
      console.error("INVALID WEBSITE HTML:", cleaned);
      throw new Error("Invalid HTML returned by AI");
    }

    return cleaned;
  } catch (error) {
    console.error("WEBSITE AI ERROR:", error.response?.data || error.message);
    throw new Error("Website generation failed");
  }
};

module.exports = generateWebsiteHtml;