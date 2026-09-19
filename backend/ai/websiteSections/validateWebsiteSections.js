const { toArray, toObject, toStringValue, slugify } = require("../utils/jsonParser");

const PRIORITIES = ["high", "medium", "low"];

function validateWebsiteSections(data, websiteStructure) {
const obj = toObject(data);
const structure = toObject(websiteStructure);

const expectedPages = toArray(structure.pages).map((page) =>
toObject(page)
);

if (expectedPages.length === 0) {
return { pages: [] };
}

const dataPages = toArray(obj.pages).map((page) =>
toObject(page)
);

const dataPageByName = new Map(
dataPages.map((page) => [
toStringValue(page.name).trim().toLowerCase(),
page,
])
);

const pages = expectedPages.map((expectedPage) => {
const name =
toStringValue(expectedPage.name).trim() || "Home";


const path =
  toStringValue(expectedPage.path).trim() || "/";

const expectedSectionNames = toArray(expectedPage.sections).map(
  (section) => toStringValue(section).trim()
);

const matchedDataPage =
  dataPageByName.get(name.toLowerCase()) || {};

const dataSections = toArray(matchedDataPage.sections).map(
  (section) => toObject(section)
);

const dataSectionByKey = new Map();

for (const section of dataSections) {
  const id = toStringValue(section.id)
    .trim()
    .toLowerCase();

  const title = toStringValue(section.title)
    .trim()
    .toLowerCase();

  if (id) {
    dataSectionByKey.set(id, section);
  }

  if (title) {
    dataSectionByKey.set(title, section);
  }
}

const usedIds = new Set();

const sections = expectedSectionNames.map((sectionName) => {
  const canonicalId = slugify(sectionName) || "section";

  let id = canonicalId;
  let counter = 2;

  while (usedIds.has(id)) {
    id = `${canonicalId}-${counter++}`;
  }

  usedIds.add(id);

  const match =
    dataSectionByKey.get(sectionName.toLowerCase()) ||
    dataSectionByKey.get(canonicalId);

  const purpose =
    toStringValue(match?.purpose).trim() ||
    `Present the ${sectionName.toLowerCase()} of the product.`;

  const rawPriority = toStringValue(match?.priority)
    .trim()
    .toLowerCase();

  const priority = PRIORITIES.includes(rawPriority)
    ? rawPriority
    : "medium";

  return {
    id,
    title: sectionName,
    purpose,
    priority,
  };
});

return {
  name,
  path,
  sections,
};


});

return { pages };
}

module.exports = {
validateWebsiteSections,
};
