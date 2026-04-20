import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Loader2, Calendar, ArrowRight } from "lucide-react";
import { BlogModal } from "./BlogModal";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blog");
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data);
        setError(null);
      } else {
        setError(data.error || "Failed to load blog posts");
      }
    } catch (err) {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClosePost = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 text-accent1 animate-spin" />
        <p className="font-mono text-sm text-secondary">מעבד מאמרים מ-Google Docs...</p>
      </div>
    );
  }

  if (posts.length === 0 && !loading) return null;

  return (
    <section id="blog" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-end gap-4 mb-16 text-right">
          <span className="font-mono text-accent3 text-[0.7rem] tracking-[0.2em] uppercase border border-accent3/20 px-3 py-1.5 rounded-full block w-fit">
            06 — BLOG
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">הבלוג שלנו</h2>
          <p className="text-secondary font-mono italic max-w-2xl">
            תובנות, עדכונים ומאמרים מקצועיים שנכתבו ישירות ב-Google Docs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOpenPost(post)}
              className="group bg-surface/40 border border-outline-variant rounded-3xl p-8 flex flex-col gap-6 hover:bg-surface/60 transition-all duration-500 hover:border-accent1/30 cursor-pointer"
            >
              <div className="flex items-center justify-between flex-row-reverse">
                <div className="p-3 bg-accent1/10 rounded-2xl text-accent1">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 text-secondary font-mono text-[10px] uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('he-IL')}
                </div>
              </div>

              <div className="space-y-4 text-right">
                <h3 className="font-display text-2xl font-bold group-hover:text-accent1 transition-colors">
                  {post.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed line-clamp-3 font-sans">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-outline-variant flex justify-end">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPost(post);
                  }}
                  className="flex items-center gap-2 text-accent1 font-mono text-xs font-bold group/btn"
                >
                  קרא עוד
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <BlogModal 
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleClosePost}
        />
      </div>
    </section>
  );
};
