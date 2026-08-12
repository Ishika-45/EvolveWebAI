function validateWebsiteStructure(data) {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error("Website structure must be an object.");
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
  const paths = new Set();

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

    // --------------------------------------------
    // Page Name
    // --------------------------------------------

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

    // --------------------------------------------
    // Page Path
    // --------------------------------------------

    if (
      typeof page.path !== "string" ||
      !page.path.trim()
    ) {
      throw new Error(
        `Page "${name}" must have a valid path.`
      );
    }

    const path = page.path.trim();

    if (paths.has(path)) {
      throw new Error(
        `Duplicate page path: ${path}`
      );
    }

    paths.add(path);

    // --------------------------------------------
    // Sections
    // --------------------------------------------

    if (!Array.isArray(page.sections)) {
      throw new Error(
        `Page "${name}" must contain a sections array.`
      );
    }

    if (page.sections.length === 0) {
      throw new Error(
        `Page "${name}" must contain at least one section.`
      );
    }

    const sections = page.sections.map(
      (section, sectionIndex) => {
        if (
          typeof section !== "string" ||
          !section.trim()
        ) {
          throw new Error(
            `Invalid section at "${name}"[${sectionIndex}].`
          );
        }

        return section.trim();
      }
    );

    // --------------------------------------------
    // Duplicate Sections
    // --------------------------------------------

    const sectionNames = new Set();

    for (const section of sections) {
      if (sectionNames.has(section)) {
        throw new Error(
          `Duplicate section "${section}" on page "${name}".`
        );
      }

      sectionNames.add(section);
    }

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