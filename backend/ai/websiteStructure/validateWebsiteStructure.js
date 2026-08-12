function validateWebsiteStructure(data) {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error(
      "Website structure must be an object."
    );
  }

  if (!Array.isArray(data.pages)) {
    throw new Error(
      "Website structure must contain a pages array."
    );
  }

  if (data.pages.length === 0) {
    throw new Error(
      "Website structure must contain at least one page."
    );
  }

  const pageNames = new Set();
  const pagePaths = new Set();

  const pages = data.pages.map((page, pageIndex) => {
    if (
      !page ||
      typeof page !== "object" ||
      Array.isArray(page)
    ) {
      throw new Error(
        `Invalid page at index ${pageIndex}.`
      );
    }

    if (
      typeof page.name !== "string" ||
      !page.name.trim()
    ) {
      throw new Error(
        `Page at index ${pageIndex} must have a valid name.`
      );
    }

    const name = page.name.trim();

    if (pageNames.has(name)) {
      throw new Error(
        `Duplicate page name: ${name}`
      );
    }

    pageNames.add(name);

    if (
      typeof page.path !== "string" ||
      !page.path.trim()
    ) {
      throw new Error(
        `Page "${name}" must have a valid path.`
      );
    }

    const path = page.path.trim();

    if (!path.startsWith("/")) {
      throw new Error(
        `Invalid path "${path}" for page "${name}".`
      );
    }

    if (pagePaths.has(path)) {
      throw new Error(
        `Duplicate page path: ${path}`
      );
    }

    pagePaths.add(path);

    if (
      !Array.isArray(page.sections) ||
      page.sections.length === 0
    ) {
      throw new Error(
        `Page "${name}" must contain at least one section.`
      );
    }

    const sections = page.sections.map(
      (section, sectionIndex) => {
        if (typeof section !== "string") {
          throw new Error(
            `Section at ${name}[${sectionIndex}] must be a string.`
          );
        }

        const normalizedSection = section.trim();

        if (!normalizedSection) {
          throw new Error(
            `Section at ${name}[${sectionIndex}] cannot be empty.`
          );
        }

        return normalizedSection;
      }
    );

    return {
      name,
      path,
      sections,
    };
  });

  return {
    pages,
  };
}

module.exports = {
  validateWebsiteStructure,
};