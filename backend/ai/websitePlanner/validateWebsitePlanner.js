function validateWebsitePlanner(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Website planner must return an object.");
  }

  const stringFields = [
    "websiteType",
    "goal",
    "framework",
    "themeRecommendation",
    "primaryCTA",
    "secondaryCTA",
  ];

  for (const field of stringFields) {
    if (typeof data[field] !== "string") {
      throw new Error(`Website planner ${field} must be a string.`);
    }
  }

  if (!Array.isArray(data.navigation)) {
    throw new Error("Website planner navigation must be an array.");
  }

  if (!Array.isArray(data.pages)) {
    throw new Error("Website planner pages must be an array.");
  }

  if (data.navigation.length > 8) {
    throw new Error("Website planner cannot contain more than 8 navigation items.");
  }

  if (data.pages.length === 0 || data.pages.length > 8) {
    throw new Error("Website planner must contain between 1 and 8 pages.");
  }

  for (const item of data.navigation) {
    if (typeof item !== "string" || !item.trim()) {
      throw new Error("Website planner navigation items must be non-empty strings.");
    }
  }

  for (const page of data.pages) {
    if (typeof page !== "string" || !page.trim()) {
      throw new Error("Website planner page names must be non-empty strings.");
    }
  }

  return {
    websiteType: data.websiteType.trim(),
    goal: data.goal.trim(),
    framework: data.framework.trim(),
    themeRecommendation: data.themeRecommendation.trim(),
    primaryCTA: data.primaryCTA.trim(),
    secondaryCTA: data.secondaryCTA.trim(),
    navigation: data.navigation.map((item) => item.trim()),
    pages: data.pages.map((page) => page.trim()),
  };
}

module.exports = { validateWebsitePlanner };