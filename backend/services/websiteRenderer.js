/**
 * Deterministic Website Renderer
 *
 * Converts structured AI output into a complete HTML website.
 *
 * IMPORTANT:
 * - No AI calls
 * - No external API calls
 * - No LLM dependency
 * - Same input => same HTML
 */

function escapeHtml(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
}

function formatLabel(value) {
  if (!value) return "";

  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return `<p class="content-text">${escapeHtml(value)}</p>`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "";

    return `
      <div class="content-list">
        ${value.map((item) => {
          if (
            typeof item === "string" ||
            typeof item === "number" ||
            typeof item === "boolean"
          ) {
            return `<div class="content-list-item">${escapeHtml(item)}</div>`;
          }

          if (item && typeof item === "object") {
            return `
              <div class="content-card">
                ${renderObject(item)}
              </div>
            `;
          }

          return "";
        }).join("")}
      </div>
    `;
  }

  if (typeof value === "object") {
    return renderObject(value);
  }

  return "";
}

function renderObject(object) {
  if (!object || typeof object !== "object") {
    return "";
  }

  return Object.entries(object)
    .map(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === ""
      ) {
        return "";
      }

      const label = formatLabel(key);

      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return `
          <div class="content-field">
            <h4>${escapeHtml(label)}</h4>
            <p>${escapeHtml(value)}</p>
          </div>
        `;
      }

      return `
        <div class="content-field">
          <h4>${escapeHtml(label)}</h4>
          ${renderValue(value)}
        </div>
      `;
    })
    .join("");
}

function getThemeColors(theme = {}) {
  const palette = theme.colorPalette || {};

  return {
    primary: palette.primary || "#6366f1",
    secondary: palette.secondary || "#8b5cf6",
    accent: palette.accent || "#22c55e",
    background: palette.background || "#0b1020",
    surface: palette.surface || "#111827",
    text: palette.text || "#f8fafc",
    muted: palette.muted || "#94a3b8",
    success: palette.success || "#22c55e",
    warning: palette.warning || "#f59e0b",
    danger: palette.danger || "#ef4444",
  };
}

function getTypography(theme = {}) {
  const typography = theme.typography || {};

  return {
    heading:
      typography.headingFont ||
      typography.displayFont ||
      "Inter",

    body:
      typography.bodyFont ||
      "Inter",

    headingWeight:
      typography.headingWeight ||
      "700",

    bodyWeight:
      typography.bodyWeight ||
      "400",
  };
}

function renderNavigation(website = {}, branding = {}) {
  const navigation = Array.isArray(website.navigation)
    ? website.navigation
    : [];

  const brandName =
    branding.brandName ||
    website.brandName ||
    "EvolveWeb";

  if (navigation.length === 0) {
    return `
      <a href="/" class="nav-link">Home</a>
    `;
  }

  return navigation
    .map((item) => {
      const label = normalizeText(item);

      if (!label) return "";

      const path =
        label.toLowerCase() === "home"
          ? "/"
          : `#${label
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")}`;

      return `
        <a href="${escapeHtml(path)}" class="nav-link">
          ${escapeHtml(label)}
        </a>
      `;
    })
    .join("");
}

function renderHeroContent(content = {}, branding = {}, marketing = {}) {
  const headline =
    content.headline ||
    marketing.headline ||
    branding.tagline ||
    "Build something people love.";

  const subheadline =
    content.subheadline ||
    marketing.subheadline ||
    branding.mission ||
    "";

  const primaryCTA =
    content.primaryCTA ||
    content.primaryCta ||
    content.cta ||
    marketing.cta ||
    branding.primaryCTA ||
    "Get Started";

  const secondaryCTA =
    content.secondaryCTA ||
    content.secondaryCta ||
    branding.secondaryCTA ||
    "";

  const eyebrow =
    content.eyebrow ||
    branding.brandName ||
    "";

  return `
    <div class="hero-content">

      ${
        eyebrow
          ? `
            <div class="hero-eyebrow">
              ${escapeHtml(eyebrow)}
            </div>
          `
          : ""
      }

      <h1>
        ${escapeHtml(headline)}
      </h1>

      ${
        subheadline
          ? `
            <p class="hero-description">
              ${escapeHtml(subheadline)}
            </p>
          `
          : ""
      }

      <div class="hero-actions">

        ${
          primaryCTA
            ? `
              <a href="#cta" class="button button-primary">
                ${escapeHtml(primaryCTA)}
              </a>
            `
            : ""
        }

        ${
          secondaryCTA
            ? `
              <a href="#features" class="button button-secondary">
                ${escapeHtml(secondaryCTA)}
              </a>
            `
            : ""
        }

      </div>

    </div>
  `;
}

