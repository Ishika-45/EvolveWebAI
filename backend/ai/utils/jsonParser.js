// ai/utils/jsonParser.js
//
// Small, dependency-free coercion helpers used by every agent's
// validate*.js. Free/small LLMs frequently return the "wrong" but
// reasonable shape for a field (a string instead of a one-item array,
// a missing field instead of an empty array, etc). Throwing on every
// such case makes the whole 9-agent pipeline fail on tiny, recoverable
// mistakes. These helpers normalize instead of rejecting.

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined || value === "") return [];
  if (typeof value === "string") return [value];
  if (typeof value === "object") return Object.values(value);
  return [value];
}

function toObject(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return {};
}

function toStringValue(value, fallback = "") {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.filter((v) => typeof v === "string").join(", ");
  }
  return fallback;
}

function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function slugify(text) {
  const slug = String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || "section";
}

module.exports = {
  toArray,
  toObject,
  toStringValue,
  toNumber,
  slugify,
};