function validateMarketing(data) {

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Marketing must be a JSON object.");
  }

  return {

    headline: data.headline ?? "",

    subheadline: data.subheadline ?? "",

    cta: data.cta ?? "",

    features: data.features ?? [],

    benefits: data.benefits ?? [],

    seoKeywords: data.seoKeywords ?? [],

    socialPosts: data.socialPosts ?? [],

    emailCampaign: data.emailCampaign ?? {},

    adCopies: data.adCopies ?? [],

  };

}

module.exports = {
  validateMarketing,
};