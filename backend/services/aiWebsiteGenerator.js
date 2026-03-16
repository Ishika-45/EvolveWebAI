const axios = require("axios");

const generateReactWebsite = async (project) => {

  try {

    const prompt = `
You are a senior React developer.

Build a modern React landing page using TailwindCSS.

Startup Idea:
${project.evolvedIdea}

Problem:
${project.blueprint.problem}

Target Audience:
${project.blueprint.targetAudience}

Core Features:
${project.blueprint.coreFeatures.join(", ")}

USP:
${project.blueprint.uniqueSellingProposition}

Rules:
- Return ONLY React code
- Single file
- TailwindCSS
- Export default App component
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: "You are an expert React developer." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {

    console.error("WEBSITE AI ERROR:", error.response?.data || error.message);
    throw new Error("Website generation failed");

  }

};

module.exports = generateReactWebsite;