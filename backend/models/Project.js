const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // =========================================================
    // BASIC PROJECT INFORMATION
    // =========================================================

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
      trim: true,
    },

    // =========================================================
    // LEGACY STARTUP ANALYSIS
    // Kept for backward compatibility with existing projects/UI.
    // =========================================================

    analysis: {
      ideaScore: {
        type: Number,
        default: 0,
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      opportunities: {
        type: [String],
        default: [],
      },

      // New Analysis Agent fields
      marketPotential: {
        type: String,
        default: "",
      },

      recommendations: {
        type: [String],
        default: [],
      },
    },

    // =========================================================
    // LEGACY IDEA EVOLUTION
    // Kept for backward compatibility.
    // =========================================================

    evolvedIdea: {
      type: String,
      default: "",
    },

    // =========================================================
    // LEGACY PRODUCT BLUEPRINT
    // Kept for backward compatibility.
    // =========================================================

    blueprint: {
      problem: {
        type: String,
        default: "",
      },

      targetAudience: {
        type: String,
        default: "",
      },

      coreFeatures: {
        type: [String],
        default: [],
      },

      uniqueSellingProposition: {
        type: String,
        default: "",
      },

      monetizationStrategy: {
        type: String,
        default: "",
      },

      futureScope: {
        type: String,
        default: "",
      },
    },

    // =========================================================
    // NEW AI AGENT: BRANDING
    // =========================================================

    branding: {
      brandName: {
        type: String,
        default: "",
      },

      tagline: {
        type: String,
        default: "",
      },

      mission: {
        type: String,
        default: "",
      },

      vision: {
        type: String,
        default: "",
      },

      brandVoice: {
        type: String,
        default: "",
      },

      brandValues: {
        type: [String],
        default: [],
      },

      colorPalette: {
        type: [String],
        default: [],
      },

      targetAudience: {
        type: String,
        default: "",
      },
    },

    // =========================================================
    // ASSETS
    //
    // Supports both:
    // 1. Existing asset fields
    // 2. New Assets Agent output
    // =========================================================

    assets: {
      // -------------------------
      // Existing asset fields
      // -------------------------

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

      // -------------------------
      // New Assets Agent fields
      // -------------------------

      logoConcept: {
        style: {
          type: String,
          default: "",
        },

        description: {
          type: String,
          default: "",
        },

        symbol: {
          type: String,
          default: "",
        },
      },

      designSystem: {
        primaryColor: {
          type: String,
          default: "",
        },

        secondaryColor: {
          type: String,
          default: "",
        },

        accentColor: {
          type: String,
          default: "",
        },

        backgroundColor: {
          type: String,
          default: "",
        },

        textColor: {
          type: String,
          default: "",
        },
      },

      typography: {
        headingFont: {
          type: String,
          default: "",
        },

        bodyFont: {
          type: String,
          default: "",
        },
      },

      icons: {
        style: {
          type: String,
          default: "",
        },
      },

      illustrationStyle: {
        type: String,
        default: "",
      },

      uiStyle: {
        type: String,
        default: "",
      },

      imagePrompts: {
        type: [String],
        default: [],
      },
    },

    // =========================================================
    // NEW AI AGENT: MARKETING
    // =========================================================

    marketing: {
      headline: {
        type: String,
        default: "",
      },

      subheadline: {
        type: String,
        default: "",
      },

      cta: {
        type: String,
        default: "",
      },

      features: {
        type: [String],
        default: [],
      },

      benefits: {
        type: [String],
        default: [],
      },

      seoKeywords: {
        type: [String],
        default: [],
      },

      socialPosts: {
        type: [String],
        default: [],
      },

      email: {
        subject: {
          type: String,
          default: "",
        },

        body: {
          type: String,
          default: "",
        },
      },

      adCopies: {
        type: [String],
        default: [],
      },
    },

    // =========================================================
    // NEW AI AGENT: WEBSITE PLANNER
    // =========================================================

    websitePlanner: {
      websiteType: {
        type: String,
        default: "",
      },

      goal: {
        type: String,
        default: "",
      },

      framework: {
        type: String,
        default: "",
      },

      themeRecommendation: {
        type: String,
        default: "",
      },

      primaryCTA: {
        type: String,
        default: "",
      },

      secondaryCTA: {
        type: String,
        default: "",
      },

      navigation: {
        type: [String],
        default: [],
      },

      pages: {
        type: [String],
        default: [],
      },
    },

    // =========================================================
    // WEBSITE STRUCTURE
    //
    // Supports the new Website Structure Agent while retaining
    // the existing overall field name.
    // =========================================================

    websiteStructure: {
      pages: {
        type: [
          {
            name: {
              type: String,
              default: "",
            },

            path: {
              type: String,
              default: "",
            },

            sections: {
              type: [
                {
                  id: {
                    type: String,
                    default: "",
                  },

                  name: {
                    type: String,
                    default: "",
                  },

                  sectionName: {
                    type: String,
                    default: "",
                  },
                },
              ],
              default: [],
            },
          },
        ],
        default: [],
      },
    },

    // =========================================================
    // NEW AI AGENT: WEBSITE THEME
    // =========================================================

    websiteTheme: {
      colorPalette: {
        type: [String],
        default: [],
      },

      typography: {
        headingFont: {
          type: String,
          default: "",
        },

        bodyFont: {
          type: String,
          default: "",
        },
      },

      spacing: {
        type: String,
        default: "",
      },

      borderRadius: {
        type: String,
        default: "",
      },

      shadows: {
        type: String,
        default: "",
      },

      gradients: {
        type: [String],
        default: [],
      },

      microInteractions: {
        type: [String],
        default: [],
      },

      accessibilityNotes: {
        type: [String],
        default: [],
      },
    },

    // =========================================================
    // NEW AI AGENT: WEBSITE SECTIONS
    // =========================================================

    websiteSections: {
      pages: {
        type: [
          {
            name: {
              type: String,
              default: "",
            },

            path: {
              type: String,
              default: "",
            },

            sections: {
              type: [
                {
                  id: {
                    type: String,
                    default: "",
                  },

                  title: {
                    type: String,
                    default: "",
                  },

                  purpose: {
                    type: String,
                    default: "",
                  },

                  priority: {
                    type: String,
                    default: "",
                  },
                },
              ],
              default: [],
            },
          },
        ],
        default: [],
      },
    },

    // =========================================================
    // NEW AI AGENT: WEBSITE CONTENT
    // =========================================================

    websiteContent: {
      pages: {
        type: [
          {
            name: {
              type: String,
              default: "",
            },

            path: {
              type: String,
              default: "",
            },

            sections: {
              type: [
                {
                  id: {
                    type: String,
                    default: "",
                  },

                  content: {
                    type: mongoose.Schema.Types.Mixed,
                    default: {},
                  },
                },
              ],
              default: [],
            },
          },
        ],
        default: [],
      },
    },

    // =========================================================
    // GENERATED WEBSITE OUTPUT
    // =========================================================

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

    // =========================================================
    // GENERATION METADATA
    // =========================================================

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