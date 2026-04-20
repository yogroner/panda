import React from "react";

const ITEMS = [
  "Glitch",
  "Aurora",
  "Glassmorphism",
  "Scramble",
  "Spotlight",
  "Conic Border",
  "3D Tilt",
  "Noise",
  "Counter"
];

export const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden border-y border-outline-variant py-5 group/marquee" aria-hidden="true">
      <div className="flex w-max animate-marquee-scroll gap-12 group-hover/marquee:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <React.Fragment key={i}>
            <span className="font-display text-lg font-extralight tracking-[0.08em] uppercase text-secondary transition-colors duration-300 hover:text-accent1 whitespace-nowrap">
              {item}
            </span>
            <span className="text-accent2 text-lg">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
