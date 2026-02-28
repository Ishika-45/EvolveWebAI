const BrandPulse = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative flex items-center justify-center">

        {/* Outer soft glow */}
        <span className="absolute w-24 h-24 rounded-full 
                         bg-purple-500 opacity-20 
                         blur-2xl animate-pulse"></span>

        {/* Middle subtle ring */}
        <span className="absolute w-16 h-16 rounded-full 
                         border border-purple-400 opacity-40"></span>

        {/* Core energy dot */}
        <span className="w-10 h-10 rounded-full 
                         bg-gradient-to-r 
                         from-purple-400 to-indigo-500 
                         shadow-[0_0_35px_rgba(139,92,246,0.8)]">
        </span>

      </div>
    </div>
  );
};

export default BrandPulse;