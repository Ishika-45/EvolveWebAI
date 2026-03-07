const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // original idea
    idea: {
      type: String,
    },

    // AI analysis
    analysis: {
      ideaScore: Number,
      strengths: [String],
      weaknesses: [String],
      opportunities: [String],
    },

    // improved idea
    evolvedIdea: {
      type: String,
    },

    // product blueprint
    blueprint: {
      problem: String,
      targetAudience: String,
      coreFeatures: [String],
      uniqueSellingProposition: String,
      monetizationStrategy: String,
      futureScope: String,
    },

    // website structure
    websiteStructure: {
      pages: [
        {
          name: String,
          sections: [
            {
              sectionName: String,
              title: String,
              description: String,
            },
          ],
        },
      ],
    },

    // generated website code
    generatedCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);