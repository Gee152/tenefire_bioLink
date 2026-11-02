import React from 'react';

export default function LogoTenerifeBeach({ isDark = false, className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Sun & Wave Emblema Vetorial Minimalista em Verde Musgo & Dourado */}
      <div className="relative mb-1.5 flex items-center justify-center">
        <svg
          viewBox="0 0 64 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110"
          aria-hidden="true"
        >
          {/* Sol Dourado Tropical */}
          <circle cx="32" cy="11" r="7" className={!isDark ? "fill-[#D4AF37]" : "fill-[#FBBF24]"} />
          {/* Onda Atlântica em Verde Musgo Nobre */}
          <path
            d="M 6 22 C 14 16, 20 25, 32 20 C 44 15, 50 24, 58 20"
            stroke={!isDark ? "#234E2A" : "#4ADE80"}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Onda Secundária em Dourado */}
          <path
            d="M 14 26 C 22 23, 28 27, 36 24 C 44 21, 50 25, 54 24"
            stroke={!isDark ? "#D4AF37" : "#FBBF24"}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Tipografia de Alta Moda: TENERIFE em Verde Musgo e BEACH em Dourado com Alto Contraste */}
      <h1
        className={`font-display font-black tracking-[0.22em] text-2xl sm:text-3xl leading-none uppercase transition-all ${
          !isDark
            ? "text-[#1C3B1E] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] [text-shadow:_0_1px_8px_rgba(255,255,255,0.8),_0_2px_4px_rgba(0,0,0,0.15)]"
            : "text-[#86EFAC] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        }`}
      >
        TENERIFE{" "}
        <span
          className={
            !isDark
              ? "text-[#C59B27] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] [text-shadow:_0_1px_8px_rgba(255,255,255,0.8),_0_2px_4px_rgba(0,0,0,0.15)]"
              : "text-[#FBBF24] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          }
        >
          BEACH
        </span>
      </h1>

      {/* Subtítulo Editorial em Preto com Traços Dourados */}
      <div className="flex items-center gap-2 mt-1.5">
        <span className={`h-[1.5px] w-4 transition-colors ${!isDark ? "bg-[#D4AF37]" : "bg-[#FBBF24]/70"}`} />
        <span
          className={`font-sans font-extrabold text-[9.5px] tracking-[0.28em] uppercase transition-colors ${
            !isDark
              ? "text-black [text-shadow:_0_1px_4px_rgba(255,255,255,0.8)]"
              : "text-[#D4AF37]"
          }`}
        >
          MODA PLAYA BRASILEÑA
        </span>
        <span className={`h-[1.5px] w-4 transition-colors ${!isDark ? "bg-[#D4AF37]" : "bg-[#FBBF24]/70"}`} />
      </div>
    </div>
  );
}