function renderSection(section, branding, marketing) {
  const id = section.id || "section";
  const title = section.title || formatLabel(id);
  const content = section.content || {};

  const normalizedId = String(id)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");

  if (normalizedId === "hero") {
    return `
      <section
        id="${escapeHtml(normalizedId)}"
        class="section hero-section"
      >
        ${renderHeroContent(content, branding, marketing)}
      </section>
    `;
  }

  return `
    <section
      id="${escapeHtml(normalizedId)}"
      class="section"
    >

      <div class="section-inner">

        <div class="section-heading">

          <h2>
            ${escapeHtml(title)}
          </h2>

          ${
            content.description
              ? `
                <p class="section-description">
                  ${escapeHtml(content.description)}
                </p>
              `
              : ""
          }

        </div>

        <div class="section-content">
          ${renderValue(content)}
        </div>

      </div>

    </section>
  `;
}

function renderPage({
  page,
  contentPage,
  branding,
  marketing,
}) {
  const contentSections = new Map(
    (contentPage?.sections || []).map((section) => [
      section.id,
      section,
    ])
  );

  const sections = Array.isArray(page.sections)
    ? page.sections
    : [];

  return sections
    .map((section) => {
      const contentSection = contentSections.get(section.id);

      return renderSection(
        {
          ...section,
          content: contentSection?.content || {},
        },
        branding,
        marketing
      );
    })
    .join("");
}

function renderFooter(branding = {}) {
  const brandName =
    branding.brandName || "EvolveWeb";

  const tagline =
    branding.tagline || "";

  return `
    <footer class="footer">

      <div class="footer-inner">

        <div>
          <strong>
            ${escapeHtml(brandName)}
          </strong>

          ${
            tagline
              ? `
                <p>
                  ${escapeHtml(tagline)}
                </p>
              `
              : ""
          }
        </div>

        <div class="footer-copy">
          © ${new Date().getFullYear()}
          ${escapeHtml(brandName)}.
          All rights reserved.
        </div>

      </div>

    </footer>
  `;
}

function renderStyles(theme = {}) {
  const colors = getThemeColors(theme);
  const typography = getTypography(theme);

  const radius =
    theme.borderRadius?.medium || "12px";

  const cardRadius =
    theme.borderRadius?.large || radius;

  const cardShadow =
    theme.shadows?.card ||
    "0 10px 30px rgba(0,0,0,0.15)";

  const sectionGap =
    theme.spacing?.sectionGap || "80px";

  return `
    :root {

      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};

      --background: ${colors.background};
      --surface: ${colors.surface};

      --text: ${colors.text};
      --muted: ${colors.muted};

      --success: ${colors.success};
      --warning: ${colors.warning};
      --danger: ${colors.danger};

      --radius: ${radius};
      --card-radius: ${cardRadius};

      --card-shadow: ${cardShadow};

      --section-gap: ${sectionGap};

      --heading-font: ${typography.heading};
      --body-font: ${typography.body};

      --heading-weight: ${typography.headingWeight};
      --body-weight: ${typography.bodyWeight};
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: var(--background);
      color: var(--text);
      font-family: var(--body-font), system-ui, sans-serif;
      font-weight: var(--body-weight);
      line-height: 1.6;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .container {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(14px);
      background: color-mix(
        in srgb,
        var(--background) 88%,
        transparent
      );
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .nav-inner {
      width: min(1180px, calc(100% - 40px));
      min-height: 72px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
    }

    .brand {
      font-family: var(--heading-font), system-ui, sans-serif;
      font-weight: var(--heading-weight);
      font-size: 1.15rem;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .nav-link {
      color: var(--muted);
      transition: color 180ms ease;
    }

    .nav-link:hover {
      color: var(--text);
    }

    .section {
      padding: var(--section-gap) 0;
    }

    .section-inner {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .hero-section {
      min-height: 680px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background:
        radial-gradient(
          circle at 20% 20%,
          color-mix(in srgb, var(--primary) 25%, transparent),
          transparent 35%
        ),
        radial-gradient(
          circle at 80% 30%,
          color-mix(in srgb, var(--secondary) 20%, transparent),
          transparent 35%
        );
    }

    .hero-content {
      width: min(900px, calc(100% - 40px));
      margin: 0 auto;
    }

    .hero-eyebrow {
      display: inline-flex;
      padding: 6px 12px;
      border-radius: 999px;
      background: color-mix(
        in srgb,
        var(--primary) 15%,
        transparent
      );
      color: var(--primary);
      font-size: 0.9rem;
      margin-bottom: 20px;
    }

    h1,
    h2,
    h3,
    h4 {
      font-family: var(--heading-font), system-ui, sans-serif;
      font-weight: var(--heading-weight);
      line-height: 1.15;
    }

    h1 {
      margin: 0;
      font-size: clamp(3rem, 7vw, 5.8rem);
      letter-spacing: -0.05em;
    }

    h2 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3.4rem);
      letter-spacing: -0.035em;
    }

    .hero-description,
    .section-description {
      max-width: 720px;
      margin: 24px auto 0;
      color: var(--muted);
      font-size: 1.15rem;
    }

    .hero-actions {
      margin-top: 34px;
      display: flex;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 22px;
      border-radius: var(--radius);
      font-weight: 600;
      transition:
        transform 180ms ease,
        opacity 180ms ease;
    }

    .button:hover {
      transform: translateY(-2px);
      opacity: 0.92;
    }

    .button-primary {
      background: var(--primary);
      color: #fff;
    }

    .button-secondary {
      border: 1px solid rgba(255,255,255,0.14);
      background: var(--surface);
    }

    .section-heading {
      text-align: center;
      margin-bottom: 44px;
    }

    .section-content {
      display: grid;
      gap: 20px;
    }

    .content-list {
      display: grid;
      grid-template-columns:
        repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .content-list-item,
    .content-card {
      padding: 24px;
      background: var(--surface);
      border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      border: 1px solid rgba(255,255,255,0.07);
    }

    .content-field {
      padding: 10px 0;
    }

    .content-field h4 {
      margin: 0 0 6px;
      font-size: 1rem;
    }

    .content-field p,
    .content-text {
      margin: 0;
      color: var(--muted);
    }

    .footer {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 40px 0;
    }

    .footer-inner {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      gap: 30px;
      flex-wrap: wrap;
    }

    .footer p {
      margin: 6px 0 0;
      color: var(--muted);
    }

    .footer-copy {
      color: var(--muted);
    }

    @media (max-width: 768px) {

      .nav-inner {
        min-height: 64px;
      }

      .nav-links {
        gap: 12px;
        font-size: 0.9rem;
      }

      .hero-section {
        min-height: 580px;
      }

      .section {
        padding: 60px 0;
      }

      .footer-inner {
        flex-direction: column;
      }
    }
  `;
}

