import React, { memo } from "react";
import { motion } from "motion/react";
import { SparkEffect } from "./ui/spark-effect";
import { Shield } from "lucide-react";
import { Language, translations } from "../lib/translations";

export const GlitchHero = memo(({ logo, lang }: { logo: string; lang: Language }) => {
  const t = translations[lang].hero;

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center gap-6 px-8 pt-24 pb-12 overflow-hidden">
      <SparkEffect />
      <div className="flex flex-col items-center gap-8 relative z-10 w-full max-w-7xl">
        <div className="relative h-20 md:h-24 w-40 md:w-48">
          <motion.img
            src={logo}
            alt="Panda Logo Hero"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-contain invert"
            referrerPolicy="no-referrer"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-accent1 via-accent3 to-accent2 mix-blend-multiply pointer-events-none"
            style={{
              WebkitMaskImage: `url(${logo})`,
              maskImage: `url(${logo})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />
        </div>
        
        <div className="flex flex-col items-center gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center group"
          >
            <h1 
              className="font-display text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1] tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-br from-accent1 via-accent3 to-accent2 relative text-center cursor-default max-w-5xl transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(179,255,200,0.3)]"
            >
              {t.title1}
            </h1>
            {t.title2 && (
              <h1 
                className="font-display text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1] tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-br from-accent1 via-accent3 to-accent2 relative text-center cursor-default max-w-5xl transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(179,255,200,0.3)]"
              >
                {t.title2}
              </h1>
            )}
            {/* Subtle Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 text-center w-full"
          >
            <p className="hero-subtitle text-xl md:text-3xl text-white font-['Heebo'] font-medium leading-tight max-w-3xl">
              {t.subtitle}
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="price-tag text-4xl md:text-6xl font-['Heebo'] font-black text-accent2 drop-shadow-[0_0_20px_rgba(255,110,247,0.4)]">
                {t.price}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Strip moved inside Hero to ensure visibility */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full mt-12 bg-surface/30 border-y border-outline-variant py-6 backdrop-blur-sm rounded-2xl"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-4">
            {t.trust.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-accent1 font-mono text-[10px] md:text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

GlitchHero.displayName = "GlitchHero";
