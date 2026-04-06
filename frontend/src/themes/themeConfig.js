export const themes = {
  neoIndigo: {
    name: "Neo Indigo",
    bgPrimary: "#0f172a",
    bgSecondary: "#1e293b",
    accent: "#6366f1",
    accentHover: "#818cf8",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
    cardBg: "rgba(30, 41, 59, 0.8)",
    borderColor: "rgba(99, 102, 241, 0.3)",
    glow: "rgba(99, 102, 241, 0.6)",
    gradientStart: "#4f46e5",
    gradientEnd: "#6366f1",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b"
  },

  midnightPro: {
    name: "Midnight Pro",
    bgPrimary: "#000000",
    bgSecondary: "#111111",
    accent: "#ffffff",
    accentHover: "#cccccc",
    textPrimary: "#ffffff",
    textSecondary: "#aaaaaa",
    cardBg: "rgba(17, 17, 17, 0.8)",
    borderColor: "#222222",
    glow: "rgba(255,255,255,0.2)",
    gradientStart: "#333333",
    gradientEnd: "#666666",
    success: "#4ade80",
    error: "#f87171",
    warning: "#fbbf24"
  },

  cyberPurple: {
    name: "Cyber Purple",
    bgPrimary: "#0a0a2a",
    bgSecondary: "#1a1a4a",
    accent: "#c084fc",
    accentHover: "#d8b4fe",
    textPrimary: "#f0f0ff",
    textSecondary: "#a0a0c0",
    cardBg: "rgba(26, 26, 74, 0.8)",
    borderColor: "rgba(192, 132, 252, 0.3)",
    glow: "rgba(192, 132, 252, 0.6)",
    gradientStart: "#8b5cf6",
    gradientEnd: "#c084fc",
    success: "#34d399",
    error: "#f472b6",
    warning: "#fbbf24"
  },

  oceanBreeze: {
    name: "Ocean Breeze",
    bgPrimary: "#0f172a",
    bgSecondary: "#1e3a8a",
    accent: "#38bdf8",
    accentHover: "#7dd3fc",
    textPrimary: "#ffffff",
    textSecondary: "#bae6fd",
    cardBg: "rgba(30, 58, 138, 0.8)",
    borderColor: "rgba(56, 189, 248, 0.3)",
    glow: "rgba(56, 189, 248, 0.6)",
    gradientStart: "#0284c7",
    gradientEnd: "#38bdf8",
    success: "#4ade80",
    error: "#f87171",
    warning: "#fbbf24"
  }
};

export const themeCategories = {
  Dark: ["neoIndigo", "midnightPro", "cyberPurple", "electricBlue", "neonPink", "sunsetOrange", "oceanBreeze"]
};

export const getTheme = (themeName) => {
  return themes[themeName] || themes.neoIndigo;
};

export const themeOptions = Object.entries(themes).map(([key, value]) => ({
  id: key,
  name: value.name,
  previewColor: value.accent,
  gradientStart: value.gradientStart,
  gradientEnd: value.gradientEnd
}));