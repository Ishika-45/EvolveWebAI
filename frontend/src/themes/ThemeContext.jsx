// src/themes/ThemeContext.jsx
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { themes } from "./themeConfig";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("evolveweb-theme");
    return savedTheme && themes[savedTheme] ? savedTheme : "neoIndigo";
  });
  
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const applyTheme = useCallback((themeName) => {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(theme).forEach(([key, value]) => {
      if (key !== "name") {
        root.style.setProperty(`--theme-${key}`, value);
      }
    });

    // Add a data attribute to the root for Tailwind theme targeting
    root.setAttribute('data-theme', themeName);

    // Apply background
    if (theme.bgPrimary.includes('linear-gradient')) {
      root.style.background = theme.bgPrimary;
    } else {
      root.style.backgroundColor = theme.bgPrimary;
    }

    localStorage.setItem("evolveweb-theme", themeName);
  }, []);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme, applyTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    } else {
    }
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen(prev => !prev);
  };

  const value = {
    currentTheme,
    currentThemeData: themes[currentTheme],
    setTheme: changeTheme,
    changeTheme,
    toggleThemeMenu,
    isThemeMenuOpen,
    availableThemes: Object.keys(themes),
    themeOptions: Object.entries(themes).map(([key, value]) => ({
      id: key,
      name: value.name,
      accent: value.accent,
      gradientStart: value.gradientStart,
      gradientEnd: value.gradientEnd
    }))
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};