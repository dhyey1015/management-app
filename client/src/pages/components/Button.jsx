import { useState } from "react";

export function Button({text, onclick}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className="w-[450px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 relative overflow-hidden"
      onClick={onclick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 animate-pulse" />
      )}
    </button>
  );
}