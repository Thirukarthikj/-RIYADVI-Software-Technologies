'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/siteData';

export default function BlogPostDetail({ params }) {
  const unwrappedParams = use(params);
  const post = blogPosts.find((p) => p.slug === unwrappedParams.slug);

  const [copied, setCopied] = useState(false);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Process markdown-like content into structured elements
  const renderContent = (content) => {
    if (!content) return null;
    const paragraphs = content.split('\n\n');

    return paragraphs.map((block, idx) => {
      if (block.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-2xl md:text-3xl font-heading font-black text-white mt-10 mb-4 tracking-tight border-b border-dark-400 pb-3"
          >
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="text-xl md:text-2xl font-heading font-bold text-gold-light mt-8 mb-3"
          >
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.includes('\n1. ') || block.startsWith('1. ')) {
        const items = block.split('\n').filter((l) => l.trim().length > 0);
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 my-4 text-neutral-300">
            {items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                <span className="font-medium text-white">
                  {item.replace(/^\d+\.\s*/, '')}
                </span>
              </li>
            ))}
          </ol>
        );
      }
      if (block.includes('\n- ') || block.startsWith('- ')) {
        const items = block.split('\n').filter((l) => l.trim().length > 0);
        return (
          <ul key={idx} className="space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-neutral-300">
                <span className="text-gold mt-1">▸</span>
                <span>{item.replace(/^-\s*/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-neutral-300 text-base md:text-lg leading-relaxed mb-6 font-body">
          {block}
        </p>
      );
    });
  };

  return (
    <article className="pt-28 pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="container-custom py-6">
        <div className="flex items-center gap-2 text-xs font-accent text-neutral-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">
            Blog & Insights
          </Link>
          <span>/</span>
          <span className="text-gold truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="container-custom py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-accent font-bold uppercase tracking-wider bg-gold text-dark">
              {post.category}
            </span>
            <span className="text-neutral-400 text-xs font-accent">
              {post.readTime}
            </span>
            <span className="text-neutral-500 text-xs">•</span>
            <span className="text-neutral-400 text-xs font-accent">
              Published on {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-body">
            {post.excerpt}
          </p>

          {/* Author and Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-dark-400">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold to-gold-dark flex items-center justify-center font-bold text-dark text-sm shadow-md">
                RT
              </div>
              <div>
                <div className="font-heading font-bold text-white text-sm">
                  {post.author}
                </div>
                <div className="text-xs text-neutral-400 font-accent">
                  Senior Engineering & Product Team
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-dark-300 hover:bg-dark-400 text-xs text-neutral-300 border border-dark-400 transition-colors flex items-center gap-1.5"
              >
                <span>🔗</span>
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Article Body */}
      <div className="container-custom max-w-3xl mx-auto py-10">
        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-dark-400">
            <h4 className="text-xs font-accent uppercase tracking-widest text-neutral-400 mb-3">
              Topics Covered
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-dark-300 text-gold-light text-xs font-accent border border-dark-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/blog"
            className="text-xs font-accent font-semibold text-gold hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Back to all articles
          </Link>
          <Link
            href="/contact"
            className="btn-primary text-xs !py-2 !px-4"
          >
            Discuss a Project with us →
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="container-custom mt-20 pt-16 border-t border-dark-400">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-accent font-bold uppercase tracking-widest text-gold mb-2 block">
              CONTINUE READING
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-white">
              Related Articles & Engineering Guides
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="card-glow p-6 rounded-2xl bg-dark-200 border border-dark-400 flex flex-col justify-between group hover:border-gold/50 transition-all"
              >
                <div>
                  <span className="text-[10px] uppercase font-accent font-bold text-gold px-2 py-0.5 rounded bg-dark-300 inline-block mb-3">
                    {related.category}
                  </span>
                  <h4 className="font-heading font-bold text-white group-hover:text-gold transition-colors text-base mb-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {related.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-dark-400 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>{related.readTime}</span>
                  <span className="text-gold font-semibold">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
