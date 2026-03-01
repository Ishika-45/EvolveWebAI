import { useMemo } from "react";
import Lottie from "lottie-react";
import BrandPulse from "./BrandPulse";

// 🔥 TEMP TEST ANIMATION
import testAnim from "../assets/ai-animation.json"; 
// (use the lottie file you already downloaded for testing)

const BrandMotion = () => {
  const today = new Date();

  // 🔥 Toggle this to true to preview special animation
  const PREVIEW_MODE = true;

  const specialAnimation = useMemo(() => {
    if (PREVIEW_MODE) {
      return testAnim;
    }

    const month = today.getMonth() + 1;
    const date = today.getDate();

    // Example real logic
    if (month === 12 && date === 25) {
      return testAnim; // later replace with christmas.json
    }

    return null;
  }, [today]);

  if (specialAnimation) {
    return (
      <div className="mb-6">
  <div className="w-28 opacity-95 
                  drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
    <Lottie animationData={specialAnimation} loop autoplay />
  </div>
</div>
    );
  }

  return <BrandPulse />;
};

export default BrandMotion;