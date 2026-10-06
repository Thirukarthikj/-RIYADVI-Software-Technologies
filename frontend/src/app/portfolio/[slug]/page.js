'use client';
import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { portfolio, services } from '@/data/siteData';
import { SectionHeader, PortfolioCard } from '@/components/ui/SharedComponents';

export default function CaseStudyPage({ params }) {
  const { slug } = use(params);
  const project = portfolio.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center container-custom">
        <h1 className="font-heading font-black text-4xl text-white">Case Study Not Found</h1>
        <Link href="/portfolio" className="btn-primary mt-8 inline-flex">Back to Portfolio</Link>
      </div>
    );
  }

  const relatedServices = services.filter(s => project.services.includes(s.slug));
  const relatedProjects = portfolio.filter(p => p.slug !== slug && p.services.some(s => project.services.includes(s))).slice(0, 3);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 to-transparent" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tag mb-4 inline-block">
                {project.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tight"
              >
                {project.title}
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 flex flex-wrap gap-4">
                <span className="text-neutral-400 text-sm"><strong className="text-white">Client:</strong> {project.client}</span>
                <span className="text-neutral-400 text-sm"><strong className="text-white">Industry:</strong> {project.industry}</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="aspect-video bg-gradient-to-br from-dark-400 to-dark-600 rounded-2xl flex items-center justify-center"
            >
              <span className="text-6xl opacity-30">🏗️</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8">
              <span className="tag mb-4 inline-block">The Challenge</span>
              <p className="text-neutral-300 leading-relaxed">{project.challenge}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 border-gold/20">
              <span className="tag mb-4 inline-block">Our Solution</span>
              <p className="text-neutral-300 leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader tag="Measurable Impact" title="Results & Impact" goldWords={['Impact']} />
          <div className="grid md:grid-cols-3 gap-6">
            {project.results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="font-heading font-black text-4xl text-gradient-gold">{result.value}</div>
                <p className="text-neutral-400 text-sm mt-2 uppercase tracking-wider font-accent">{result.metric}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <SectionHeader tag="Tech Stack" title="Technologies Used" goldWords={['Technologies']} />
          <div className="flex flex-wrap gap-3 justify-center">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass px-5 py-3 rounded-xl text-sm text-neutral-300 font-accent font-medium card-hover"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionHeader tag="Services Used" title="Related Services" goldWords={['Services']} />
            <div className="flex flex-wrap gap-4 justify-center">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="glass rounded-xl px-6 py-4 card-hover text-center"
                >
                  <span className="text-2xl block mb-2">{service.icon}</span>
                  <span className="text-sm text-white font-accent font-semibold">{service.shortTitle}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-dark-200">
          <div className="container-custom">
            <SectionHeader tag="Explore More" title="Related Case Studies" goldWords={['Case Studies']} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p, i) => (
                <PortfolioCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase">
            Want Similar <span className="text-gradient-gold">Results?</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-lg mx-auto">
            Let&apos;s discuss how we can build a solution tailored to your business needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Start Your Project</Link>
            <Link href="/portfolio" className="btn-secondary">View More Work</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
