import { createContext, useContext } from "react";
import { getActiveTheme } from "../utils/getActiveTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = getActiveTheme();

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);