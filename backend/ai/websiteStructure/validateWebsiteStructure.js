function validateWebsiteStructure(data) {

  if (!data || typeof data !== "object") {
    throw new Error("Website structure must be an object.");
  }

  return {

    pages: Array.isArray(data.pages)
      ? data.pages
      : [],

  };

}

module.exports = {
  validateWebsiteStructure,
};