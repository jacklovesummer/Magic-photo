
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center group cursor-default select-none">
      <div className="relative mb-4">
        {/* Magic Glow behind the icon */}
        <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
        
        {/* Main Icon Box */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-500 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 border border-white/30 overflow-hidden">
          {/* Internal Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-white drop-shadow-lg">
            <path 
              fill="currentColor" 
              d="M20,80 L20,20 L50,50 L80,20 L80,80 L65,80 L65,45 L50,60 L35,45 L35,80 Z" 
            />
          </svg>
          
          {/* Animated Magic Dots */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-75"></div>
        </div>
      </div>
      
      <div className="text-center relative">
        {/* Brand Name with reliable rendering (no bg-clip-text to avoid white box bugs) */}
        <h1 className="text-4xl md:text-6xl font-comic tracking-tighter leading-none text-white drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]">
          MAGIC <span className="text-indigo-300">MORPH</span>
        </h1>
        
        {/* Subtle decorative line */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-indigo-500 rounded-full"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full rotate-45"></div>
          <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-indigo-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
