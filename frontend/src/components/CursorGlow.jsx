import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition duration-200"
      style={{
        background: `radial-gradient(
          300px at ${position.x}px ${position.y}px,
          rgba(139,92,246,0.18),
          transparent 75%
        )`
      }}
    />
  );
};

export default CursorGlow;