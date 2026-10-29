import React from 'react';

export default function LogoTenerifeBeach({ isDark = false, className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Sun & Wave Emblema Vetorial Minimalista */}
      <div className="relative mb-1 flex items-center justify-center">
        <svg
          viewBox="0 0 64 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-6 drop-shadow-sm transition-transform duration-300 hover:scale-110"
          aria-hidden="true"
        >
          {/* Sol Dourado Tropical */}
          <circle cx="32" cy="11" r="7" className={!isDark ? "fill-[#F59E0B]" : "fill-[#FBBF24]"} />
          {/* Onda Atlântica Turquesa */}
          <path
            d="M 6 22 C 14 16, 20 25, 32 20 C 44 15, 50 24, 58 20"
            stroke={!isDark ? "#0D9488" : "#2DD4BF"}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Onda Secundária Coral */}
          <path
            d="M 14 26 C 22 23, 28 27, 36 24 C 44 21, 50 25, 54 24"
            stroke={!isDark ? "#F97316" : "#FB923C"}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Tipografia de Alta Moda */}
      <h1
        className={`font-display font-extrabold tracking-[0.22em] text-2xl sm:text-3xl leading-none uppercase transition-colors ${
          !isDark ? "text-[#0A2540]" : "text-white"
        }`}
      >
        TENERIFE <span className={!isDark ? "text-[#0D9488]" : "text-[#2DD4BF]"}>BEACH</span>
      </h1>

      {/* Subtítulo Editorial */}
      <div className="flex items-center gap-2 mt-1">
        <span className={`h-px w-3.5 transition-colors ${!isDark ? "bg-[#0D9488]/40" : "bg-[#2DD4BF]/40"}`} />
        <span
          className={`font-sans font-bold text-[9px] tracking-[0.3em] uppercase transition-colors ${
            !isDark ? "text-[#0F766E]" : "text-emerald-300/90"
          }`}
        >
          MODA PLAYA BRASILEÑA
        </span>
        <span className={`h-px w-3.5 transition-colors ${!isDark ? "bg-[#0D9488]/40" : "bg-[#2DD4BF]/40"}`} />
      </div>
    </div>
  );
}
