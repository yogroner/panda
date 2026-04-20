import React, { useRef, memo } from "react";
import { motion } from "motion/react";

interface GlassCardProps {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
  description: string;
  className?: string;
}

export const GlassCard = memo(({ icon, image, title, subtitle, description, className = "" }: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
    setTimeout(() => {
      if (cardRef.current) cardRef.current.style.transition = "";
    }, 600);
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.2s ease-out";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative h-full flex flex-col rounded-[20px] p-6 bg-surface/90 border border-outline-variant backdrop-blur-[12px] overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] will-change-transform isolate group/card ${className}`}
      style={{ transform: "perspective(1000px) translateZ(0)" }}
    >
      {/* Glow border - Restored */}
      <div className="absolute inset-[-1px] rounded-[21px] bg-[conic-gradient(from_var(--angle,0deg),#b3ffc8,#ff6ef7,#5eadff,#b3ffc8)] z-[-1] opacity-0 transition-opacity duration-400 group-hover/card:opacity-100 group-hover/card:animate-[border-spin_4s_linear_infinite]" />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] bg-[length:200%_100%] bg-[-100%_0] transition-[background-position] duration-1000 ease group-hover/card:bg-[200%_0] pointer-events-none rounded-inherit" />
      
      <div className="relative z-10 flex flex-col h-full [transform:translateZ(1px)]">
        {image && (
          <div className="mb-6 rounded-xl overflow-hidden border border-outline-variant/30 aspect-video w-full bg-background/20">
            <img 
              src={image} 
              alt={title} 
              loading="lazy"
              className="w-full h-full object-cover group-hover/card:scale-105 transition-all duration-700 ease-out [transform:translateZ(0)]" 
              referrerPolicy="no-referrer" 
            />
          </div>
        )}
        {icon && <div className="text-accent1 text-4xl mb-4">{icon}</div>}
        <div className="mt-auto">
          <h3 className="font-display text-lg md:text-xl font-bold tracking-[-0.01em] text-foreground uppercase">{title}</h3>
          {subtitle && (
            <span className="text-[0.7rem] font-mono font-bold text-accent1 uppercase tracking-widest mt-1 block">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

GlassCard.displayName = "GlassCard";
