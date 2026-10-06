'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/siteData';
import { SectionHeader, PortfolioCard } from '@/components/ui/SharedComponents';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(portfolio.map(p => p.category))];
  const filtered = filter === 'All' ? portfolio : portfolio.filter(p => p.category === filter);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 to-transparent" />
        <div className="container-custom relative">
          <SectionHeader
            tag="Verified Client Impact"
            title="Ideas We've Turned Into Digital Experiences"
            description="Explore verified digital transformations, high-performance platforms, and award-winning products built across industries."
            goldWords={['Digital Experiences']}
          />

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-accent font-semibold transition-all ${
                  filter === cat ? 'bg-gold text-dark' : 'bg-dark-400 text-neutral-400 hover:text-gold hover:bg-dark-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      {portfolio.find(p => p.featured) && (
        <section className="pb-12">
          <div className="container-custom">
            <span className="tag mb-6 inline-block">Featured Platinum Case Study</span>
            {(() => {
              const featured = portfolio.find(p => p.featured);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-8 md:p-12"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <span className="text-gold text-xs font-accent uppercase tracking-wider">{featured.industry}</span>
                      <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase mt-2">{featured.title}</h2>
                      <p className="text-neutral-400 mt-4 leading-relaxed">{featured.solution}</p>
                      <div className="flex gap-6 mt-6">
                        {featured.results.map((r, i) => (
                          <div key={i}>
                            <div className="font-heading font-bold text-2xl text-gold">{r.value}</div>
                            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{r.metric}</div>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/portfolio/${featured.slug}`}
                        className="inline-flex items-center gap-2 mt-6 text-gold font-accent font-semibold text-sm hover:gap-3 transition-all"
                      >
                        View Complete Case Study →
                      </Link>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-dark-400 to-dark-600 rounded-xl flex items-center justify-center">
                      <span className="text-6xl opacity-30">🧬</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.filter(p => !p.featured).map((project, i) => (
              <PortfolioCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '100%', label: 'On-Time Deployment', desc: 'Zero delays across all client engagements.' },
              { value: '+140%', label: 'Average Conversion Uplift', desc: 'Computed across live production deployments.' },
              { value: '15+', label: 'Industry Verticals', desc: 'From healthcare to fintech to education.' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="font-heading font-black text-4xl text-gradient-gold">{stat.value}</div>
                <h3 className="font-heading font-bold text-white mt-2">{stat.label}</h3>
                <p className="text-neutral-400 text-sm mt-2">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase">
            Ready to Build Your Next{' '}
            <span className="text-gradient-gold">Breakthrough Product?</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Discuss Your Project</Link>
            <Link href="/software-project-planning-guide" className="btn-secondary">Download Project Guide</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
