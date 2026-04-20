import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  TrendingUp, 
  Mail, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Phone
} from "lucide-react";
import { GlitchHero } from "./components/GlitchHero";
import { GlassCard } from "./components/GlassCard";
import { CustomCursor } from "./components/CustomCursor";
import { AuroraBackground } from "./components/AuroraBackground";
import { TextScramble } from "./components/TextScramble";
import { PricingCard } from "./components/PricingCard";
import { Language, translations } from "./lib/translations";
import { CookieBanner } from "./components/CookieBanner";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
import { useAccessibility } from "./lib/accessibility";

interface Project {
  id: string;
  uid: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  order: number;
}

const PANDA_LOGO = "https://images.prismic.io/panda/adO6K5GXnQHGZSK__panda_trans.webp?auto=format,compress";

export default function App() {
  const { highContrast } = useAccessibility();
  const [lang, setLang] = useState<Language>('he');
  const [navVisible, setNavVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [contactMessage, setContactMessage] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const t = translations[lang];

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        
        // Map items from server.ts gallery API
        const mapped = data.map((item: any, index: number) => ({
          id: item.id,
          uid: item.id,
          title: item.name.split('.')[0], 
          subtitle: "Digital Studio Asset",
          imageUrl: item.url,
          order: index
        }));
        
        setProjects(mapped);
      } catch (error) {
        console.error('Error fetching gallery projects:', error);
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update Top Status
      const isTop = currentScrollY < 50;
      if (isTop !== isAtTop) {
        setIsAtTop(isTop);
      }

      // Update Nav Visibility
      if (isTop) {
        setNavVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;

      // Update Active Section
      const sections = ["hero", "portfolio", "services", "about", "contact"];
      let currentSection = activeSection;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtTop, activeSection]);

  const navLinks = [
    { id: "hero", label: t.nav.home },
    { id: "portfolio", label: t.nav.portfolio },
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact }
  ];

  const scrollToSection = (id: string, block: ScrollLogicalPosition = "start") => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block });
    }
  };

  const handleServiceClick = (serviceName: string) => {
    const cleanServiceName = serviceName.replace(/\n/g, " ");
    setContactMessage(`${t.contact.prefill}${cleanServiceName}.`);
    scrollToSection("contact", "center");
  };

  const toggleLang = () => {
    setLang(prev => prev === 'he' ? 'en' : 'he');
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent1/30 group" dir={t.dir}>
      <CustomCursor />
      <AuroraBackground />
      <AccessibilityWidget />
      <CookieBanner />

      <div className={highContrast ? "high-contrast-mode" : ""}>
        {/* Navigation */}
        <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isAtTop 
            ? "bg-transparent border-transparent py-6" 
            : "glass-nav border-outline-variant py-4"
        }`}
      >
        <div className="flex flex-row justify-between items-center w-full px-4 md:px-8 py-2 md:py-4 max-w-7xl mx-auto gap-2 md:gap-4">
          
          {/* Mobile Layout: Group 1 (Language & Phone) */}
          <div className="flex items-center gap-2 md:gap-4 order-1 md:order-none">
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsPhoneOpen(false);
                }}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full border border-outline-variant hover:border-accent1 transition-all bg-surface/50 backdrop-blur-sm group/lang"
              >
                <span className="text-base md:text-xl">
                  {lang === 'he' ? '🇮🇱' : '🇺🇸'}
                </span>
                <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-white group-hover/lang:text-accent1 hidden sm:inline">
                  {lang === 'he' ? 'עברית' : 'English'}
                </span>
                <ChevronDown className={`w-3 h-3 md:w-3.5 md:h-3.5 text-white/50 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[-1]" 
                      onClick={() => setIsLangOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-3 ${lang === 'he' ? 'right-0' : 'left-0'} bg-background/80 border border-outline-variant rounded-2xl p-2 min-w-[140px] md:min-w-[160px] shadow-2xl backdrop-blur-xl z-[100] flex flex-col gap-1`}
                    >
                      <button
                        onClick={() => { setLang('he'); setIsLangOpen(false); }}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-white/10 ${lang === 'he' ? 'bg-white/5 text-accent1' : 'text-white/70'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🇮🇱</span>
                          <span className="text-sm font-bold font-mono">עברית</span>
                        </div>
                        {lang === 'he' && <div className="w-1.5 h-1.5 rounded-full bg-accent1" />}
                      </button>
                      <button
                        onClick={() => { setLang('en'); setIsLangOpen(false); }}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-white/10 ${lang === 'en' ? 'bg-white/5 text-accent1' : 'text-white/70'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🇺🇸</span>
                          <span className="text-sm font-bold font-mono">English</span>
                        </div>
                        {lang === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-accent1" />}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Phone Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsPhoneOpen(!isPhoneOpen);
                  setIsLangOpen(false);
                }}
                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full border border-outline-variant hover:border-accent1 transition-all bg-surface/50 backdrop-blur-sm group/phone"
                title="Call us"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/phone:text-accent1" />
                <ChevronDown className={`w-3 h-3 md:w-3.5 md:h-3.5 text-white/50 transition-transform ${isPhoneOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isPhoneOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[-1]" 
                      onClick={() => setIsPhoneOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-3 ${lang === 'he' ? 'right-0' : 'left-0'} bg-background/80 border border-outline-variant rounded-2xl p-2 min-w-[200px] md:min-w-[260px] shadow-2xl backdrop-blur-xl z-[100] flex flex-col gap-1`}
                    >
                      <a 
                        href="tel:+972529502079"
                        className="flex items-center justify-center gap-3 px-4 py-5 rounded-xl transition-all hover:bg-white/10 bg-white/5 text-accent1 border border-accent1/20 group/phone-link"
                      >
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent1 group-hover/phone-link:scale-110 transition-transform" />
                        <span className="text-lg md:text-xl font-mono font-bold whitespace-nowrap tracking-tight" dir="ltr">+972 52-950-2079</span>
                      </a>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Logo (Centered on mobile) */}
          <button 
            onClick={() => scrollToSection("hero", "start")}
            className="flex items-center justify-center order-2 md:order-none"
          >
            <img 
              src={PANDA_LOGO} 
              alt="Panda Custom Logo" 
              className="h-5 md:h-8 w-auto object-contain invert hover:brightness-110 active:scale-95 transition-all"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id, link.id === "contact" ? "center" : "start")}
                className={`font-display text-sm transition-all duration-300 ${
                  activeSection === link.id ? "text-accent1" : "text-white hover:text-accent1/70"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 order-3 md:order-none">
            <button 
              onClick={() => scrollToSection("contact", "center")}
              className="bg-accent1 text-background px-4 md:px-8 py-2 md:py-3 rounded-full text-[11px] md:text-sm font-display font-bold hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shadow-lg shadow-accent1/20"
            >
              {t.nav.startProject}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <GlitchHero logo={PANDA_LOGO} lang={lang} />
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 overflow-x-hidden [backface-visibility:hidden] [transform:translateZ(0)]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-8"
          >
            <div className={`flex flex-col mb-20 gap-6 ${lang === 'he' ? 'items-start text-right' : 'items-start text-left'}`}>
              <div className="flex flex-col items-start gap-4">
                <span className="font-mono text-accent1 text-[0.7rem] tracking-[0.2em] uppercase border border-outline-variant px-3 py-1.5 rounded-full block w-fit">
                  {t.portfolio.tag}
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">{t.portfolio.title}</h2>
              </div>
              <p className={`text-white/80 font-sans text-lg max-w-2xl ${lang === 'he' ? 'ml-auto' : 'mr-auto'}`}>
                {t.portfolio.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {loadingProjects ? (
                // Skeleton loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-64 rounded-[20px] bg-surface/50 animate-pulse border border-outline-variant" />
                ))
              ) : projects.length > 0 ? (
                projects.map((project, index) => {
                  const translatedProject = t.portfolio.projects[index] || {};
                  return (
                    <GlassCard 
                      key={project.id}
                      image={project.imageUrl}
                      title={translatedProject.title || project.title}
                      subtitle={translatedProject.subtitle || project.subtitle}
                      description=""
                    />
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-outline-variant rounded-3xl bg-surface/20">
                  <p className="text-white/50 font-mono text-sm uppercase tracking-widest mb-4">No Projects Found</p>
                  <p className="text-white/30 text-xs max-w-md mx-auto">
                    Please ensure your Prismic repository "panda" has documents of type "assets" and is set to Public access.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent my-12" />

        {/* Services Section */}
        <section id="services" className="py-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-8"
          >
            <div className="text-center mb-20">
              <div className="flex flex-col items-center gap-4 mb-8">
                <span className="font-mono text-accent1 text-[0.7rem] tracking-[0.2em] uppercase border border-outline-variant px-3 py-1.5 rounded-full block w-fit">
                  {t.services.tag}
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">{t.services.title}</h2>
              </div>
              <p className="text-white/80 font-sans text-lg max-w-2xl mx-auto">
                {t.services.desc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.plans.map((plan: any) => (
                <PricingCard 
                  key={plan.title}
                  {...plan}
                  onCtaClick={handleServiceClick}
                  lang={lang}
                />
              ))}
            </div>

            <div className="mt-24 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                <div className="space-y-4">
                  <h3 className={`font-display text-xl font-bold text-white flex items-center justify-center gap-2 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-accent1">💡</span> {t.services.savingsTitle}
                  </h3>
                  <p className="text-white/80 font-sans leading-relaxed">
                    {t.services.savingsDesc}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className={`font-display text-xl font-bold text-white flex items-center justify-center gap-2 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-accent1">💡</span> {t.services.storageTitle}
                  </h3>
                  <p className="text-white/80 font-sans leading-relaxed">
                    {t.services.storageDesc}
                  </p>
                  <p className="text-accent1/70 font-sans text-sm italic">
                    {t.services.storageNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent my-12" />

        {/* Why Website Section */}
        <section id="why-website" className="py-32 bg-surface/20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-8 text-center"
          >
            <div className="flex flex-col items-center gap-4 mb-16">
              <span className="font-mono text-accent1 text-[0.7rem] tracking-[0.2em] uppercase border border-outline-variant px-3 py-1.5 rounded-full block w-fit">
                {t.whyWebsite.tag}
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">{t.whyWebsite.title}</h2>
              <p className="text-lg md:text-xl text-white/80 font-sans italic max-w-2xl px-4">
                {t.whyWebsite.footer}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.whyWebsite.items.map((item, i) => (
                <div key={i} className={`p-8 bg-surface/40 border border-outline-variant rounded-3xl hover:border-accent1/30 transition-all ${lang === 'he' ? 'text-right' : 'text-left'}`}>
                  <TrendingUp className={`w-8 h-8 text-accent1 mb-6 ${lang === 'he' ? 'ml-auto' : 'mr-auto'}`} />
                  <h3 className="font-display text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent my-12" />

        {/* About Us */}
        <section id="about" className="py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24 items-center"
            >
              <div className={lang === 'he' ? 'text-right' : 'text-left'}>
                <span className={`font-mono text-accent1 text-[0.7rem] tracking-[0.2em] uppercase border border-outline-variant px-3 py-1.5 rounded-full block mb-8 w-fit ${lang === 'he' ? 'ml-auto' : 'mr-auto'}`}>
                  {t.about.tag}
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-10 tracking-tighter">{t.about.title}</h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-10 font-['Heebo'] font-medium italic">
                  {t.about.mainText}
                </p>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-sans">
                  {t.about.subText}
                  <a href="#contact" className="text-accent1 underline underline-offset-4 font-bold">
                    {t.about.linkText}
                  </a>
                </p>
              </div>

              <div className={`flex justify-center ${lang === 'he' ? 'lg:justify-end' : 'lg:justify-start'}`}>
                <img 
                  src={PANDA_LOGO} 
                  alt="Panda Custom Logo About" 
                  className="h-auto w-full max-w-[250px] md:max-w-[350px] lg:max-w-full invert opacity-90 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="pt-12">
          <TextScramble lang={lang} />
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent my-12" />

        {/* Contact Us Section */}
        <section id="contact" className="py-32 relative overflow-hidden">
          <div className={`max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 ${lang === 'he' ? 'text-right' : 'text-left'}`}>
            <motion.div
              initial={{ opacity: 0, x: lang === 'he' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className={`font-mono text-accent1 text-[0.7rem] tracking-[0.2em] uppercase border border-outline-variant px-3 py-1.5 rounded-full block mb-6 w-fit ${lang === 'he' ? 'ml-auto' : 'mr-auto'}`}>
                {t.contact.tag}
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tighter">{t.contact.title}</h2>
              <p className="text-white/80 mb-12 font-mono italic">{t.contact.desc}</p>
              <div className={`space-y-6 flex flex-col ${lang === 'he' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-4 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Mail className="w-6 h-6 text-accent1" />
                  <span className="font-mono">hello@pandacustom.co.il</span>
                </div>
                <div className={`flex items-center gap-4 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <MapPin className="w-6 h-6 text-accent1" />
                  <span className="font-mono">{t.contact.location}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-surface p-10 rounded-3xl border border-outline-variant backdrop-blur-xl shadow-2xl shadow-black/50"
            >
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                const messageToSend = contactMessage.trim() || t.whyWebsite.whatsappDefault;
                const whatsappUrl = `https://wa.me/972529502079?text=${encodeURIComponent(messageToSend)}`;
                window.open(whatsappUrl, '_blank');
              }}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-accent1 font-mono">{t.contact.labelMessage}</label>
                  <textarea 
                    className={`w-full bg-transparent border-b border-outline-variant focus:border-accent1 transition-colors py-3 px-0 outline-none text-foreground font-mono resize-none ${lang === 'he' ? 'text-right' : 'text-left'}`} 
                    placeholder={t.contact.placeholderMessage} 
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-accent1 text-background font-bold py-4 rounded-xl mt-4 hover:opacity-90 transition-opacity active:scale-[0.98] font-mono uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.969c0 2.112.551 4.171 1.597 6.013L0 24l6.193-1.623c1.777.969 3.79 1.481 5.851 1.482h.005c6.604 0 11.967-5.363 11.97-11.97a11.815 11.815 0 00-3.414-8.474"/>
                  </svg>
                  {t.contact.send}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent my-12" />
      </main>

      <footer className="w-full border-t border-outline-variant bg-background/50 backdrop-blur-md relative z-10 pb-40">
        <div className={`flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 gap-6 max-w-7xl mx-auto font-mono text-xs ${lang === 'he' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3">
            <img 
              src={PANDA_LOGO} 
              alt="Panda Logo Footer" 
              className="h-7 w-auto invert opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className={`flex flex-col gap-2 ${lang === 'he' ? 'items-end' : 'items-start'}`}>
            <div className={`flex gap-8 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollToSection(link.id, link.id === "contact" ? "center" : "start")}
                  className="text-white/80 hover:text-accent1 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <p className="text-white/70 mt-4">{t.footer.desc1}</p>
            <p className="text-white/70">{t.footer.desc2}</p>
          </div>
          <div className="text-white/80">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  </div>
);
}
