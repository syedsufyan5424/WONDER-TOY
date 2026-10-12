import React from 'react';

export const TeddyBearIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="bearShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F3D33" floodOpacity="0.14" />
        </filter>
        <radialGradient id="bearBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C27A38" />
          <stop offset="70%" stopColor="#A75D28" />
          <stop offset="100%" stopColor="#8C461C" />
        </radialGradient>
        <radialGradient id="bearTan" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FEE4C3" />
          <stop offset="100%" stopColor="#F5CA98" />
        </radialGradient>
      </defs>

      <g filter="url(#bearShadow)">
        {/* ==================== EARS ==================== */}
        {/* Left Ear */}
        <circle
          cx="62"
          cy="52"
          r="22"
          fill="url(#bearBody)"
          stroke="#262626"
          strokeWidth="3.2"
        />
        <circle cx="64" cy="52" r="12" fill="url(#bearTan)" stroke="#262626" strokeWidth="2.2" />

        {/* Right Ear */}
        <circle
          cx="138"
          cy="52"
          r="22"
          fill="url(#bearBody)"
          stroke="#262626"
          strokeWidth="3.2"
        />
        <circle cx="136" cy="52" r="12" fill="url(#bearTan)" stroke="#262626" strokeWidth="2.2" />

        {/* ==================== BODY ==================== */}
        {/* Main Torso */}
        <ellipse
          cx="100"
          cy="126"
          rx="44"
          ry="40"
          fill="url(#bearBody)"
          stroke="#262626"
          strokeWidth="3.2"
        />

        {/* Tan Belly Patch */}
        <ellipse
          cx="100"
          cy="130"
          rx="27"
          ry="25"
          fill="url(#bearTan)"
          stroke="#262626"
          strokeWidth="2.4"
        />

        {/* ==================== ARMS ==================== */}
        {/* Left Arm */}
        <ellipse
          cx="58"
          cy="124"
          rx="14"
          ry="24"
          transform="rotate(22, 58, 124)"
          fill="url(#bearBody)"
          stroke="#262626"
          strokeWidth="3.2"
        />

        {/* Right Arm */}
        <ellipse
          cx="142"
          cy="124"
          rx="14"
          ry="24"
          transform="rotate(-22, 142, 124)"
          fill="url(#bearBody)"
          stroke="#262626"
          strokeWidth="3.2"
        />

        {/* ==================== FEET / PAWS ==================== */}
        {/* Left Foot */}
        <g id="left-foot">
          <ellipse
            cx="64"
            cy="158"
            rx="23"
            ry="18"
            transform="rotate(-10, 64, 158)"
            fill="url(#bearBody)"
            stroke="#262626"
            strokeWidth="3.2"
          />
          {/* Main Foot Pad */}
          <ellipse
            cx="64"
            cy="158"
            rx="14"
            ry="11"
            transform="rotate(-10, 64, 158)"
            fill="url(#bearTan)"
            stroke="#262626"
            strokeWidth="2"
          />
          {/* Toe dots */}
          <circle cx="53" cy="147" r="3" fill="url(#bearTan)" />
          <circle cx="61" cy="144" r="3.2" fill="url(#bearTan)" />
          <circle cx="70" cy="145" r="3" fill="url(#bearTan)" />
        </g>

        {/* Right Foot */}
        <g id="right-foot">
          <ellipse
            cx="136"
            cy="158"
            rx="23"
            ry="18"
            transform="rotate(10, 136, 158)"
            fill="url(#bearBody)"
            stroke="#262626"
            strokeWidth="3.2"
          />
          {/* Main Foot Pad */}
          <ellipse
            cx="136"
            cy="158"
            rx="14"
            ry="11"
            transform="rotate(10, 136, 158)"
            fill="url(#bearTan)"
            stroke="#262626"
            strokeWidth="2"
          />
          {/* Toe dots */}
          <circle cx="127" cy="145" r="3" fill="url(#bearTan)" />
          <circle cx="136" cy="144" r="3.2" fill="url(#bearTan)" />
          <circle cx="145" cy="147" r="3" fill="url(#bearTan)" />
        </g>

        {/* ==================== HEAD ==================== */}
        {/* Main Head Circle */}
        <circle
          cx="100"
          cy="78"
          r="42"
          fill="url(#bearBody)"
          stroke="#262626"
          strokeWidth="3.2"
        />

        {/* Eyes */}
        {/* Left Eye */}
        <circle cx="82" cy="72" r="5" fill="#1C1917" />
        <circle cx="80.5" cy="70.5" r="1.8" fill="white" />

        {/* Right Eye */}
        <circle cx="118" cy="72" r="5" fill="#1C1917" />
        <circle cx="116.5" cy="70.5" r="1.8" fill="white" />

        {/* Tan Muzzle / Snout */}
        <ellipse
          cx="100"
          cy="89"
          rx="21"
          ry="16"
          fill="url(#bearTan)"
          stroke="#262626"
          strokeWidth="2.5"
        />

        {/* Nose */}
        <path
          d="M93 84 C93 82 96 80 100 80 C104 80 107 82 107 84 C107 87 103 90 100 90 C97 90 93 87 93 84 Z"
          fill="#3B1C0B"
        />
        <ellipse cx="98.5" cy="83" rx="2" ry="1" fill="#78350F" opacity="0.6" />

        {/* Mouth Smile */}
        <path
          d="M100 90 L100 96 M93 94 C96 98 100 99 100 96 C100 99 104 98 107 94"
          stroke="#3B1C0B"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
