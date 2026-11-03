import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer' | 'yellow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const IkasleLogo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isDarkTheme = variant === 'light'; // light logo for dark backgrounds
  const isYellowBg = variant === 'yellow';
  const primaryTextColor = isDarkTheme ? '#FFFFFF' : '#05264D';
  const yellowAccent = isYellowBg ? '#05264D' : '#FFF000';
  const subtitleColor = isDarkTheme ? '#FFF000' : '#05264D';

  const sizeMap = {
    sm: { height: 38 },
    md: { height: 46 },
    lg: { height: 56 },
    xl: { height: 70 },
  };

  const { height } = sizeMap[size];

  return (
    <div className={`ikasle-logo-wrap ${className}`} style={{ display: 'inline-flex', alignItems: 'center', userSelect: 'none' }}>
      <svg
        height={height}
        viewBox="0 0 170 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Main "iKASLÉ" text unified */}
        <text
          x="2"
          y="28"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="29"
          letterSpacing="-0.5px"
          fill={primaryTextColor}
        >
          iKASLÉ
        </text>

        {/* 4-point yellow sparkle / star accent right above/next to the É */}
        <path
          d="M 125 10 Q 128 14 132 14 Q 128 14 125 18 Q 122 14 118 14 Q 122 14 125 10 Z"
          fill={yellowAccent}
        />
        <circle cx="125" cy="14" r="1.2" fill={isDarkTheme ? '#05264D' : isYellowBg ? '#FFF000' : '#FFFFFF'} />

        {/* Subtitle "Print Hub" with flanking flourishes */}
        {showTagline && (
          <g>
            {/* Left flourish line */}
            <line x1="8" y1="41" x2="38" y2="41" stroke={subtitleColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <circle cx="43" cy="41" r="1.5" fill={yellowAccent} />

            {/* "Print Hub" text */}
            <text
              x="50"
              y="44"
              fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
              fontWeight="700"
              fontSize="11.5"
              letterSpacing="2.2px"
              fill={subtitleColor}
            >
              Print Hub
            </text>

            {/* Right flourish line */}
            <circle cx="120" cy="41" r="1.5" fill={yellowAccent} />
            <line x1="125" y1="41" x2="155" y2="41" stroke={subtitleColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};
