function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderCards(items = [], numbered = false) {
  return items.map((item, index) => `
    <article class="card">
      ${numbered ? `<span class="step">${index + 1}</span>` : ""}
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </article>`).join("");
}

function renderSection(section, content) {
  if (section.type === "hero") {
    return `<section id="top" class="hero"><div class="container hero-content">
      ${content.eyebrow ? `<p class="eyebrow">${escapeHtml(content.eyebrow)}</p>` : ""}
      <h1>${escapeHtml(content.headline)}</h1>
      <p class="lead">${escapeHtml(content.subheadline)}</p>
      <div class="actions"><a class="button primary" href="#cta">${escapeHtml(content.primaryCta)}</a>${content.secondaryCta ? `<a class="button secondary" href="#features">${escapeHtml(content.secondaryCta)}</a>` : ""}</div>
    </div></section>`;
  }

  if (section.type === "benefit-grid" || section.type === "feature-grid") {
    return `<section id="${escapeHtml(section.id)}" class="section"><div class="container">
      <header class="section-heading"><h2>${escapeHtml(content.heading)}</h2><p>${escapeHtml(content.description)}</p></header>
      <div class="grid">${renderCards(content.items)}</div>
    </div></section>`;
  }

  if (section.type === "steps") {
    return `<section id="${escapeHtml(section.id)}" class="section alternate"><div class="container">
      <header class="section-heading"><h2>${escapeHtml(content.heading)}</h2><p>${escapeHtml(content.description)}</p></header>
      <div class="grid">${renderCards(content.steps, true)}</div>
    </div></section>`;
  }

  if (section.type === "cta") {
    return `<section id="${escapeHtml(section.id)}" class="section"><div class="container"><div class="cta">
      <h2>${escapeHtml(content.heading)}</h2><p>${escapeHtml(content.description)}</p>
      <a class="button primary" href="#top">${escapeHtml(content.primaryCta)}</a>
    </div></div></section>`;
  }

  if (section.type === "footer") {
    return `<footer id="${escapeHtml(section.id)}"><div class="container footer-content"><strong>${escapeHtml(content.productName)}</strong><p>${escapeHtml(content.tagline)}</p></div></footer>`;
  }

  return "";
}

function renderMvpWebsite({ project = {}, productBrief = {}, blueprint = {}, theme = {}, pageContent = {} }) {
  const home = Array.isArray(blueprint.pages) ? blueprint.pages.find((page) => page.id === "home") : null;
  if (!home) throw new Error("MVP renderer requires a Home page blueprint.");

  const colors = theme.colors || {};
  const typography = theme.typography || {};
  const layout = theme.layout || {};
  const sections = pageContent.sections || {};
  const navigation = Array.isArray(blueprint.navigation) ? blueprint.navigation : [];
  const title = productBrief.productName || project.title || "Website";
  const renderedSections = home.sections.map((section) => {
    const content = section.type === "footer"
      ? { ...(sections[section.id] || {}), productName: title }
      : sections[section.id] || {};
    return renderSection(section, content);
  }).join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${escapeHtml(productBrief.oneLineDescription || "")}"><title>${escapeHtml(title)}</title>
<style>:root{--primary:${colors.primary};--secondary:${colors.secondary};--accent:${colors.accent};--background:${colors.background};--surface:${colors.surface};--text:${colors.text};--muted:${colors.muted};--section-gap:${layout.sectionGap};--radius:${layout.cardRadius};--button-radius:${layout.buttonRadius};--shadow:${layout.cardShadow};--heading-font:${typography.headingFont};--body-font:${typography.bodyFont}}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--background);color:var(--text);font-family:var(--body-font),Arial,sans-serif;line-height:1.6}.container{width:min(1120px,calc(100% - 40px));margin:auto}nav{position:sticky;top:0;z-index:1;background:color-mix(in srgb,var(--background) 92%,transparent);border-bottom:1px solid rgba(255,255,255,.1)}.nav-content{min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{font-family:var(--heading-font),Arial,sans-serif;font-weight:${typography.headingWeight};color:var(--text)}.nav-links{display:flex;gap:18px;flex-wrap:wrap}.nav-links a{color:var(--muted);text-decoration:none}.hero{padding:140px 0 110px;text-align:center;background:radial-gradient(circle at top,var(--primary),transparent 58%)}.hero-content{max-width:850px}.eyebrow{color:var(--accent);font-weight:700;text-transform:uppercase;letter-spacing:.08em}.hero h1,h2,h3{font-family:var(--heading-font),Arial,sans-serif;line-height:1.15}.hero h1{font-size:clamp(2.8rem,7vw,5.8rem);margin:0}.lead,.section-heading p,.card p,.cta p,footer p{color:var(--muted)}.lead{font-size:1.18rem;max-width:720px;margin:24px auto}.actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:32px}.button{display:inline-block;padding:12px 20px;border-radius:var(--button-radius);font-weight:700;text-decoration:none}.primary{background:var(--primary);color:#fff}.secondary{border:1px solid rgba(255,255,255,.2);color:var(--text)}.section{padding:var(--section-gap) 0}.alternate{background:rgba(255,255,255,.03)}.section-heading{text-align:center;max-width:700px;margin:0 auto 40px}.section-heading h2,.cta h2{font-size:clamp(2rem,4vw,3.3rem);margin:0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}.card{background:var(--surface);padding:24px;border-radius:var(--radius);box-shadow:var(--shadow)}.card h3{margin:0 0 8px}.card p{margin:0}.step{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--primary);font-weight:700}.cta{padding:48px;text-align:center;border-radius:var(--radius);background:linear-gradient(135deg,var(--primary),var(--secondary))}.cta p{color:#eef2ff;max-width:620px;margin:16px auto 28px}.cta .primary{background:#fff;color:var(--primary)}footer{padding:36px 0;border-top:1px solid rgba(255,255,255,.1)}.footer-content{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap}@media(max-width:640px){.nav-content{padding:14px 0;align-items:flex-start;flex-direction:column}.hero{padding:100px 0 80px}.cta{padding:32px 20px}}</style></head>
<body><nav><div class="container nav-content"><a class="brand" href="#top">${escapeHtml(title)}</a><div class="nav-links">${navigation.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("")}</div></div></nav><main>${renderedSections}</main></body></html>`;
}

module.exports = { escapeHtml, renderMvpWebsite };
