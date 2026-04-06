// components/ThemeAwareButton.jsx
import { useTheme } from "../themes/ThemeContext";

const ThemeAwareButton = ({ children, onClick, className = "" }) => {
  const { currentThemeData } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300
        bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]
        text-white hover:shadow-lg ${className}`}
      style={{
        boxShadow: `0 0 20px ${currentThemeData.glow}`
      }}
    >
      {children}
    </button>
  );
};

export default ThemeAwareButton;