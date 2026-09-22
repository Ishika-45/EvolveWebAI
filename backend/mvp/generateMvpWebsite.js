const { generateProductBrief } = require("./productBrief");
const { buildWebsiteBlueprint, buildTheme } = require("./builders");
const { generateHomeContent } = require("./homeContent");
const { renderMvpWebsite } = require("./renderer");

function plain(value) {
  return value?.toObject ? value.toObject() : value || {};
}

async function generateMvpWebsite(project, { aiCall } = {}) {
  const productBriefUnit = await generateProductBrief(project, { aiCall });
  const blueprint = buildWebsiteBlueprint();
  const theme = buildTheme(productBriefUnit.data);
  const homeUnit = await generateHomeContent(project, productBriefUnit.data, blueprint, { aiCall });
  const html = renderMvpWebsite({
    project,
    productBrief: productBriefUnit.data,
    blueprint,
    theme,
    pageContent: homeUnit.data,
  });

  const warnings = [...productBriefUnit.warnings, ...homeUnit.warnings];
  const status = productBriefUnit.status === "succeeded" && homeUnit.status === "succeeded"
    ? "completed"
    : "partial";
  const generatedAt = new Date();

  return {
    html,
    website: {
      version: 1,
      productBrief: productBriefUnit.data,
      blueprint,
      theme,
      pages: {
        home: {
          content: homeUnit.data,
          status: homeUnit.status,
          source: homeUnit.source,
          updatedAt: generatedAt,
          warnings: homeUnit.warnings,
        },
      },
    },
    generation: {
      status,
      model: productBriefUnit.model || homeUnit.model || "",
      generatedAt,
      version: 2,
      units: {
        productBrief: {
          status: productBriefUnit.status,
          source: productBriefUnit.source,
          updatedAt: generatedAt,
          warnings: productBriefUnit.warnings,
        },
        home: {
          status: homeUnit.status,
          source: homeUnit.source,
          updatedAt: generatedAt,
          warnings: homeUnit.warnings,
        },
        render: {
          status: "succeeded",
          source: "deterministic",
          updatedAt: generatedAt,
          warnings: [],
        },
      },
      warnings,
    },
  };
}

function applyMvpGeneration(project, result) {
  project.website = result.website;
  project.generated = { ...plain(project.generated), html: result.html };
  project.generation = result.generation;
  return project;
}

module.exports = { generateMvpWebsite, applyMvpGeneration };
