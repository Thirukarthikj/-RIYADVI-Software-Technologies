'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/siteData';
import { SectionHeader } from '@/components/ui/SharedComponents';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = ['All'];
    blogPosts.forEach((post) => {
      if (post.category && !cats.includes(post.category)) {
        cats.push(post.category);
      }
    });
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <div className="pt-28 pb-20">
      {/* Hero Section */}
      <section className="container-custom py-12 md:py-16 text-center">
        <SectionHeader
          tag="THOUGHT LEADERSHIP & TECH INSIGHTS"
          title="Engineering Insights, Product Strategy & Innovation"
          description="In-depth analysis, architectural deep-dives, and technology roadmaps curated by the Riyadvi Software Technologies engineering team."
          goldWords={['Insights,', 'Strategy', 'Innovation']}
        />

        {/* Search Bar & Category Filter */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or technology..."
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-dark-200 border border-dark-400 text-white placeholder-neutral-500 focus:outline-none focus:border-gold transition-colors text-sm shadow-xl"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs px-2 py-1 rounded bg-dark-400"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-accent uppercase tracking-wider font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold text-dark font-bold shadow-lg shadow-gold/20'
                    : 'bg-dark-300 text-neutral-400 hover:text-white hover:bg-dark-400 border border-dark-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article (Shown when no search query active) */}
      {!searchQuery && selectedCategory === 'All' && featuredPost && (
        <section className="container-custom mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-dark-200 via-dark-300 to-dark-100 border border-gold/30 relative overflow-hidden group hover:border-gold/60 transition-all shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-accent font-bold uppercase tracking-wider bg-gold text-dark">
                Featured Article
              </span>
              <span className="text-xs text-gold/80 font-accent uppercase">
                {featuredPost.category}
              </span>
              <span className="text-neutral-500 text-xs">•</span>
              <span className="text-neutral-400 text-xs">{featuredPost.readTime}</span>
              <span className="text-neutral-500 text-xs">•</span>
              <span className="text-neutral-400 text-xs">{featuredPost.publishedAt}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-heading font-black text-white group-hover:text-gold transition-colors mb-4 max-w-3xl leading-tight">
              <Link href={`/blog/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h2>

            <p className="text-neutral-300 text-base md:text-lg mb-6 max-w-3xl leading-relaxed">
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dark-500">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-xs font-bold text-gold">
                  RT
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{featuredPost.author}</div>
                  <div className="text-[10px] text-neutral-400">Engineering Staff</div>
                </div>
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="btn-primary text-xs !py-2.5 !px-6"
              >
                Read Full Deep Dive →
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="container-custom">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-dark-500">
          <div className="text-sm text-neutral-400 font-accent uppercase tracking-wider">
            Showing <span className="text-gold font-bold">{filteredPosts.length}</span> Articles
          </div>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs text-gold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-dark-200/50 rounded-3xl border border-dark-500">
            <span className="text-4xl block mb-3">📰</span>
            <h3 className="text-lg font-heading font-bold text-white mb-2">
              No articles found
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
              We couldn&apos;t find any articles matching your search query. Try broadening your terms or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn-secondary text-xs"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="card-glow rounded-3xl p-6 bg-dark-200 border border-dark-400 flex flex-col justify-between group hover:border-gold/40 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="px-3 py-1 rounded-full bg-dark-400 text-gold font-accent uppercase font-semibold text-[10px] tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-neutral-500 text-[11px] font-accent">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-gold transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-neutral-400 bg-dark-300 px-2 py-0.5 rounded border border-dark-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-dark-400 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 text-[11px]">
                      {post.publishedAt}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-gold font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                    >
                      Read Article <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / CTA Section */}
      <section className="container-custom mt-20">
        <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-r from-dark-300 via-dark-200 to-dark-300 border border-gold/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-accent font-bold uppercase tracking-widest text-gold mb-2 block">
              STAY AHEAD OF THE CURVE
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-4">
              Get Architectural Insights & Tech Trends Delivered
            </h3>
            <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
              Join 5,000+ technology leaders and CTOs receiving our monthly teardown of emerging web technologies, 3D graphics, and digital scale strategies.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to Riyadvi Tech Insights!');
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your executive email..."
                className="flex-1 px-4 py-3 rounded-xl bg-dark-100 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold"
              />
              <button type="submit" className="btn-primary text-xs whitespace-nowrap !py-3 !px-6">
                Subscribe Free
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
