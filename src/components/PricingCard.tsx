import React, { useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Language, translations } from "../lib/translations";

interface PricingCardProps {
  title: string;
  price: string;
  subPrice?: string;
  features: string[];
  ctaText: string;
  highlight?: boolean;
  note?: string;
  onCtaClick?: (serviceName: string) => void;
  lang: Language;
}

export const PricingCard = memo(({ 
  title, 
  price, 
  subPrice, 
  features, 
  ctaText, 
  highlight = false,
  note,
  onCtaClick,
  lang
}: PricingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = translations[lang].services;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px) translateZ(5px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform .6s cubic-bezier(.23,1,.32,1)";
    cardRef.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0) translateZ(0)";
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform .15s ease-out";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col h-fit rounded-[24px] p-8 border transition-all duration-500 overflow-hidden group/pricing [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform ${
        highlight 
          ? "bg-white/[0.05] border-accent1/30 shadow-[0_20px_50px_rgba(179,255,200,0.1)]" 
          : "bg-surface border-outline-variant"
      }`}
      style={{ transform: "perspective(1000px) translate3d(0,0,0)" }}
    >
      {/* Sheen Effect */}
      <div className="absolute inset-0 opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.05)_55%,transparent_70%)] bg-[length:200%_200%] animate-[shimmer_3s_infinite]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <h3 className="font-display text-xl font-bold text-white mb-2 whitespace-pre-line leading-tight">{title}</h3>
          <div className={`flex items-baseline gap-1 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-4xl font-black text-accent1">{price}</span>
            <span className="text-xl font-bold text-accent1">₪</span>
          </div>
          {subPrice && (
            <p className="text-accent1 text-sm font-mono mt-1">{subPrice}</p>
          )}
          {note && (
            <p className="text-accent1/70 text-xs font-mono mt-2 italic">{note}</p>
          )}
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 w-full py-2 mb-4 text-accent1/70 hover:text-accent1 transition-colors font-mono text-xs uppercase tracking-widest"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {isExpanded ? (lang === 'he' ? "הצג פחות" : "Show Less") : (lang === 'he' ? "מה החבילה כוללת?" : "What's included?")}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="w-full h-px bg-outline-variant mb-6" />
              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 ${lang === 'he' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    <div className="mt-1 p-0.5 rounded-full bg-accent1/20 text-accent1">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-white/80 text-sm font-sans leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => onCtaClick?.(title)}
          className={`w-full py-4 rounded-xl font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 ${
          highlight 
            ? "bg-accent1 text-background hover:brightness-110 shadow-[0_10px_20px_rgba(179,255,200,0.2)]" 
            : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
        }`}>
          {t.cta}
        </button>
      </div>
    </motion.div>
  );
});

PricingCard.displayName = "PricingCard";
