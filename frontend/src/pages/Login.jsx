import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Welcome back to EvolveWeb AI ✨");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-card"
      >
        <h1 className="text-center text-3xl font-bold 
                       bg-gradient-to-r from-purple-400 to-indigo-400 
                       text-transparent bg-clip-text mb-2">
          EvolveWeb AI
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Build websites with AI in seconds
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-3 rounded-lg
                         bg-white/5 border border-white/10
                         focus:outline-none focus:border-purple-500
                         text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-2 px-4 py-3 rounded-lg
                         bg-white/5 border border-white/10
                         focus:outline-none focus:border-purple-500
                         text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg
                       bg-gradient-to-r from-purple-500 to-indigo-500
                       font-semibold text-white
                       hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
