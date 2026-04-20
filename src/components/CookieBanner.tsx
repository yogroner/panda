import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useConsent } from "../lib/consent";
import { ShieldCheck } from "lucide-react";

export const CookieBanner: React.FC = () => {
  const { choice, accept, deny } = useConsent();

  return (
    <AnimatePresence>
      {choice === "undecided" && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[450px] z-[10000] p-6 bg-surface/95 border border-outline-variant backdrop-blur-2xl rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col gap-5 rtl:left-6 rtl:right-auto"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-accent1/10 text-accent1 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">פרטיות ושימוש בעוגיות</h3>
              <p className="text-white/60 text-xs leading-relaxed font-sans">
                אנו משתמשים בעוגיות כדי לשפר את החוויה שלך, למדוד תנועה ולספק תוכן מותאם אישית. חלק מהעוגיות חיוניות לפעילות האתר.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={accept}
              className="flex-1 px-6 py-3 rounded-xl bg-accent1 text-black font-sans text-sm font-bold uppercase tracking-wide hover:brightness-110 active:scale-95 transition-all"
            >
              אישור הכל
            </button>
            <button
              onClick={deny}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 font-sans text-sm font-bold uppercase tracking-wide hover:bg-white/10 hover:text-white transition-all"
            >
              רק הכרחיות
            </button>
          </div>
          
          <div className="text-[10px] text-white/30 font-mono text-center">
            למידע נוסף, עיין ב<span className="underline cursor-pointer hover:text-accent1 transition-colors">מדיניות הפרטיות</span> שלנו.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