function renderWebsite({
  project,
  website,
  websiteTheme,
  websiteSections,
  websiteContent,
  branding,
  marketing,
}) {
  const safeProject = project || {};
  const safeWebsite = website || {};
  const safeTheme = websiteTheme || {};
  const safeSections = websiteSections || {};
  const safeContent = websiteContent || {};
  const safeBranding = branding || {};
  const safeMarketing = marketing || {};

  const structure =
    safeWebsite.structure || {};

  const pages = Array.isArray(structure.pages)
    ? structure.pages
    : [];

  const contentPages =
    Array.isArray(safeContent.pages)
      ? safeContent.pages
      : [];

  const firstPage =
    pages.find(
      (page) =>
        page.path === "/" ||
        String(page.name).toLowerCase() === "home"
    ) || pages[0];

  const firstContentPage =
    contentPages.find(
      (page) =>
        page.name === firstPage?.name
    );

  const brandName =
    safeBranding.brandName ||
    safeProject.title ||
    "EvolveWeb";

  const title =
    safeProject.title ||
    brandName;

  const tagline =
    safeBranding.tagline ||
    "";

  const renderedPages = pages.length
    ? pages
        .map((page) => {
          const contentPage =
            contentPages.find(
              (item) =>
                item.name === page.name
            );

          return renderPage({
            page,
            contentPage,
            branding: safeBranding,
            marketing: safeMarketing,
          });
        })
        .join("")
    : `
      <main class="section">
        <div class="section-inner">
          <h1>${escapeHtml(title)}</h1>
          <p>No website structure is available yet.</p>
        </div>
      </main>
    `;

  const navigation =
    renderNavigation(
      safeWebsite,
      safeBranding
    );

  return `<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta
    name="description"
    content="${escapeHtml(tagline)}"
  />

  <title>
    ${escapeHtml(title)}
  </title>

  <style>
    ${renderStyles(safeTheme)}
  </style>

</head>

<body>

  <header class="navbar">

    <div class="nav-inner">

      <a href="/" class="brand">
        ${escapeHtml(brandName)}
      </a>

      <nav class="nav-links">
        ${navigation}
      </nav>

    </div>

  </header>

  <main>
    ${renderedPages}
  </main>

  ${renderFooter(safeBranding)}

</body>

</html>`;
}

module.exports = {
  renderWebsite,
};