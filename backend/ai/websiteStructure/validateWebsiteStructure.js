const { toArray, toObject, toStringValue, slugify } = require("../utils/jsonParser");

const DEFAULT_SECTIONS = ["Hero", "Features", "Testimonials", "Pricing", "FAQ", "Footer"];

// Self-healing: repairs missing/duplicate/malformed data instead of
// throwing, since small free models frequently produce near-miss output
// (missing a path, duplicate names, an empty sections array, etc). Only
// truly empty input falls back to a single default page.
function validateWebsiteStructure(data) {
  const obj = toObject(data);
  const rawPages = toArray(obj.pages);

  const pageNames = new Set();
  const paths = new Set();

  let pages = rawPages.map((rawPage) => {
    const page = toObject(rawPage);

    let name = toStringValue(page.name).trim() || "Home";
    let uniqueName = name;
    let n = 2;
    while (pageNames.has(uniqueName)) uniqueName = `${name} ${n++}`;
    pageNames.add(uniqueName);

    let path = toStringValue(page.path).trim() || `/${slugify(uniqueName)}`;
    if (!path.startsWith("/")) path = `/${path}`;
    let uniquePath = path;
    let p = 2;
    while (paths.has(uniquePath)) uniquePath = `${path}-${p++}`;
    paths.add(uniquePath);

    const seen = new Set();
    let sections = toArray(page.sections)
      .map((s) => toStringValue(s).trim())
      .filter((s) => s.length > 0)
      .filter((s) => {
        const key = s.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    if (sections.length === 0) {
      sections = [...DEFAULT_SECTIONS];
    }

    return { name: uniqueName, path: uniquePath, sections };
  });

  if (pages.length === 0) {
    pages = [{ name: "Home", path: "/", sections: [...DEFAULT_SECTIONS] }];
  }

  return { pages };
}

module.exports = {
  validateWebsiteStructure,
};