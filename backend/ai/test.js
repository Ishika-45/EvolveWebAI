require("dotenv").config();
console.log("API Key Loaded:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");
const orchestrator = require("./index");

(async () => {
  const project = {
    id: "1",
    title: "EvolveWeb AI",
    idea:
      "An AI-powered SaaS that converts startup ideas into complete websites, branding, business plans, and marketing assets.",
  };

  try {
    const result = await orchestrator.execute(project);

    console.log(JSON.stringify(result.toJSON(), null, 2));
  } catch (error) {
    console.error(error);
  }
})();