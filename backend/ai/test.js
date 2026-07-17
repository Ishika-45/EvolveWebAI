require("dotenv").config();

const orchestrator = require("./index");

async function main() {
  try {
    const project = {
      id: "project-001",

      title: "EvolveWeb AI",

      idea: `
An AI-powered SaaS platform that helps founders transform startup ideas
into complete business plans, branding, landing pages, and production-ready websites
using multiple AI agents.
      `,
    };

    console.log("\n🚀 Starting AI Workflow...\n");

    const context = await orchestrator.execute(project);

    console.log("✅ Workflow Completed!\n");

    console.log(JSON.stringify(context.toJSON(), null, 2));
  } catch (error) {
    console.error("\n❌ Workflow Failed\n");
    console.error(error);
  }
}

main();