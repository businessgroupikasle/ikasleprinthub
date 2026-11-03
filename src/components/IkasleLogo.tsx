import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer' | 'yellow' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const IkasleLogo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  style = {},
}) => {
  const sizeMap = {
    sm: { height: 34 },
    md: { height: 42 },
    lg: { height: 52 },
    xl: { height: 64 },
  };

  const { height } = sizeMap[size] || sizeMap.md;

  let logoSrc = '/assets/printhub-trimmed.png';
  if (variant === 'dark' || variant === 'footer') {
    logoSrc = '/assets/printhub-trimmed-navy.png';
  } else if (variant === 'yellow') {
    logoSrc = '/assets/printhub-trimmed-dark.png';
  } else if (variant === 'gold') {
    logoSrc = '/assets/printhub-trimmed-gold.png';
  }

  return (
    <div
      className={`ikasle-logo-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
        lineHeight: 1,
        ...style,
      }}
    >
      <img
        src={logoSrc}
        alt="iKASLÉ Print Hub"
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
        loading="eager"
      />
    </div>
  );
};
