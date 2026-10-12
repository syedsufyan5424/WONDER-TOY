import React from 'react';

export const ToyBlocksIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="blockShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0F3D33" floodOpacity="0.14" />
        </filter>
      </defs>

      <g filter="url(#blockShadow)">
        {/* =========================================================
            TOP BLOCK: GREEN CUBE WITH "A"
            ========================================================= */}
        <g id="block-A">
          {/* Top Face */}
          <path
            d="M100 28 L136 44 L100 60 L64 44 Z"
            fill="#34D399"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <path
            d="M136 44 L136 90 L100 106 L100 60 Z"
            fill="#059669"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Front / Left Face */}
          <path
            d="M64 44 L100 60 L100 106 L64 90 Z"
            fill="#10B981"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Recessed Border on Front Face */}
          <path
            d="M71 50 L93 60 L93 98 L71 88 Z"
            stroke="#047857"
            strokeWidth="2.5"
            strokeDasharray="none"
            fill="#059669"
            fillOpacity="0.25"
          />
          {/* Letter 'A' on Front Face */}
          <g transform="translate(82, 75) skewY(23) scale(1.1, 1)">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              stroke="#064E3B"
              strokeWidth="1.5"
              fontFamily="Outfit, sans-serif"
              fontWeight="900"
              fontSize="24"
            >
              A
            </text>
          </g>
        </g>

        {/* =========================================================
            BOTTOM LEFT BLOCK: ORANGE/AMBER CUBE WITH "B"
            ========================================================= */}
        <g id="block-B">
          {/* Top Face */}
          <path
            d="M65 92 L101 108 L65 124 L29 108 Z"
            fill="#FBBF24"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <path
            d="M101 108 L101 154 L65 170 L65 124 Z"
            fill="#D97706"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Front / Left Face */}
          <path
            d="M29 108 L65 124 L65 170 L29 154 Z"
            fill="#F59E0B"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Recessed Border on Front Face */}
          <path
            d="M36 114 L58 124 L58 162 L36 152 Z"
            stroke="#B45309"
            strokeWidth="2.5"
            fill="#B45309"
            fillOpacity="0.2"
          />
          {/* Letter 'B' on Front Face */}
          <g transform="translate(47, 139) skewY(23) scale(1.1, 1)">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              stroke="#78350F"
              strokeWidth="1.5"
              fontFamily="Outfit, sans-serif"
              fontWeight="900"
              fontSize="24"
            >
              B
            </text>
          </g>
        </g>

        {/* =========================================================
            BOTTOM RIGHT BLOCK: RED/CORAL CUBE WITH "C"
            ========================================================= */}
        <g id="block-C">
          {/* Top Face */}
          <path
            d="M135 92 L171 108 L135 124 L99 108 Z"
            fill="#F87171"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <path
            d="M171 108 L171 154 L135 170 L135 124 Z"
            fill="#B91C1C"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Front / Left Face */}
          <path
            d="M99 108 L135 124 L135 170 L99 154 Z"
            fill="#EF4444"
            stroke="#262626"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Recessed Border on Front Face */}
          <path
            d="M106 114 L128 124 L128 162 L106 152 Z"
            stroke="#991B1B"
            strokeWidth="2.5"
            fill="#991B1B"
            fillOpacity="0.2"
          />
          {/* Letter 'C' on Front Face */}
          <g transform="translate(117, 139) skewY(23) scale(1.1, 1)">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              stroke="#7F1D1D"
              strokeWidth="1.5"
              fontFamily="Outfit, sans-serif"
              fontWeight="900"
              fontSize="24"
            >
              C
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};
