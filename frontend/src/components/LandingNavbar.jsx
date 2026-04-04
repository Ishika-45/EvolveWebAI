import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Features", href: "#features", icon: "✨" },
    { name: "How it Works", href: "#how-it-works", icon: "⚡" },
    { name: "Pricing", href: "#pricing", icon: "💰" },
    { name: "About", href: "#about", icon: "🚀" },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-gray-950/90 backdrop-blur-2xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10" 
          : "bg-black/30 backdrop-blur-md border-b border-white/10"
      }`}>
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo with animation */}
          <Link to="/" className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500" />
            <h1 className="relative text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              EvolveWeb AI
              <span className="absolute -top-1 -right-6 text-xs bg-purple-500/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-purple-300 font-normal text-[10px]">
                Beta
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="group relative text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium"
              >
                <span className="flex items-center gap-1">
                  <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {link.icon}
                  </span>
                  {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Divider */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
            
            {/* Auth Buttons */}
            <Link
              to="/login"
              className="relative px-5 py-2 text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            
            <Link
              to="/register"
              className="group relative px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          >
            <div className={`w-6 h-0.5 bg-purple-400 transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-purple-400 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-purple-400 transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`} />
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-gray-950/90 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-20 left-0 right-0 mx-4 bg-gradient-to-br from-gray-900/95 to-purple-950/95 backdrop-blur-2xl rounded-2xl border border-purple-500/20 shadow-2xl transition-all duration-500 transform ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          <div className="p-6 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-300 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
                <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
            
            <div className="border-t border-purple-500/20 my-4" />
            
            <Link
              to="/login"
              className="flex items-center justify-center px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-300 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            
            <Link
              to="/register"
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Gradient Border Bottom */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent z-50 animate-pulse" 
           style={{ top: 'auto', bottom: 0 }} />
    </>
  );
};

export default LandingNavbar;