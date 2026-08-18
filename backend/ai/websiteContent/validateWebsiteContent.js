function validateWebsiteContent(data, websiteSections) {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error(
      "Website Content must be an object."
    );
  }

  if (!Array.isArray(data.pages)) {
    throw new Error(
      "Website Content must contain a pages array."
    );
  }

  if (
    !websiteSections ||
    typeof websiteSections !== "object" ||
    !Array.isArray(websiteSections.pages)
  ) {
    throw new Error(
      "Website sections are required to validate website content."
    );
  }

  const expectedPages = websiteSections.pages;

  if (data.pages.length !== expectedPages.length) {
    throw new Error(
      `Website Content must contain exactly ${expectedPages.length} pages.`
    );
  }

  const expectedPageMap = new Map(
    expectedPages.map((page) => [
      page.name.trim(),
      page,
    ])
  );

  const pageNames = new Set();

  const pages = data.pages.map(
    (page, pageIndex) => {
      if (
        !page ||
        typeof page !== "object" ||
        Array.isArray(page)
      ) {
        throw new Error(
          `Invalid content page at index ${pageIndex}.`
        );
      }

      if (
        typeof page.name !== "string" ||
        !page.name.trim()
      ) {
        throw new Error(
          `Content page at index ${pageIndex} must have a valid name.`
        );
      }

      const pageName = page.name.trim();

      if (pageNames.has(pageName)) {
        throw new Error(
          `Duplicate content page name: ${pageName}`
        );
      }

      pageNames.add(pageName);

      const expectedPage =
        expectedPageMap.get(pageName);

      if (!expectedPage) {
        throw new Error(
          `Unexpected page "${pageName}" in Website Content.`
        );
      }

      if (!Array.isArray(page.sections)) {
        throw new Error(
          `Page "${pageName}" must contain a sections array.`
        );
      }

      if (
        page.sections.length !==
        expectedPage.sections.length
      ) {
        throw new Error(
          `Page "${pageName}" must contain exactly ${expectedPage.sections.length} sections.`
        );
      }

      const expectedSectionMap =
        new Map(
          expectedPage.sections.map(
            (section) => [
              section.id.trim(),
              section,
            ]
          )
        );

      const sectionIds = new Set();

      const sections = page.sections.map(
        (section, sectionIndex) => {
          if (
            !section ||
            typeof section !== "object" ||
            Array.isArray(section)
          ) {
            throw new Error(
              `Invalid section content at ${pageName}[${sectionIndex}].`
            );
          }

          if (
            typeof section.id !== "string" ||
            !section.id.trim()
          ) {
            throw new Error(
              `Section content at ${pageName}[${sectionIndex}] must have a valid id.`
            );
          }

          const sectionId =
            section.id.trim();

          if (sectionIds.has(sectionId)) {
            throw new Error(
              `Duplicate section id "${sectionId}" on page "${pageName}".`
            );
          }

          sectionIds.add(sectionId);

          if (!expectedSectionMap.has(sectionId)) {
            throw new Error(
              `Unexpected section "${sectionId}" on page "${pageName}".`
            );
          }

          if (
            !section.content ||
            typeof section.content !== "object" ||
            Array.isArray(section.content)
          ) {
            throw new Error(
              `Section "${sectionId}" on page "${pageName}" must contain a content object.`
            );
          }

          return {
            id: sectionId,
            content: section.content,
          };
        }
      );

      for (const expectedSection of expectedPage.sections) {
        const expectedId =
          expectedSection.id.trim();

        if (!sectionIds.has(expectedId)) {
          throw new Error(
            `Missing section "${expectedId}" from page "${pageName}" Website Content output.`
          );
        }
      }

      return {
        name: pageName,
        sections,
      };
    }
  );

  for (const expectedPage of expectedPages) {
    const expectedName =
      expectedPage.name.trim();

    if (!pageNames.has(expectedName)) {
      throw new Error(
        `Missing page "${expectedName}" from Website Content output.`
      );
    }
  }

  return {
    pages,
  };
}

module.exports = {
  validateWebsiteContent,
};