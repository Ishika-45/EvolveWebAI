function validateWebsite(data) {

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Website must be a JSON object.");
  }

  return {

    theme: data.theme ?? {},

    navigation: data.navigation ?? [],

    pages: data.pages ?? [],

    sections: data.sections ?? [],

    components: data.components ?? [],

    layout: data.layout ?? {},

    footer: data.footer ?? {},

    seo: data.seo ?? {},

    animations: data.animations ?? {},

    contentStrategy: data.contentStrategy ?? {},

  };

}

module.exports = {
  validateWebsite,
};