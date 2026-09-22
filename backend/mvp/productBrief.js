const { makeAICall, DEFAULT_MODEL } = require("../config/ai");

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validText(value, maxWords, { optional = false } = {}) {
  if (typeof value !== "string") return false;
  const text = value.trim();
  if (!text) return optional;
  return text.split(/\s+/).length <= maxWords;
}

function validOptionalHex(value) {
  return value === "" || (typeof value === "string" && HEX_COLOR.test(value));
}

function validateProductBrief(value) {
  if (!isObject(value) || value.version !== 1) return null;

  const { audience, positioning, messaging, visualDirection } = value;
  if (!isObject(audience) || !isObject(positioning) || !isObject(messaging) || !isObject(visualDirection)) {
    return null;
  }

  const valid =
    validText(value.productName, 6) &&
    validText(value.oneLineDescription, 20) &&
    validText(audience.primary, 16) &&
    validText(audience.problem, 24) &&
    validText(audience.desiredOutcome, 20) &&
    validText(positioning.category, 8) &&
    validText(positioning.differentiator, 24) &&
    validText(positioning.brandVoice, 8) &&
    validText(messaging.headline, 12) &&
    validText(messaging.subheadline, 24) &&
    validText(messaging.primaryCta, 4) &&
    validText(messaging.secondaryCta, 4) &&
    validText(visualDirection.mood, 4) &&
    validOptionalHex(visualDirection.primaryColorHint) &&
    validOptionalHex(visualDirection.accentColorHint);

  if (!valid) return null;

  return {
    version: 1,
    productName: value.productName.trim(),
    oneLineDescription: value.oneLineDescription.trim(),
    audience: {
      primary: audience.primary.trim(),
      problem: audience.problem.trim(),
      desiredOutcome: audience.desiredOutcome.trim(),
    },
    positioning: {
      category: positioning.category.trim(),
      differentiator: positioning.differentiator.trim(),
      brandVoice: positioning.brandVoice.trim(),
    },
    messaging: {
      headline: messaging.headline.trim(),
      subheadline: messaging.subheadline.trim(),
      primaryCta: messaging.primaryCta.trim(),
      secondaryCta: messaging.secondaryCta.trim(),
    },
    visualDirection: {
      mood: visualDirection.mood.trim(),
      primaryColorHint: visualDirection.primaryColorHint || "",
      accentColorHint: visualDirection.accentColorHint || "",
    },
  };
}

function limitWords(value, maxWords, fallback) {
  const words = String(value || "").trim().split(/\s+/).filter(Boolean);
  return (words.slice(0, maxWords).join(" ") || fallback).trim();
}

function createProductBriefFallback(project) {
  const productName = limitWords(project?.title, 6, "Your Product");
  const idea = limitWords(project?.idea, 20, "A clearer solution for an everyday challenge.");

  return {
    version: 1,
    productName,
    oneLineDescription: idea,
    audience: {
      primary: "People seeking a simpler solution",
      problem: "The challenge described in the project idea.",
      desiredOutcome: "A clearer path toward their goals.",
    },
    positioning: {
      category: "Digital product",
      differentiator: "A focused experience built around the project idea.",
      brandVoice: "Clear and practical",
    },
    messaging: {
      headline: `${productName} made clearer`,
      subheadline: idea,
      primaryCta: "Get started",
      secondaryCta: "Learn more",
    },
    visualDirection: {
      mood: "Modern and focused",
      primaryColorHint: "",
      accentColorHint: "",
    },
  };
}

function buildProductBriefPrompt(project) {
  return `You create concise startup product briefs. Return ONLY valid JSON.\n\nPROJECT\nTitle: ${project?.title || ""}\nIdea: ${project?.idea || ""}\n\nReturn exactly this schema:\n{"version":1,"productName":"","oneLineDescription":"","audience":{"primary":"","problem":"","desiredOutcome":""},"positioning":{"category":"","differentiator":"","brandVoice":""},"messaging":{"headline":"","subheadline":"","primaryCta":"","secondaryCta":""},"visualDirection":{"mood":"","primaryColorHint":"","accentColorHint":""}}\n\nLimits: productName 6 words; oneLineDescription 20; audience.primary 16; audience.problem 24; audience.desiredOutcome 20; positioning.category 8; positioning.differentiator 24; brandVoice 8; headline 12; subheadline 24; CTAs 4 each; mood 4. Color hints must be empty or six-digit HEX. Do not include structure, code, SEO, social posts, email, ads, pricing, testimonials, statistics, image prompts, or unsupported claims.`;
}

async function generateProductBrief(project, { aiCall = makeAICall } = {}) {
  const previous = validateProductBrief(project?.website?.productBrief);
  const call = aiCall || makeAICall;

  try {
    const response = await call(
      [
        { role: "system", content: "Return only compact, valid JSON." },
        { role: "user", content: buildProductBriefPrompt(project) },
      ],
      { temperature: 0.2, max_tokens: 900, response_format: { type: "json_object" } }
    );
    const parsed = JSON.parse(response);
    const productBrief = validateProductBrief(parsed);

    if (!productBrief) {
      throw new Error("Product Brief schema validation failed");
    }

    return { data: productBrief, status: "succeeded", source: "ai", model: DEFAULT_MODEL, warnings: [] };
  } catch (error) {
    if (previous) {
      return {
        data: previous,
        status: "fallback",
        source: "previous",
        model: "",
        warnings: ["Product Brief AI output was unavailable; preserved the previous valid brief."],
      };
    }

    return {
      data: createProductBriefFallback(project),
      status: "fallback",
      source: "fallback",
      model: "",
      warnings: ["Product Brief AI output was unavailable; used deterministic fallback content."],
    };
  }
}

module.exports = {
  HEX_COLOR,
  validateProductBrief,
  createProductBriefFallback,
  buildProductBriefPrompt,
  generateProductBrief,
};
