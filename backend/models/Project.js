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

    idea: {
      type: String,
    },

    analysis: {
      ideaScore: Number,
      strengths: [String],
      weaknesses: [String],
      opportunities: [String],
    },

    evolvedIdea: {
      type: String,
    },

    blueprint: {
      problem: String,
      targetAudience: String,
      coreFeatures: [String],
      uniqueSellingProposition: String,
      monetizationStrategy: String,
      futureScope: String,
    },

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

    generatedCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);