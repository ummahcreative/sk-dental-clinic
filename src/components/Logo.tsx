import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({variant = 'light', compact = false}) => {
  const isDarkBg = variant === 'dark';
  const primaryFill = isDarkBg ? '#FFFFFF' : '#153B50';
  const accentStroke = isDarkBg ? '#C7A76C' : '#159A9C';
  const skColor = isDarkBg ? '#153B50' : '#FFFFFF';
  const textColor = isDarkBg ? 'text-white' : 'text-[#153B50]';
  const subColor = isDarkBg ? 'text-[#E9F6F3]/80' : 'text-[#159A9C]';

  return (
    <div className="inline-flex items-center gap-3 select-none shrink-0">
      <svg
        width={compact ? 38 : 44}
        height={compact ? 38 : 44}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M15.5 7.5C11.2 7.5 8 11.1 8 15.8C8 20.6 10.6 25.4 12.1 31.2C13.3 35.8 14.3 41 17.5 41C19.8 41 20.9 37.3 22.3 33.4C23 31.5 23.6 30.8 24 30.8C24.4 30.8 25 31.5 25.7 33.4C27.1 37.3 28.2 41 30.5 41C33.7 41 34.7 35.8 35.9 31.2C37.4 25.4 40 20.6 40 15.8C40 11.1 36.8 7.5 32.5 7.5C29.4 7.5 26.8 9.2 24 9.2C21.2 9.2 18.6 7.5 15.5 7.5Z"
          fill={primaryFill}
          stroke={accentStroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M19.8 17.4C19.8 16.4 18.8 15.8 17.5 15.8C16.2 15.8 15.3 16.4 15.3 17.3C15.3 18.3 16.2 18.7 17.6 19.1C19 19.5 20.1 20 20.1 21.3C20.1 22.4 19 23.2 17.5 23.2C16 23.2 15 22.5 14.8 21.5"
          stroke={skColor}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.2 15.8V23.2M24.2 19.8L28.8 15.8M26.2 18.1L29.1 23.2"
          stroke={isDarkBg ? '#159A9C' : '#C7A76C'}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-[0.02em] whitespace-nowrap ${
            compact ? 'text-[15px] sm:text-[17px]' : 'text-lg sm:text-xl'
          } ${textColor}`}
          style={{fontFamily: 'var(--font-heading)'}}
        >
          DR. SK DENTAL CLINIC
        </span>
        <span
          className={`text-[10px] font-semibold tracking-[0.18em] uppercase mt-1 whitespace-nowrap ${subColor}`}
        >
          Hyderabad · Est. Care
        </span>
      </div>
    </div>
  );
};
