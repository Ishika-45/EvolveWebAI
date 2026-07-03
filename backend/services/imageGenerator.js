const generateAssets = async (project) => {
  const category =
    project.blueprint?.targetAudience ||
    project.idea ||
    "startup";

  return {
    logo:
      "https://placehold.co/400x400/png?text=Logo",

    heroImage:
      "https://placehold.co/1600x900/png?text=Hero+Image",

    featureImages: [
      "https://placehold.co/800x600/png?text=Feature+1",
      "https://placehold.co/800x600/png?text=Feature+2",
      "https://placehold.co/800x600/png?text=Feature+3",
    ],
  };
};

module.exports = {
  generateAssets,
};