// components/ThemeSwitcher.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "../themes/ThemeContext";
import { themeOptions } from "../themes/themeConfig";

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme, isThemeMenuOpen, toggleThemeMenu } = useTheme();

  const getThemeIcon = (themeId) => {
    switch(themeId) {
      case "neoIndigo": return <Moon size={14} />;
      case "auroraGlass": return <Sparkles size={14} />;
      case "midnightPro": return <Moon size={14} />;
      case "cyberPurple": return <Sparkles size={14} />;
      case "oceanBreeze": return <Sun size={14} />;
      default: return <Palette size={14} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleThemeMenu}
        className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 relative group"
        title="Change Theme"
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Palette size={18} className="relative z-10 text-gray-400 group-hover:text-purple-400 transition-colors" />
      </button>

      <AnimatePresence>
        {isThemeMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={toggleThemeMenu}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Palette size={14} className="text-purple-400" />
                  Choose Theme
                </h3>
                <p className="text-xs text-gray-500 mt-1">Customize your experience</p>
              </div>

              <div className="p-2 max-h-96 overflow-y-auto">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      changeTheme(theme.id);
                      toggleThemeMenu();
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group
                      ${currentTheme === theme.id 
                        ? "bg-purple-500/20 border border-purple-500/30" 
                        : "hover:bg-white/10"
                      }`}
                  >
                    {/* Theme Preview Circle */}
                    <div className="relative">
                      <div 
                        className="w-8 h-8 rounded-lg bg-gradient-to-br shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`
                        }}
                      />
                      {currentTheme === theme.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
                        {theme.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <span className="text-xs text-gray-500">Accent Color</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500">
                      {getThemeIcon(theme.id)}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 border-t border-white/10 bg-white/5">
                <p className="text-[10px] text-gray-500 text-center">
                  Theme changes are saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;