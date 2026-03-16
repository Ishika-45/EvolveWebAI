import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const templates = [
  {
    name: "Startup Landing Page",
    desc: "Perfect for SaaS startups and product launches.",
    tag: "SaaS"
  },
  {
    name: "Portfolio Website",
    desc: "Showcase your work and personal brand.",
    tag: "Personal"
  },
  {
    name: "AI Product Landing",
    desc: "Modern layout for AI tools and platforms.",
    tag: "AI"
  },
  {
    name: "Agency Website",
    desc: "Great for design studios and agencies.",
    tag: "Business"
  }
];

const Templates = () => {
  return (
    <div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles size={20} /> Templates
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Start your project with AI-powered templates.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {templates.map((template, i) => (

          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}

            className="p-6 rounded-2xl border border-white/10
                       bg-white/5 backdrop-blur-xl
                       hover:border-purple-500/30
                       hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]
                       transition"
          >

            <h3 className="text-lg font-medium mb-2">
              {template.name}
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              {template.desc}
            </p>

            <span className="text-xs px-2 py-1 rounded-md
                             bg-purple-500/20 text-purple-300">
              {template.tag}
            </span>

            <button
              className="mt-4 w-full py-2 rounded-lg
                         bg-gradient-to-r from-purple-600 to-indigo-600
                         hover:opacity-90 transition text-sm"
            >
              Use Template
            </button>

          </motion.div>

        ))}

      </div>

    </div>
  );
};

export default Templates;