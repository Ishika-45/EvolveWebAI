const { makeAICall, DEFAULT_MODEL } = require("../config/ai");

const SECTION_IDS = ["hero", "benefits", "features", "how-it-works", "cta", "footer"];

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(value, maxWords, { optional = false } = {}) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned) return optional ? "" : null;
  return cleaned.split(/\s+/).length <= maxWords ? cleaned : null;
}

function cards(value, maximum) {
  if (!Array.isArray(value) || value.length < 1 || value.length > maximum) return null;
  const items = value.map((item) => {
    if (!isObject(item)) return null;
    const title = text(item.title, 6);
    const description = text(item.description, 18);
    return title && description ? { title, description } : null;
  });
  return items.every(Boolean) ? items : null;
}

function validateSection(id, value) {
  if (!isObject(value)) return null;

  if (id === "hero") {
    const eyebrow = text(value.eyebrow, 5, { optional: true });
    const headline = text(value.headline, 12);
    const subheadline = text(value.subheadline, 24);
    const primaryCta = text(value.primaryCta, 4);
    const secondaryCta = text(value.secondaryCta, 4, { optional: true });
    return headline && subheadline && primaryCta && eyebrow !== null && secondaryCta !== null
      ? { eyebrow, headline, subheadline, primaryCta, secondaryCta }
      : null;
  }

  if (id === "benefits" || id === "features") {
    const heading = text(value.heading, 10);
    const description = text(value.description, 24);
    const items = cards(value.items, id === "benefits" ? 3 : 4);
    return heading && description && items ? { heading, description, items } : null;
  }

  if (id === "how-it-works") {
    const heading = text(value.heading, 10);
    const description = text(value.description, 24);
    const steps = cards(value.steps, 3);
    return heading && description && steps ? { heading, description, steps } : null;
  }

  if (id === "cta") {
    const heading = text(value.heading, 12);
    const description = text(value.description, 24);
    const primaryCta = text(value.primaryCta, 4);
    return heading && description && primaryCta ? { heading, description, primaryCta } : null;
  }

  if (id === "footer") {
    const tagline = text(value.tagline, 16);
    return tagline ? { tagline } : null;
  }

  return null;
}

function validateHomeContent(value) {
  if (!isObject(value) || value.version !== 1 || value.pageId !== "home" || !isObject(value.sections)) {
    return null;
  }

  const sections = {};
  const invalidSections = [];

  for (const id of SECTION_IDS) {
    const section = validateSection(id, value.sections[id]);
    if (section) sections[id] = section;
    else invalidSections.push(id);
  }

  return { sections, invalidSections };
}

function limitWords(value, maximum, fallback) {
  const words = String(value || "").trim().split(/\s+/).filter(Boolean);
  return words.slice(0, maximum).join(" ") || fallback;
}

function fallbackSections(productBrief = {}, project = {}) {
  const messaging = productBrief.messaging || {};
  const productName = limitWords(productBrief.productName || project.title, 6, "Your Product");
  const oneLineDescription = limitWords(productBrief.oneLineDescription || project.idea, 20, "A focused solution for a meaningful challenge.");
  const outcome = limitWords(productBrief.audience?.desiredOutcome, 18, "Make progress with more clarity.");

  return {
    hero: {
      eyebrow: limitWords(productBrief.positioning?.category, 5, "Built for progress"),
      headline: limitWords(messaging.headline, 12, `${productName} made clearer`),
      subheadline: limitWords(messaging.subheadline, 24, oneLineDescription),
      primaryCta: limitWords(messaging.primaryCta, 4, "Get started"),
      secondaryCta: limitWords(messaging.secondaryCta, 4, "Learn more"),
    },
    benefits: {
      heading: "Built around your goals",
      description: "A focused experience designed to reduce friction and support meaningful progress.",
      items: [
        { title: "Clear focus", description: "Keep the important work easy to understand." },
        { title: "Simple flow", description: "Move from intention to action with less friction." },
        { title: "Useful progress", description: outcome },
      ],
    },
    features: {
      heading: "What makes it useful",
      description: "A practical foundation shaped by the project’s core direction.",
      items: [
        { title: "Focused experience", description: "Designed around the problem your audience faces." },
        { title: "Clear value", description: "Communicates the outcome without unnecessary complexity." },
        { title: "Flexible foundation", description: "Ready to evolve as the product learns and grows." },
      ],
    },
    "how-it-works": {
      heading: "How it works",
      description: "A straightforward path from the current challenge to a better outcome.",
      steps: [
        { title: "Start simply", description: "Begin with the need that matters most." },
        { title: "Stay focused", description: "Use a clear experience to make steady progress." },
        { title: "Move forward", description: "Build momentum toward your desired outcome." },
      ],
    },
    cta: {
      heading: `Ready to explore ${productName}?`,
      description: oneLineDescription,
      primaryCta: limitWords(messaging.primaryCta, 4, "Get started"),
    },
    footer: {
      tagline: limitWords(productBrief.oneLineDescription, 16, oneLineDescription),
    },
  };
}

