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
      default: "",
    },

    analysis: {
      ideaScore: { type: Number, default: 0 },
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      opportunities: { type: [String], default: [] },
    },

    evolvedIdea: {
      type: String,
      default: "",
    },

    blueprint: {
      problem: { type: String, default: "" },
      targetAudience: { type: String, default: "" },
      coreFeatures: { type: [String], default: [] },
      uniqueSellingProposition: { type: String, default: "" },
      monetizationStrategy: { type: String, default: "" },
      futureScope: { type: String, default: "" },
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
      default: [],
    },

    generated: {
      html: {
        type: String,
        default: "",
      },

      react: {
        type: String,
        default: "",
      },

      nextjs: {
        type: String,
        default: "",
      },
    },
    assets: {
      logo: {
        type: String,
        default: "",
      },

      heroImage: {
        type: String,
        default: "",
      },

      featureImages: {
        type: [String],
        default: [],
      },

      screenshots: {
        type: [String],
        default: [],
      },
    },
    generation: {
  model: {
    type: String,
    default: "",
  },

  generatedAt: {
    type: Date,
  },

  version: {
    type: Number,
    default: 1,
  },
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);