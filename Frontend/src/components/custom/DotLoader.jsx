import React from "react";
import useThemeStore from "../../store/useThemeStore";

const DotLoader = () => {
  // Dots with different animation delays
  const dots = [0.3, 0.2, 0.1];

  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen flex justify-center items-center space-x-3 relative overflow-hidden"
      data-theme={theme}
    >
      {dots.map((delay, index) => (
        <span
          key={index}
          className="w-5 h-5 rounded-full shadow-lg bg-gradient-to-tr from-primary to-secondary animate-load"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
};

export default DotLoader;