function resolveHomeContent(candidate, previousContent, productBrief, project) {
  const previousSections = previousContent?.sections || {};
  const defaults = fallbackSections(productBrief, project);
  const content = {};
  const warnings = [];
  let fallbackUsed = false;
  let previousUsed = false;

  for (const id of SECTION_IDS) {
    const current = candidate?.sections?.[id];
    const previous = validateSection(id, previousSections[id]);

    if (current) {
      content[id] = current;
    } else if (previous) {
      content[id] = previous;
      previousUsed = true;
      warnings.push(`Preserved previous valid ${id} content.`);
    } else {
      content[id] = defaults[id];
      fallbackUsed = true;
      warnings.push(`Used deterministic fallback for ${id} content.`);
    }
  }

  return {
    data: { version: 1, pageId: "home", sections: content },
    status: fallbackUsed || previousUsed ? "fallback" : "succeeded",
    source: fallbackUsed ? "fallback" : previousUsed ? "previous" : "ai",
    warnings,
  };
}

function buildHomeContentPrompt(project, productBrief, blueprint) {
  return `You write concise landing-page copy. Return ONLY valid JSON.\n\nPROJECT\nTitle: ${project?.title || ""}\nIdea: ${project?.idea || ""}\n\nPRODUCT BRIEF\n${JSON.stringify(productBrief)}\n\nBLUEPRINT\n${JSON.stringify(blueprint)}\n\nReturn exactly:\n{"version":1,"pageId":"home","sections":{"hero":{"eyebrow":"","headline":"","subheadline":"","primaryCta":"","secondaryCta":""},"benefits":{"heading":"","description":"","items":[{"title":"","description":""}]},"features":{"heading":"","description":"","items":[{"title":"","description":""}]},"how-it-works":{"heading":"","description":"","steps":[{"title":"","description":""}]},"cta":{"heading":"","description":"","primaryCta":""},"footer":{"tagline":""}}}\n\nLimits: eyebrow 5 words; headings 12; descriptions 24; card titles 6; card descriptions 18; CTA values 4; footer tagline 16. Benefits maximum 3 items, features maximum 4, steps maximum 3. Do not generate HTML, CSS, JavaScript, routes, navigation, theme tokens, structure, SEO, social posts, email, ads, testimonials, metrics, pricing claims, or customer logos.`;
}

async function generateHomeContent(project, productBrief, blueprint, { aiCall = makeAICall } = {}) {
  const call = aiCall || makeAICall;
  let candidate = null;
  let model = "";
  let callWarning = "";

  try {
    const response = await call(
      [
        { role: "system", content: "Return only compact, valid JSON." },
        { role: "user", content: buildHomeContentPrompt(project, productBrief, blueprint) },
      ],
      { temperature: 0.3, max_tokens: 1600, response_format: { type: "json_object" } }
    );
    candidate = validateHomeContent(JSON.parse(response));
    model = DEFAULT_MODEL;
    if (!candidate) callWarning = "Home Content AI output was invalid; unavailable sections used safe fallbacks.";
  } catch (error) {
    callWarning = "Home Content AI output was unavailable; used safe fallbacks where needed.";
  }

  const resolved = resolveHomeContent(candidate, project?.website?.pages?.home?.content, productBrief, project);
  if (callWarning) resolved.warnings.unshift(callWarning);
  return { ...resolved, model };
}

module.exports = {
  SECTION_IDS,
  validateHomeContent,
  fallbackSections,
  resolveHomeContent,
  buildHomeContentPrompt,
  generateHomeContent,
};
