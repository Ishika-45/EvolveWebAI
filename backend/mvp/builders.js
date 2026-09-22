const { HEX_COLOR } = require("./productBrief");

const DEFAULT_THEME = Object.freeze({
  version: 1,
  name: "default-saas",
  colors: {
    primary: "#4f46e5",
    secondary: "#7c3aed",
    accent: "#22c55e",
    background: "#0b1020",
    surface: "#111827",
    text: "#f8fafc",
    muted: "#94a3b8",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    headingWeight: 700,
    bodyWeight: 400,
  },
  layout: {
    sectionGap: "80px",
    cardRadius: "16px",
    buttonRadius: "12px",
    cardShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
});

function buildWebsiteBlueprint() {
  return {
    version: 1,
    siteType: "landing-page",
    navigation: [
      { label: "Home", href: "#top" },
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
    ],
    pages: [
      {
        id: "home",
        name: "Home",
        path: "/",
        sections: [
          { id: "hero", type: "hero", required: true },
          { id: "benefits", type: "benefit-grid", required: true },
          { id: "features", type: "feature-grid", required: true },
          { id: "how-it-works", type: "steps", required: false },
          { id: "cta", type: "cta", required: true },
          { id: "footer", type: "footer", required: true },
        ],
      },
    ],
  };
}

function buildTheme(productBrief = {}) {
  const theme = JSON.parse(JSON.stringify(DEFAULT_THEME));
  const direction = productBrief.visualDirection || {};

  if (HEX_COLOR.test(direction.primaryColorHint || "")) {
    theme.colors.primary = direction.primaryColorHint;
  }

  if (HEX_COLOR.test(direction.accentColorHint || "")) {
    theme.colors.accent = direction.accentColorHint;
  }

  return theme;
}

module.exports = { DEFAULT_THEME, buildWebsiteBlueprint, buildTheme };
