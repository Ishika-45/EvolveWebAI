import Lottie from "lottie-react";
import animationData from "../assets/ai-animation.json";

const AiAnimation = () => {
  return (
    <div className="mt-10 w-[320px] lg:w-[380px]">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default AiAnimation;