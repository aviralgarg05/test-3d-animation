import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const colors = [
  { name: 'Neon Crimson', hex: '#FF2A54', class: 'bg-primary' },
  { name: 'Toxic Green', hex: '#CCFF00', class: 'bg-accent-green' },
  { name: 'Electric Purple', hex: '#4A00FF', class: 'bg-accent-purple' },
  { name: 'Glossy Obsidian', hex: '#141418', class: 'bg-surface' },
];

export function MoltenColors() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full h-screen flex overflow-hidden bg-background">
      {colors.map((color, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <div
            key={color.hex}
            className={twMerge(
              'relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-end p-12 cursor-crosshair',
              color.class,
              isHovered ? 'w-[60vw] shrink-0' : isOtherHovered ? 'flex-1' : 'w-[25vw] shrink-0'
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Ripple effect overlay could go here with WebGL, but for simplicity we use CSS mix-blend */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay bg-gradient-to-t from-black/50 to-transparent" />
            
            <div className="relative z-10 flex flex-col gap-4 transform -rotate-90 origin-bottom-left absolute bottom-12 left-12">
              <span className="font-heading text-4xl font-bold text-white whitespace-nowrap tracking-tighter mix-blend-difference">
                {color.hex}
              </span>
              <span className="font-body text-sm font-bold text-white/70 uppercase tracking-widest whitespace-nowrap mix-blend-difference">
                {color.name}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
