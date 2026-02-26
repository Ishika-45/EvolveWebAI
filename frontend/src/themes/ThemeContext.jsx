import { createContext, useState, useEffect } from "react";
import { themes } from "./themeConfig";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("neoIndigo");

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    Object.keys(theme).forEach((key) => {
      if (key !== "name") {
        root.style.setProperty(`--${key}`, theme[key]);
      }
    });
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
