const { toArray, toObject, toStringValue } = require("../utils/jsonParser");

// Reconciliation, same philosophy as validateWebsiteSections.js: walk the
// expected page/section list from WebsiteSectionAgent and pull in
// whatever content the model actually produced for each one, by id. Any
// section the model didn't produce content for gets an empty content
// object (the HTML renderer already handles empty section content
// gracefully) instead of failing the entire pipeline.
function validateWebsiteContent(data, websiteSections) {
  const obj = toObject(data);
  const sectionsDoc = toObject(websiteSections);
  const expectedPages = toArray(sectionsDoc.pages).map((p) => toObject(p));

  if (expectedPages.length === 0) {
    return { pages: [] };
  }

  const dataPages = toArray(obj.pages).map((p) => toObject(p));
  const dataPageByName = new Map(
    dataPages.map((p) => [toStringValue(p.name).trim().toLowerCase(), p])
  );

  const pages = expectedPages.map((expectedPage) => {
    const pageName = toStringValue(expectedPage.name).trim() || "Home";
    const expectedSections = toArray(expectedPage.sections).map((s) => toObject(s));

    const matchedDataPage = dataPageByName.get(pageName.toLowerCase()) || {};
    const dataSections = toArray(matchedDataPage.sections).map((s) => toObject(s));

    const dataSectionById = new Map(
      dataSections
        .map((s) => [toStringValue(s.id).trim().toLowerCase(), s])
        .filter(([key]) => key)
    );

    const sections = expectedSections.map((expectedSection) => {
      const id = toStringValue(expectedSection.id).trim();
      const match = dataSectionById.get(id.toLowerCase());
      const content = toObject(match?.content);

      return { id, content };
    });

    return { name: pageName, sections };
  });

  return { pages };
}

module.exports = {
  validateWebsiteContent,
};