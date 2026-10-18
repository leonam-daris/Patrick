import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'stacked' | 'monogram' | 'badge';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
  size = 'md',
}) => {
  const isDark = theme === 'dark';
  const navyColor = isDark ? '#FFFFFF' : '#0A192F';
  const goldColor = '#C09349'; // Exact rich ochre gold from provided patrick.png

  const sizeScales = {
    sm: {
      svgH: 'h-8 sm:h-9',
      monogramW: 'w-8 h-8 sm:w-9 sm:h-9',
      dividerH: 'h-7 sm:h-8',
      titleText: 'text-[12px] sm:text-[13px] tracking-[0.14em]',
      subText: 'text-[7px] sm:text-[7.5px] tracking-[0.22em]',
    },
    md: {
      svgH: 'h-9 sm:h-11',
      monogramW: 'w-9 h-9 sm:w-11 sm:h-11',
      dividerH: 'h-8 sm:h-10',
      titleText: 'text-[13px] sm:text-[15px] tracking-[0.15em]',
      subText: 'text-[7.5px] sm:text-[8.5px] tracking-[0.24em]',
    },
    lg: {
      svgH: 'h-12 sm:h-14',
      monogramW: 'w-12 h-12 sm:w-14 sm:h-14',
      dividerH: 'h-11 sm:h-13',
      titleText: 'text-[16px] sm:text-[18px] tracking-[0.16em]',
      subText: 'text-[8.5px] sm:text-[9.5px] tracking-[0.26em]',
    },
    xl: {
      svgH: 'h-16 sm:h-20',
      monogramW: 'w-16 h-16 sm:w-20 sm:h-20',
      dividerH: 'h-15 sm:h-18',
      titleText: 'text-[20px] sm:text-[24px] tracking-[0.18em]',
      subText: 'text-[10px] sm:text-[11px] tracking-[0.28em]',
    },
  }[size];

  // Authentic PR Monogram Vector (Faithfully digitized from patrick.png and Imagem 1)
  const MonogramSvg = ({ className: svgClass = '' }: { className?: string }) => (
    <svg
      viewBox="0 0 102 96"
      className={`${svgClass} shrink-0 select-none overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Monograma PR Patrick Ramon"
    >
      <defs>
        <linearGradient id="prMonogramGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D4A759" />
          <stop offset="50%" stop-color="#C09349" />
          <stop offset="100%" stop-color="#A87B33" />
        </linearGradient>
      </defs>

      {/* Letter P (Deep Navy #0A192F) */}
      {/* P Vertical Stem & Bracketed Serifs */}
      <path
        d="M10 10 H34 V15 H26 V80 H34 V85 H10 V80 H18 V15 H10 V10 Z"
        fill={navyColor}
      />
      {/* P Upper Arch and Curved Crescent Bowl */}
      <path
        d="M26 10 H46 C61 10 71 18 71 32 C71 43 62 52 47 53 L33 53 L56 41 C62 37 65 34 65 31 C65 22 57 16 45 16 H26 V10 Z"
        fill={navyColor}
      />

      {/* Letter R (Rich Gold with sweeping tail from patrick.png) */}
      {/* R Vertical Stem & Serifs */}
      <path
        d="M34 27 H54 V31 H46 V80 H56 V85 H31 V80 H39 V31 H34 V27 Z"
        fill="url(#prMonogramGold)"
      />
      {/* R Upper Bowl */}
      <path
        d="M46 27 H63 C74 27 81 34 81 44 C81 52 75 58 67 60 C72 63 77 70 83 79 C86 83 90 85 95 85 V87 C89 87 83 84 78 77 C72 68 67 61 59 61 H46 V56 H61 C69 56 74 51 74 44 C74 37 69 32 61 32 H46 V27 Z"
        fill="url(#prMonogramGold)"
      />
      {/* R Calligraphic Sweeping Tail Flourish */}
      <path
        d="M62 60 C68 64 74 72 80 80 C85 85 91 87.5 98 87.5 C98 85.5 94 84 90 80.5 C84 74.5 77 66 69 60 Z"
        fill="url(#prMonogramGold)"
      />
    </svg>
  );

  // Variant 1: Pure Monogram Emblem
  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
        <MonogramSvg className={sizeScales.monogramW} />
      </div>
    );
  }

  // Variant 2: Badge with soft circular backdrop (as used in mobile avatars / seal)
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center rounded-full bg-[#F6F2EB] p-2 shrink-0 select-none shadow-xs ${className}`}>
        <MonogramSvg className={sizeScales.monogramW} />
      </div>
    );
  }

  // Variant 3: Stacked Layout (Exact reproduction of Imagem 1)
  // [ PR Monogram ]
  // PATRICK
  // RAMON
  // PSICÓLOGO | CRP 09|22010
  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center shrink-0 select-none ${className}`}>
        <MonogramSvg className={`${sizeScales.monogramW} mb-2.5`} />
        <div
          className={`font-display font-bold uppercase ${sizeScales.titleText} leading-tight whitespace-nowrap`}
          style={{ color: navyColor }}
        >
          PATRICK
        </div>
        <div
          className={`font-display font-bold uppercase ${sizeScales.titleText} leading-tight whitespace-nowrap -mt-0.5`}
          style={{ color: navyColor }}
        >
          RAMON
        </div>
        <div
          className={`mt-1 font-sans font-semibold uppercase ${sizeScales.subText} leading-tight whitespace-nowrap`}
          style={{ color: goldColor }}
        >
          PSICÓLOGO | CRP 09|22010
        </div>
      </div>
    );
  }

  // Variant 4: Official Horizontal Layout (Exact reproduction of patrick.png)
  // [ PR Monogram ]  | ◆ |  [ PATRICK RAMON ]
  //                         [ PSICÓLOGO | CRP 09|22010 ]
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 shrink-0 select-none ${className}`}>
      {/* 1. Authentic Interlocking Monogram (No circle border, as in patrick.png) */}
      <MonogramSvg className={sizeScales.monogramW} />

      {/* 2. Ornate Vertical Separator with Centered Diamond */}
      <div className={`flex flex-col items-center justify-center shrink-0 ${sizeScales.dividerH}`}>
        <div className="w-[1.2px] flex-1" style={{ backgroundColor: `${goldColor}90` }} />
        <div
          className="my-0.5 text-[8px] sm:text-[9px] leading-none transform rotate-45 select-none"
          style={{ color: goldColor }}
        >
          ◆
        </div>
        <div className="w-[1.2px] flex-1" style={{ backgroundColor: `${goldColor}90` }} />
      </div>

      {/* 3. Official Typography */}
      <div className="flex flex-col justify-center text-left shrink-0 min-w-0">
        <div
          className={`font-display font-bold uppercase ${sizeScales.titleText} leading-none whitespace-nowrap`}
          style={{ color: navyColor }}
        >
          PATRICK RAMON
        </div>
        <div
          className={`mt-1 sm:mt-1.5 font-sans font-semibold uppercase ${sizeScales.subText} leading-none flex items-center gap-1 sm:gap-1.5 whitespace-nowrap`}
          style={{ color: goldColor }}
        >
          <span>PSICÓLOGO</span>
          <span className="opacity-60">|</span>
          <span>CRP 09|22010</span>
        </div>
      </div>
    </div>
  );
};
