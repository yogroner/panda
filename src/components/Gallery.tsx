import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";

interface GalleryImage {
  id: string;
  name: string;
  url: string;
}

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gallery");
      const data = await response.json();
      
      if (response.ok) {
        setImages(data);
        setError(null);
      } else {
        setError(data.error || "Failed to load images");
      }
    } catch (err) {
      setError("Connection error. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section id="gallery" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <span className="font-mono text-accent2 text-[0.7rem] tracking-[0.2em] uppercase border border-accent2/20 px-3 py-1.5 rounded-full block w-fit">
            05 — GALLERY
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">פרויקטים נוספים</h2>
          <p className="text-secondary font-mono italic max-w-2xl">
            גלריה דינמית המתעדכנת ישירות מתיקיית ה-Google Drive שלנו.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 text-accent1 animate-spin" />
            <p className="font-mono text-sm text-secondary">טוען תמונות מהענן...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 px-8 bg-surface/50 rounded-3xl border border-outline-variant text-center gap-4">
            <AlertCircle className="w-12 h-12 text-accent3" />
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold">אופס, משהו השתבש</h3>
              <p className="text-secondary font-mono text-sm max-w-md mx-auto">
                {error.includes("API Key") 
                  ? "יש להגדיר מפתח API של Google Drive כדי להציג את הגלריה הדינמית."
                  : error}
              </p>
            </div>
            <button 
              onClick={fetchImages}
              className="mt-4 px-6 py-2 bg-accent1/10 hover:bg-accent1/20 text-accent1 rounded-full transition-colors font-mono text-sm"
            >
              נסה שוב
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <ImageIcon className="w-12 h-12 text-secondary/30" />
            <p className="text-secondary font-mono">לא נמצאו תמונות בתיקייה.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface border border-outline-variant isolate"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white font-mono text-xs truncate">{image.name}</p>
                  </div>
                  
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 border border-white/10 rounded-inherit pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
