"use client";
import React, { useEffect, useState } from 'react';


const FinalMessage = () => {
  const [visible, setVisible] = useState(false);
  
  // Pre-calculated star positions to avoid hydration mismatch
  const starPositions = [
    { top: 10, left: 15 }, { top: 25, left: 30 }, { top: 40, left: 70 },
    { top: 15, left: 85 }, { top: 55, left: 20 }, { top: 70, left: 40 },
    { top: 85, left: 90 }, { top: 30, left: 55 }, { top: 60, left: 80 },
    { top: 20, left: 45 }, { top: 45, left: 35 }, { top: 75, left: 60 },
    { top: 90, left: 25 }, { top: 35, left: 95 }, { top: 50, left: 10 },
    { top: 80, left: 75 }, { top: 65, left: 50 }, { top: 95, left: 40 },
    { top: 5, left: 65 }, { top: 40, left: 85 }
  ];

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-900 to-black overflow-hidden relative">
      {/* Stars */}
      <div className="absolute inset-0">
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animationDelay: `${(i % 3) * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Message Container */}
      <div className={`
        absolute 
        inset-0 
        flex 
        flex-col 
        items-center 
        justify-center 
        transition-opacity 
        duration-1000
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Animated Hearts */}
        <div className="relative w-64 h-64">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute 
                inset-0 
                flex 
                items-center 
                justify-center 
                text-6xl 
                animate-bounce
              `}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              ❤️
            </div>
          ))}
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold text-white mb-4 animate-pulse">
          I Love You
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-md px-4">
          Until we meet again, stay amazing! ✨
        </p>
      </div>
    </div>
  );
};

export default FinalMessage;