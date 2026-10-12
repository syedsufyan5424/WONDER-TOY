import React from 'react';
import { Link } from 'react-router-dom';

interface WonderToysLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'blocks' | 'letters';
}

export const WonderToysLogo: React.FC<WonderToysLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Exact color scheme from the WonderToys branding in the screenshot
  const letters = [
    { char: 'W', color: '#EB483F' }, // Coral Red
    { char: 'O', color: '#F47C20' }, // Vibrant Orange
    { char: 'N', color: '#FDB813' }, // Sunshine Yellow
    { char: 'D', color: '#32B3A6' }, // Mint Teal
    { char: 'E', color: '#9B76C9' }, // Playful Lilac Purple
    { char: 'R', color: '#EE5982' }, // Rose Pink
    { char: 'T', color: '#EB483F' }, // Coral Red
    { char: 'O', color: '#F47C20' }, // Vibrant Orange
    { char: 'Y', color: '#EE5982' }, // Rose Pink
    { char: 'S', color: '#32B3A6' }, // Mint Teal
  ];

  const sizeClasses = {
    sm: 'text-xl sm:text-2xl tracking-normal',
    md: 'text-2xl sm:text-[28px] tracking-normal',
    lg: 'text-3xl sm:text-4xl tracking-normal',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center font-heading font-black select-none group transition-transform ${sizeClasses[size]} ${className}`}
      aria-label="WonderToys Home"
    >
      {letters.map((item, idx) => (
        <span
          key={idx}
          style={{ color: item.color }}
          className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5"
        >
          {item.char}
        </span>
      ))}
    </Link>
  );
};
