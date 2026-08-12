function validateWebsiteSections(data, websiteStructure) {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error("Website Sections must be an object.");
  }

  if (!Array.isArray(data.pages)) {
    throw new Error(
      "Website Sections must contain a pages array."
    );
  }

  if (
    !websiteStructure ||
    typeof websiteStructure !== "object" ||
    !Array.isArray(websiteStructure.pages)
  ) {
    throw new Error(
      "Website structure is required to validate website sections."
    );
  }

  // -----------------------------------------
  // Expected pages from WebsiteStructureAgent
  // -----------------------------------------

  const expectedPages = websiteStructure.pages;

  if (data.pages.length !== expectedPages.length) {
    throw new Error(
      `Website Sections must contain exactly ${expectedPages.length} pages.`
    );
  }

  const expectedPageNames = new Set(
    expectedPages.map((page) => page.name.trim())
  );

  const pageNames = new Set();

  // -----------------------------------------
  // Validate pages
  // -----------------------------------------

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

    const pageName = page.name.trim();

    // Duplicate page names
    if (pageNames.has(pageName)) {
      throw new Error(
        `Duplicate page name: ${pageName}`
      );
    }

    pageNames.add(pageName);

    // Page must already exist in WebsiteStructure
    if (!expectedPageNames.has(pageName)) {
      throw new Error(
        `Unexpected page "${pageName}". Section Agent cannot create new pages.`
      );
    }

    // -----------------------------------------
    // Sections
    // -----------------------------------------

    if (
      !Array.isArray(page.sections) ||
      page.sections.length === 0
    ) {
      throw new Error(
        `Page "${pageName}" must contain at least one section.`
      );
    }

    const sectionIds = new Set();

    const sections = page.sections.map(
      (section, sectionIndex) => {
        if (
          !section ||
          typeof section !== "object" ||
          Array.isArray(section)
        ) {
          throw new Error(
            `Invalid section at ${pageName}[${sectionIndex}].`
          );
        }

        // -----------------------------------------
        // Section ID
        // -----------------------------------------

        if (
          typeof section.id !== "string" ||
          !section.id.trim()
        ) {
          throw new Error(
            `Section at ${pageName}[${sectionIndex}] must have a valid id.`
          );
        }

        const sectionId = section.id.trim();

        if (sectionIds.has(sectionId)) {
          throw new Error(
            `Duplicate section id "${sectionId}" on page "${pageName}".`
          );
        }

        sectionIds.add(sectionId);

        // -----------------------------------------
        // Section title
        // -----------------------------------------

        if (
          typeof section.title !== "string" ||
          !section.title.trim()
        ) {
          throw new Error(
            `Section "${sectionId}" must have a valid title.`
          );
        }

        // -----------------------------------------
        // Section purpose
        // -----------------------------------------

        if (
          typeof section.purpose !== "string" ||
          !section.purpose.trim()
        ) {
          throw new Error(
            `Section "${sectionId}" must have a valid purpose.`
          );
        }

        // -----------------------------------------
        // Priority
        // -----------------------------------------

        const priority = section.priority ?? "medium";

        if (
          !["high", "medium", "low"].includes(priority)
        ) {
          throw new Error(
            `Invalid priority "${priority}" for section "${sectionId}".`
          );
        }

        return {
          id: sectionId,
          title: section.title.trim(),
          purpose: section.purpose.trim(),
          priority,
        };
      }
    );

    return {
      name: pageName,
      sections,
    };
  });

  // -----------------------------------------
  // Ensure no expected page is missing
  // -----------------------------------------

  for (const expectedPage of expectedPages) {
    const expectedName = expectedPage.name.trim();

    if (!pageNames.has(expectedName)) {
      throw new Error(
        `Missing page "${expectedName}" from Website Sections output.`
      );
    }
  }

  return {
    pages,
  };
}

module.exports = {
  validateWebsiteSections,
};
