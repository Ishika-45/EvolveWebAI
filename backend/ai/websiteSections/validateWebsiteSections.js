function validateWebsiteSections(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Website Sections must be an object.");
  }

  return {
    pages: Array.isArray(data.pages)
      ? data.pages.map((page) => ({
          name: page.name ?? "",

          sections: Array.isArray(page.sections)
            ? page.sections.map((section) => ({
                id: section.id ?? "",
                title: section.title ?? "",
                purpose: section.purpose ?? "",
                priority: section.priority ?? "medium",
              }))
            : [],
        }))
      : [],
  };
}

module.exports = {
  validateWebsiteSections,
};