import { Link } from "react-router-dom";

const LandingNavbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-purple-400">
          EvolveWeb AI
        </h1>

        {/* Navigation */}
        <div className="space-x-8 hidden md:flex items-center text-gray-300">

          <Link to="#features" className="hover:text-purple-400 transition">
            Features
          </Link>

          <Link to="#about" className="hover:text-purple-400 transition">
            About
          </Link>

          <Link to="/login" className="hover:text-purple-400 transition">
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default LandingNavbar;