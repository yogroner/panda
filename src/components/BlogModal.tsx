import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, isOpen, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-outline-variant rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-10 border-b border-outline-variant flex items-center justify-between flex-row-reverse sticky top-0 bg-surface/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="p-3 bg-accent1/10 rounded-2xl text-accent1">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{post.title}</h2>
                  <div className="flex items-center gap-2 text-secondary font-mono text-[10px] uppercase tracking-wider justify-end mt-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('he-IL')}
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-secondary hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 text-right">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-invert prose-lg max-w-none">
                  {post.content.split('\n').map((paragraph, i) => (
                    paragraph.trim() ? (
                      <p key={i} className="text-white/80 leading-relaxed mb-6 font-sans text-lg">
                        {paragraph}
                      </p>
                    ) : <br key={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-outline-variant bg-surface/50 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-accent1 text-background font-bold rounded-full hover:opacity-90 transition-opacity font-mono text-sm uppercase tracking-widest"
              >
                סגור קריאה
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
