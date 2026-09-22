// src/pages/SocialSuccess.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const SocialSuccess = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");

    if (errorParam) {
      setError(`Authentication failed: ${errorParam}`);
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const completeSocialLogin = async () => {
      try {
        const response = await api.get("/auth/social-session");
        const { token, user } = response.data || {};

        if (!token || !user) {
          throw new Error("Missing authentication data");
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Social login completion failed:", err?.message || "unknown error");
        setError("Failed to complete authentication");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    completeSocialLogin();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
          <div className="text-gray-400">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-xl">Authenticating...</div>
        <div className="text-gray-400 mt-2">Please wait while we log you in</div>
      </div>
    </div>
  );
};

export default SocialSuccess;
