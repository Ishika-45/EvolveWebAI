const ChatSection = ({ onGenerate }) => {
  return (
    <div className="w-full max-w-2xl p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        What are we building today?
      </h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Describe your website idea..."
          className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
        />
        <button
          onClick={onGenerate}
          className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
