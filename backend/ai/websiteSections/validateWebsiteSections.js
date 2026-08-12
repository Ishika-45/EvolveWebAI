function validateWebsiteSections(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Website Sections must be an object.");
  }

  if (!Array.isArray(data.pages)) {
    throw new Error("Website Sections must contain a pages array.");
  }

  const pageNames = new Set();

  const pages = data.pages.map((page, pageIndex) => {
    if (!page || typeof page !== "object" || Array.isArray(page)) {
      throw new Error(`Invalid page at index ${pageIndex}.`);
    }

    if (
      typeof page.name !== "string" ||
      !page.name.trim()
    ) {
      throw new Error(
        `Page at index ${pageIndex} must have a valid name.`
      );
    }

    if (pageNames.has(page.name)) {
      throw new Error(
        `Duplicate page name: ${page.name}`
      );
    }

    pageNames.add(page.name);

    if (!Array.isArray(page.sections) || page.sections.length === 0) {
      throw new Error(
        `Page "${page.name}" must contain at least one section.`
      );
    }

    const sectionIds = new Set();

    const sections = page.sections.map((section, sectionIndex) => {
      if (
        !section ||
        typeof section !== "object" ||
        Array.isArray(section)
      ) {
        throw new Error(
          `Invalid section at ${page.name}[${sectionIndex}].`
        );
      }

      if (
        typeof section.id !== "string" ||
        !section.id.trim()
      ) {
        throw new Error(
          `Section at ${page.name}[${sectionIndex}] must have a valid id.`
        );
      }

      if (sectionIds.has(section.id)) {
        throw new Error(
          `Duplicate section id "${section.id}" on page "${page.name}".`
        );
      }

      sectionIds.add(section.id);

      if (
        typeof section.title !== "string" ||
        !section.title.trim()
      ) {
        throw new Error(
          `Section "${section.id}" must have a valid title.`
        );
      }

      if (
        typeof section.purpose !== "string" ||
        !section.purpose.trim()
      ) {
        throw new Error(
          `Section "${section.id}" must have a valid purpose.`
        );
      }

      const priority = section.priority ?? "medium";

      if (!["high", "medium", "low"].includes(priority)) {
        throw new Error(
          `Invalid priority "${priority}" for section "${section.id}".`
        );
      }

      return {
        id: section.id.trim(),
        title: section.title.trim(),
        purpose: section.purpose.trim(),
        priority,
      };
    });

    return {
      name: page.name.trim(),
      sections,
    };
  });

  return {
    pages,
  };
}

module.exports = {
  validateWebsiteSections,
};