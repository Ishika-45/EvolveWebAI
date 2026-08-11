function validateWebsitePlanner(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Website planner must return an object.");
  }

  return {
    websiteType: data.websiteType ?? "",

    goal: data.goal ?? "",

    framework: data.framework ?? "React",

    themeRecommendation:
      data.themeRecommendation ?? "",

    primaryCTA:
      data.primaryCTA ?? "",

    secondaryCTA:
      data.secondaryCTA ?? "",

    navigation:
      Array.isArray(data.navigation)
        ? data.navigation
        : [],

    pages:
      Array.isArray(data.pages)
        ? data.pages
        : [],
  };
}

module.exports = {
  validateWebsitePlanner,
};