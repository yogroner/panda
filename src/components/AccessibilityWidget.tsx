import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Accessibility, X, Contrast, UserRound } from "lucide-react";
import { useAccessibility } from "../lib/accessibility";

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    highContrast, largeText,
    toggleHighContrast, toggleLargeText
  } = useAccessibility();

  return (
    <div className="fixed bottom-24 right-6 z-[9999] flex flex-col items-end gap-3 rtl:left-6 rtl:right-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-surface/95 border border-outline-variant backdrop-blur-2xl p-6 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-72 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-bottom border-outline-variant pb-2 mb-2">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent1">נגישות</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="סגור תפריט נגישות"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <AccessibilityButton 
              active={highContrast} 
              onClick={toggleHighContrast}
              icon={<Contrast className="w-4 h-4" />}
              label="ניגודיות גבוהה"
            />
            <AccessibilityButton 
              active={largeText} 
              onClick={toggleLargeText}
              icon={<UserRound className="w-4 h-4" />}
              label="הגדלת טקסט"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto ${
          isOpen ? 'bg-accent1 text-black' : 'bg-surface/80 text-white backdrop-blur-md border border-outline-variant hover:border-accent1'
        }`}
        aria-label="תפריט נגישות"
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

const AccessibilityButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all font-sans text-sm font-medium border ${
      active 
        ? 'bg-accent1 text-black border-accent1' 
        : 'bg-white/5 text-white/80 border-transparent hover:bg-white/10'
    }`}
  >
    {icon}
    <span className="flex-1 text-right">{label}</span>
    {active && <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.5)]" />}
  </button>
);
