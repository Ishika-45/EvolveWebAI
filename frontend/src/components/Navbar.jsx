import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <h1 className="text-2xl font-bold tracking-wide text-purple-400">
          EvolveWeb AI
        </h1>

        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-purple-400 transition">
            Features
          </Link>
          <Link to="/" className="hover:text-purple-400 transition">
            About
          </Link>
          <Link to="/login" className="hover:text-purple-400 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
