process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "phase1-test-key";
const assert = require("assert");
const {
  validateProductBrief,
  createProductBriefFallback,
  generateProductBrief,
} = require("./productBrief");
const { buildWebsiteBlueprint, buildTheme } = require("./builders");
const {
  validateHomeContent,
  fallbackSections,
  resolveHomeContent,
} = require("./homeContent");
const { renderMvpWebsite } = require("./renderer");
const { generateMvpWebsite, applyMvpGeneration } = require("./generateMvpWebsite");

const project = {
  title: "Focus Board",
  idea: "A simple planning tool for small teams to prioritize important work.",
  website: {},
  generated: { react: "" },
};

const productBrief = {
  version: 1,
  productName: "Focus Board",
  oneLineDescription: "A simple planning tool for small teams.",
  audience: {
    primary: "Small teams planning important work",
    problem: "Teams lose focus when priorities are scattered.",
    desiredOutcome: "Clearer priorities and steady progress.",
  },
  positioning: {
    category: "Team planning tool",
    differentiator: "A focused workspace for the work that matters.",
    brandVoice: "Clear and practical",
  },
  messaging: {
    headline: "Bring priorities into focus",
    subheadline: "Plan important work without unnecessary complexity.",
    primaryCta: "Get started",
    secondaryCta: "Learn more",
  },
  visualDirection: {
    mood: "Modern and focused",
    primaryColorHint: "#123456",
    accentColorHint: "#abcdef",
  },
};

const homeContent = {
  version: 1,
  pageId: "home",
  sections: {
    hero: { eyebrow: "Team planning", headline: "Bring priorities into focus", subheadline: "Plan important work without unnecessary complexity.", primaryCta: "Get started", secondaryCta: "Learn more" },
    benefits: { heading: "Stay aligned", description: "Make the next important step clear.", items: [{ title: "Shared focus", description: "Keep priorities visible for everyone." }] },
    features: { heading: "Simple by design", description: "A practical workspace for planning.", items: [{ title: "Clear priorities", description: "See what deserves attention next." }] },
    "how-it-works": { heading: "How it works", description: "Start with the work that matters.", steps: [{ title: "Choose focus", description: "Identify the next meaningful priority." }] },
    cta: { heading: "Ready to focus?", description: "Start planning with clarity.", primaryCta: "Get started" },
    footer: { tagline: "A simple planning tool for small teams." },
  },
};

async function run() {
  assert.deepStrictEqual(validateProductBrief(productBrief), productBrief);
  assert.strictEqual(validateProductBrief({ ...productBrief, productName: "one two three four five six seven" }), null);
  assert.strictEqual(createProductBriefFallback(project).version, 1);

  const preserved = await generateProductBrief(
    { ...project, website: { productBrief } },
    { aiCall: async () => "{not valid json" }
  );
  assert.strictEqual(preserved.source, "previous");
  assert.deepStrictEqual(preserved.data, productBrief);

  const blueprint = buildWebsiteBlueprint();
  assert.strictEqual(blueprint.pages[0].sections.length, 6);
  assert.strictEqual(blueprint.navigation[1].href, "#features");

  const theme = buildTheme(productBrief);
  assert.strictEqual(theme.colors.primary, "#123456");
  assert.strictEqual(theme.colors.accent, "#abcdef");
  assert.strictEqual(buildTheme({ visualDirection: { primaryColorHint: "url(javascript:bad)" } }).colors.primary, "#4f46e5");

  const validatedHome = validateHomeContent(homeContent);
  assert.deepStrictEqual(validatedHome.invalidSections, []);
  const partial = validateHomeContent({ ...homeContent, sections: { ...homeContent.sections, benefits: {} } });
  const resolved = resolveHomeContent(partial, {}, productBrief, project);
  assert.strictEqual(resolved.status, "fallback");
  assert(resolved.data.sections.benefits.items.length > 0);
  assert.strictEqual(fallbackSections(productBrief, project).hero.primaryCta, "Get started");

  const html = renderMvpWebsite({ project, productBrief, blueprint, theme, pageContent: homeContent });
  assert(html.includes('href="#features"'));
  assert(html.includes("Bring priorities into focus"));
  assert(!html.includes("renderObject"));
  assert(renderMvpWebsite({ project, productBrief: { ...productBrief, productName: "<unsafe>" }, blueprint, theme, pageContent: homeContent }).includes("&lt;unsafe&gt;"));

  let callCount = 0;
  const result = await generateMvpWebsite(project, {
    aiCall: async () => {
      callCount += 1;
      return JSON.stringify(callCount === 1 ? productBrief : homeContent);
    },
  });
  assert.strictEqual(callCount, 2);
  assert.strictEqual(result.generation.status, "completed");
  const persisted = applyMvpGeneration({ ...project, generated: { react: "keep" } }, result);
  assert(persisted.generated.html.includes("<!doctype html>"));
  assert.strictEqual(persisted.generated.react, "keep");
  assert.strictEqual(persisted.website.pages.home.status, "succeeded");
}

run().then(() => console.log("Phase 1 MVP core checks passed")).catch((error) => {
  console.error(error);
  process.exit(1);
});
