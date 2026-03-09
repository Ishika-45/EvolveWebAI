import { useEffect, useState } from "react";

const AIStreamingText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[index]);
      index++;

      if (index >= text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-sm text-indigo-300 leading-relaxed">
      {displayed}
      <span className="animate-pulse ml-1">|</span>
    </p>
  );
};

export default AIStreamingText;