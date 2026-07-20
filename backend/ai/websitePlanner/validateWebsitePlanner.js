function validateWebsitePlanner(data) {

  if (!data) {
    throw new Error("Empty AI response.");
  }

  if (typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Website Planner must return a JSON object.");
  }

  return {

    websiteType: data.websiteType ?? "",

    theme: data.theme ?? "",

    designStyle: data.designStyle ?? "",

    colorStrategy: data.colorStrategy ?? "",

    navigation: data.navigation ?? [],

    pages: data.pages ?? [],

    homepageSections: data.homepageSections ?? [],

    sectionOrder: data.sectionOrder ?? [],

    recommendedComponents: data.recommendedComponents ?? [],

    animations: data.animations ?? [],

    interactions: data.interactions ?? [],

    illustrationStyle: data.illustrationStyle ?? "",

    iconStyle: data.iconStyle ?? "",

    imageStyle: data.imageStyle ?? "",

    recommendedImages: data.recommendedImages ?? [],

    responsiveStrategy: data.responsiveStrategy ?? "",

    userJourney: data.userJourney ?? [],

    conversionGoals: data.conversionGoals ?? [],

    aiRecommendations: data.aiRecommendations ?? [],

  };

}

module.exports = {
  validateWebsitePlanner,
};