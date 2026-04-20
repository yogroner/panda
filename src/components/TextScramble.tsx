import React from "react";
import { motion } from "motion/react";
import { Language, translations } from "../lib/translations";

export const TextScramble: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].scramble;

  return (
    <section className="min-h-[30vh] flex flex-col items-center justify-center gap-4 px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-center text-foreground max-w-[700px] leading-[1.2]"
      >
        {t.title}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-xl text-accent1 font-medium font-['Heebo']"
      >
        {t.subtitle}
      </motion.p>
    </section>
  );
};
