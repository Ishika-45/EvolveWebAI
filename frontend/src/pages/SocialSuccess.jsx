// src/pages/SocialSuccess.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SocialSuccess = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userParam = params.get("user");
    const errorParam = params.get("error");
    
    console.log("SocialSuccess - Full URL:", window.location.href);
    console.log("SocialSuccess - Token from URL:", token ? "Yes" : "No");
    console.log("SocialSuccess - User param from URL:", userParam ? "Yes" : "No");
    
    if (errorParam) {
      setError(`Authentication failed: ${errorParam}`);
      setTimeout(() => navigate("/login"), 3000);
      return;
    }
    
    if (token && userParam) {
      try {
        // Parse user data
        const userData = JSON.parse(decodeURIComponent(userParam));
        console.log("SocialSuccess - User data:", userData);
        
        // Save both token and user data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("SocialSuccess - Token and user saved to localStorage");
        
        // Verify data was saved
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        console.log("SocialSuccess - Verified token:", savedToken ? "Yes" : "No");
        console.log("SocialSuccess - Verified user:", savedUser ? "Yes" : "No");
        
        // Small delay to ensure storage is complete
        setTimeout(() => {
          console.log("SocialSuccess - Redirecting to dashboard");
          navigate("/dashboard", { replace: true });
        }, 500);
      } catch (err) {
        console.error("SocialSuccess - Error saving data:", err);
        setError("Failed to save authentication data");
        setTimeout(() => navigate("/login"), 3000);
      }
    } else {
      console.error("SocialSuccess - Missing token or user data");
      setError("Missing authentication data");
      setTimeout(() => navigate("/login"), 3000);
    }
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