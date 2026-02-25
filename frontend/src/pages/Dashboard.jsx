import { useState } from "react";
import ChatSection from "../components/ChatSection";
import PreviewSection from "../components/PreviewSection";

const Dashboard = () => {
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  return (
    <div className="h-screen w-full text-white flex transition-all duration-500
  bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_40%)]"></div>


      {!isGenerated ? (
        // 🟣 Full Screen Chat Mode
        <div className="flex flex-1 items-center justify-center">
          <ChatSection onGenerate={handleGenerate} />
        </div>
      ) : (
        // 🟣 Split View Mode
        <>
          <div className="w-1/2 border-r border-slate-800 flex items-center justify-center">
            <ChatSection onGenerate={handleGenerate} />
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <PreviewSection />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
