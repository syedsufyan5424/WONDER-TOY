import React from 'react';
import { ToyTrainIllustration } from './illustrations/ToyTrainIllustration';
import { ToyBlocksIllustration } from './illustrations/ToyBlocksIllustration';
import { TeddyBearIllustration } from './illustrations/TeddyBearIllustration';

interface WonderToysPromoPanelProps {
  headlineLine1?: string;
  headlineLine2?: string;
  supportingText?: string;
}

export const WonderToysPromoPanel: React.FC<WonderToysPromoPanelProps> = ({
  headlineLine1 = 'WELCOME BACK TO THE',
  headlineLine2 = 'ENCHANTED WORLD OF PLAY!',
  supportingText = 'Start your journey back to the enchanted toys and action, representing all connected to the short, thoughts and moments of play.',
}) => {
  return (
    <div
      className="relative w-full h-full min-h-[580px] lg:min-h-[680px] flex items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #99E5CF 0%, #87DDC4 40%, #76D5BA 80%, #6CD0B3 100%)',
      }}
    >
      {/* ========================================================
          BACKGROUND WATERMARK TOY DOODLES (AROUND EDGES & CORNERS)
          ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-14"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#175A4B" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Baby Rattle (Top center) */}
          <g transform="translate(330, 20) rotate(15)">
            <circle cx="20" cy="20" r="15" />
            <line x1="20" y1="35" x2="20" y2="65" strokeWidth="3" />
            <circle cx="20" cy="70" r="4.5" />
            <circle cx="16" cy="18" r="2.5" fill="#175A4B" />
            <circle cx="24" cy="18" r="2.5" fill="#175A4B" />
          </g>

          {/* Rubber Duck (Top edge, left of center) */}
          <g transform="translate(190, 25) scale(0.7)">
            <path d="M20 35 C15 35 10 38 10 45 C10 52 18 55 30 55 C45 55 52 48 55 42 C58 35 52 35 48 35 C45 35 44 32 44 26 C44 20 38 15 32 15 C26 15 22 20 22 26 C22 28 20 30 18 30 C12 30 12 33 16 35 Z" />
            <circle cx="30" cy="22" r="2" fill="#175A4B" />
          </g>

          {/* Teddy Bear Head (Far Left edge) */}
          <g transform="translate(15, 230) scale(0.7)">
            <circle cx="40" cy="40" r="24" />
            <circle cx="22" cy="22" r="8" />
            <circle cx="58" cy="22" r="8" />
            <circle cx="33" cy="36" r="2.5" fill="#175A4B" />
            <circle cx="47" cy="36" r="2.5" fill="#175A4B" />
            <ellipse cx="40" cy="44" rx="7" ry="5" />
          </g>

          {/* Building Block with A (Far Left edge) */}
          <g transform="translate(18, 360) scale(0.85)">
            <rect x="10" y="10" width="34" height="34" rx="5" />
            <path d="M21 34 L27 19 L33 34 M23 30 L31 30" strokeWidth="2.2" />
          </g>

          {/* Cute Robot (Far Right edge) */}
          <g transform="translate(620, 240) scale(0.8)">
            <rect x="20" y="20" width="32" height="24" rx="4" />
            <line x1="36" y1="20" x2="36" y2="10" />
            <circle cx="36" cy="8" r="3" fill="#175A4B" />
            <circle cx="28" cy="30" r="2.5" fill="#175A4B" />
            <circle cx="44" cy="30" r="2.5" fill="#175A4B" />
            <line x1="28" y1="36" x2="44" y2="36" />
            <rect x="23" y="48" width="26" height="26" rx="4" />
          </g>

          {/* Rocking Horse (Upper Right edge) */}
          <g transform="translate(600, 110) scale(0.75)">
            <path d="M10 60 Q40 70 70 60" strokeWidth="2.8" />
            <path d="M25 55 L35 35 L45 35 L55 55" />
            <path d="M45 35 L55 15 L50 12 L38 25" />
          </g>

          {/* Building Blocks Stack (Far Right edge) */}
          <g transform="translate(620, 420) scale(0.8)">
            <rect x="10" y="38" width="28" height="28" rx="4" />
            <rect x="18" y="10" width="28" height="28" rx="4" />
          </g>

          {/* Toy Train Outline (Bottom Center) */}
          <g transform="translate(200, 580) scale(0.75)">
            <rect x="10" y="25" width="40" height="25" rx="3" />
            <rect x="50" y="10" width="25" height="40" rx="3" />
            <rect x="55" y="16" width="14" height="14" rx="2" />
            <circle cx="22" cy="55" r="7" />
            <circle cx="40" cy="55" r="7" />
            <circle cx="62" cy="55" r="7" />
          </g>

          {/* Teddy Bear Sitting Outline (Bottom Center right) */}
          <g transform="translate(430, 580) scale(0.7)">
            <circle cx="35" cy="25" r="15" />
            <circle cx="23" cy="15" r="5" />
            <circle cx="47" cy="15" r="5" />
            <ellipse cx="35" cy="46" rx="16" ry="14" />
            <circle cx="23" cy="54" r="7" />
            <circle cx="47" cy="54" r="7" />
          </g>

          {/* Perimeter Stars & Sparkles */}
          <path d="M90 140 Q90 148 98 148 Q90 148 90 156 Q90 148 82 148 Q90 148 90 140 Z" fill="#175A4B" />
          <path d="M540 80 Q540 88 548 88 Q540 88 540 96 Q540 88 532 88 Q540 88 540 80 Z" fill="#175A4B" />
          <path d="M580 540 Q580 548 588 548 Q580 548 580 556 Q580 548 572 548 Q580 548 580 540 Z" fill="#175A4B" />
          <circle cx="45" cy="180" r="2.5" fill="#175A4B" />
          <circle cx="650" cy="360" r="2.5" fill="#175A4B" />
        </g>
      </svg>

      {/* ========================================================
          4 FLOATING FROSTED GLASS TOY CARDS (EXACT SCREENSHOT)
          ======================================================== */}

      {/* 1. TOP-LEFT CARD: Toy Train */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-3xl sm:rounded-[36px] bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_12px_28px_rgba(20,95,78,0.12)] p-3 sm:p-5 flex items-center justify-center transition-transform hover:scale-105 duration-300 z-10">
        <ToyTrainIllustration className="w-full h-full object-contain filter drop-shadow-sm" />
      </div>

      {/* 2. TOP-RIGHT CARD: Alphabet Building Blocks (A, B, C) */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-3xl sm:rounded-[36px] bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_12px_28px_rgba(20,95,78,0.12)] p-3 sm:p-5 flex items-center justify-center transition-transform hover:scale-105 duration-300 z-10">
        <ToyBlocksIllustration className="w-full h-full object-contain filter drop-shadow-sm" />
      </div>

      {/* 3. BOTTOM-LEFT CARD: Toy Train */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-3xl sm:rounded-[36px] bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_12px_28px_rgba(20,95,78,0.12)] p-3 sm:p-5 flex items-center justify-center transition-transform hover:scale-105 duration-300 z-10">
        <ToyTrainIllustration className="w-full h-full object-contain filter drop-shadow-sm" />
      </div>

      {/* 4. BOTTOM-RIGHT CARD: Teddy Bear */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-3xl sm:rounded-[36px] bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_12px_28px_rgba(20,95,78,0.12)] p-3 sm:p-5 flex items-center justify-center transition-transform hover:scale-105 duration-300 z-10">
        <TeddyBearIllustration className="w-full h-full object-contain filter drop-shadow-sm" />
      </div>

      {/* ========================================================
          CENTER MAIN HEADLINE & SUPPORTING TEXT (MATCHING SCREENSHOT)
          ======================================================== */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-[480px] lg:max-w-[520px] mx-auto my-auto py-24 sm:py-32">
        <h1 className="font-heading font-black text-lg sm:text-2xl lg:text-[27px] xl:text-[30px] leading-[1.25] text-[#111827] tracking-tight uppercase">
          <span className="block whitespace-normal sm:whitespace-nowrap">{headlineLine1}</span>
          <span className="block whitespace-normal sm:whitespace-nowrap">{headlineLine2}</span>
        </h1>

        <p className="mt-3.5 text-xs sm:text-[13px] text-[#1F2937]/80 leading-relaxed font-medium max-w-[340px] sm:max-w-[380px] mx-auto">
          {supportingText}
        </p>
      </div>
    </div>
  );
};
