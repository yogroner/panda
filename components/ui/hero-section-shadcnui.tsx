import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-[700px] flex-col items-center justify-center px-4 py-16 text-center hero-gradient relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] aura-glow opacity-60 pointer-events-none" />
      </div>

      <motion.div variants={itemVariants} className="mb-8 relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          חדש: פתרונות AI לעסקים
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mb-6 text-5xl font-bold tracking-tight md:text-8xl font-headline text-editorial relative z-10"
      >
        בונה אתרים יוצאי דופן
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
          לעסקים שרוצים יותר
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mb-12 max-w-3xl text-lg md:text-2xl text-secondary leading-relaxed font-light relative z-10"
      >
        סטודיו בוטיק המתמחה בחוויות דיגיטליות יוקרתיות. אנחנו משלבים אסתטיקה של Obsidian Organicism עם ביצועים טכנולוגיים חסרי פשרות.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col md:flex-row-reverse gap-5 w-full md:w-auto relative z-10">
        <Button size="lg" className="bg-primary text-on-primary hover:brightness-110 rounded-full px-12 py-7 text-lg font-bold shadow-xl shadow-primary/10">
          התחלת פרויקט
        </Button>
        <Button size="lg" variant="outline" className="border-white/10 text-on-surface hover:bg-white/5 rounded-full px-12 py-7 text-lg font-medium">
          צפייה בתיק עבודות
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-20 flex items-center gap-8 text-sm text-secondary relative z-10"
      >
        <div>
          <div className="text-2xl font-bold text-on-surface">
            100+
          </div>
          <div>פרויקטים</div>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div>
          <div className="text-2xl font-bold text-on-surface">50+</div>
          <div>לקוחות</div>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div>
          <div className="text-2xl font-bold text-on-surface">
            100%
          </div>
          <div>איכות</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
