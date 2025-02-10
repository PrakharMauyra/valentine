"use client";
import React from 'react';

const ImageFrame = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      {/* Frame Container */}
      <div className="relative max-w-md w-full aspect-square">
        {/* Decorative Frame */}
        <div className="absolute inset-0 border-8 border-white rounded-2xl shadow-lg" />
        
        {/* Inner Border */}
        <div className="absolute inset-4 border border-gray-200 rounded-xl" />
        
        {/* Image Container */}
        <div className="absolute inset-4 rounded-xl overflow-hidden">
          <img
            src="/api/placeholder/400/400"
            alt="Special Someone"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Corner Decorations */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-rose-300 rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-rose-300 rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-rose-300 rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-rose-300 rounded-br-lg" />
      </div>
    </div>
  );
};

export default ImageFrame;