import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <div className="text-white p-10">Authenticating...</div>;
};

export default SocialSuccess;