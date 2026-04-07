// LandingNavbar.jsx - THEME READY VERSION
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ["features", "how-it-works", "pricing", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Features", href: "#features", icon: "✨", section: "features" },
    { name: "How it Works", href: "#how-it-works", icon: "⚡", section: "how-it-works" },
    { name: "Pricing", href: "#pricing", icon: "💰", section: "pricing" },
    { name: "About", href: "#about", icon: "🚀", section: "about" },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-gray-950/95 backdrop-blur-2xl border-b border-[var(--theme-borderColor)] shadow-2xl shadow-[var(--theme-accent)]/10" 
            : "bg-transparent border-b border-white/5"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent" 
             style={{ transform: `scaleX(${isScrolled ? 1 : 0})`, transition: 'transform 0.5s ease' }} />
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link to="/" className="group relative">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute -inset-2 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500"
              style={{
                background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
              }}
            />
            <Link to="/" className="group relative">
  <Logo withText={true} />
</Link>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="relative px-4 py-2 rounded-lg group"
              >
                {activeSection === link.section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-lg border"
                    style={{
                      background: `linear-gradient(135deg, var(--theme-accent)/10, var(--theme-gradient-end)/10)`,
                      borderColor: 'var(--theme-accent)/30'
                    }}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-2 text-gray-300 group-hover:text-[var(--theme-accent)] transition-colors duration-300 font-medium">
                  <span className="text-base opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    {link.icon}
                  </span>
                  {link.name}
                </span>
                
                <motion.span 
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                  }}
                  whileHover={{ width: "80%", x: "-50%", left: "50%" }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            ))}
            
            <div className="mx-2 w-px h-8 bg-gradient-to-b from-transparent via-[var(--theme-accent)]/50 to-transparent" />
            
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2 rounded-lg overflow-hidden group"
              >
                <span className="relative z-10 text-gray-300 group-hover:text-[var(--theme-accent)] transition-colors font-medium">
                  Login
                </span>
                <div className="absolute inset-0 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                     style={{ background: `linear-gradient(135deg, var(--theme-accent)/10, var(--theme-gradient-end)/10)` }} />
              </motion.button>
            </Link>
            
            <Link to="/register">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-2 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="absolute inset-0"
                     style={{
                       background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                     }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{
                       background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                     }} />
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                     style={{
                       background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                     }} />
                
                <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                  Get Started
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </motion.button>
            </Link>
          </div>

          <motion.button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <motion.div 
                className="w-5 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)' }}
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-5 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)' }}
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-5 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)' }}
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-950/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-80 bg-gradient-to-br from-gray-900/95 to-purple-950/95 backdrop-blur-2xl border-l border-[var(--theme-borderColor)] shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>Menu</h2>
                  <p className="text-xs text-gray-400 mt-1">Navigate through sections</p>
                </div>
                
                <div className="flex-1 p-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-purple-500/10 transition-all duration-300 group"
                      whileHover={{ x: 10 }}
                    >
                      <span className="text-2xl">{link.icon}</span>
                      <span className="text-gray-300 group-hover:text-[var(--theme-accent)] transition-colors font-medium">
                        {link.name}
                      </span>
                      <motion.svg 
                        className="w-4 h-4 ml-auto text-gray-500 group-hover:text-[var(--theme-accent)]"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.a>
                  ))}
                </div>
                
                <div className="p-6 border-t border-white/10 space-y-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl border text-[var(--theme-accent)] font-semibold hover:bg-purple-500/10 transition-all duration-300"
                      style={{ borderColor: 'var(--theme-accent)/30' }}
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl text-white font-semibold shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                      }}
                    >
                      Get Started Free
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingNavbar;