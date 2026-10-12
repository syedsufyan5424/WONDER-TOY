import React from 'react';

export const ToyTrainIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft drop shadow */}
        <filter id="trainShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F3D33" floodOpacity="0.12" />
        </filter>
        {/* Gradients for rich 2D vector look */}
        <linearGradient id="boilerGrad" x1="50" y1="75" x2="125" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="cabGrad" x1="120" y1="50" x2="175" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="110" y1="42" x2="185" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="wheelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>

      <g filter="url(#trainShadow)">
        {/* Chimney / Smokestack */}
        <path
          d="M62 82 L58 56 C58 52 64 50 72 50 C80 50 86 52 86 56 L82 82 Z"
          fill="#FBBF24"
          stroke="#262626"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <ellipse cx="72" cy="53" rx="14" ry="5" fill="#EF4444" stroke="#262626" strokeWidth="3" />
        <ellipse cx="72" cy="52" rx="9" ry="2.5" fill="#FDE047" />

        {/* Steam Dome */}
        <path
          d="M96 82 C96 74 104 70 110 70 C116 70 124 74 124 82 Z"
          fill="#FBBF24"
          stroke="#262626"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Cabin */}
        <rect
          x="122"
          y="58"
          width="54"
          height="72"
          rx="4"
          fill="url(#cabGrad)"
          stroke="#262626"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Cabin Window */}
        <rect
          x="134"
          y="72"
          width="30"
          height="28"
          rx="6"
          fill="#E0F2FE"
          stroke="#262626"
          strokeWidth="3"
        />
        {/* Window Inner Glare */}
        <path d="M138 76 L158 76 L144 96 L138 96 Z" fill="white" opacity="0.6" />

        {/* Curved Cabin Roof */}
        <path
          d="M116 58 C116 52 135 44 149 44 C163 44 182 52 182 58 Z"
          fill="url(#roofGrad)"
          stroke="#262626"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Locomotive Boiler (Horizontal Cylinder) */}
        <rect
          x="44"
          y="82"
          width="82"
          height="48"
          rx="6"
          fill="url(#boilerGrad)"
          stroke="#262626"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Front Boiler Cap / Nose */}
        <path
          d="M48 82 C38 82 32 92 32 106 C32 120 38 130 48 130 Z"
          fill="#0284C7"
          stroke="#262626"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Headlight Lamp */}
        <rect
          x="20"
          y="98"
          width="14"
          height="16"
          rx="3"
          fill="#F59E0B"
          stroke="#262626"
          strokeWidth="3"
        />
        <path d="M20 100 L20 112" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />

        {/* Yellow Chassis Base */}
        <rect
          x="26"
          y="130"
          width="154"
          height="14"
          rx="4"
          fill="#EAB308"
          stroke="#262626"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Front Red Bumper */}
        <rect
          x="18"
          y="126"
          width="12"
          height="20"
          rx="2"
          fill="#DC2626"
          stroke="#262626"
          strokeWidth="3"
        />
        <circle cx="24" cy="132" r="2" fill="#FDE047" />
        <circle cx="24" cy="140" r="2" fill="#FDE047" />

        {/* Rear Coupler */}
        <rect x="178" y="134" width="8" height="6" rx="2" fill="#404040" />

        {/* Wheel 1 (Front Left) */}
        <g>
          <circle cx="56" cy="154" r="19" fill="url(#wheelGrad)" stroke="#262626" strokeWidth="3.5" />
          <circle cx="56" cy="154" r="11" fill="#7F1D1D" stroke="#262626" strokeWidth="2.5" />
          <circle cx="56" cy="154" r="5" fill="#475569" stroke="#262626" strokeWidth="2" />
        </g>

        {/* Wheel 2 (Middle) */}
        <g>
          <circle cx="102" cy="154" r="19" fill="url(#wheelGrad)" stroke="#262626" strokeWidth="3.5" />
          <circle cx="102" cy="154" r="11" fill="#7F1D1D" stroke="#262626" strokeWidth="2.5" />
          <circle cx="102" cy="154" r="5" fill="#475569" stroke="#262626" strokeWidth="2" />
        </g>

        {/* Wheel 3 (Rear) */}
        <g>
          <circle cx="150" cy="154" r="19" fill="url(#wheelGrad)" stroke="#262626" strokeWidth="3.5" />
          <circle cx="150" cy="154" r="11" fill="#7F1D1D" stroke="#262626" strokeWidth="2.5" />
          <circle cx="150" cy="154" r="5" fill="#475569" stroke="#262626" strokeWidth="2" />
        </g>

        {/* Wheel Connecting Side Rod */}
        <rect
          x="54"
          y="151"
          width="98"
          height="6"
          rx="3"
          fill="#64748B"
          stroke="#262626"
          strokeWidth="2.5"
        />
        <circle cx="56" cy="154" r="3" fill="#E2E8F0" />
        <circle cx="102" cy="154" r="3" fill="#E2E8F0" />
        <circle cx="150" cy="154" r="3" fill="#E2E8F0" />
      </g>
    </svg>
  );
};
