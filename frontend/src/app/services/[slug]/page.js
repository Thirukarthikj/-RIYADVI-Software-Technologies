'use client';
import { use } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { services, portfolio } from '@/data/siteData';
import { SectionHeader, PortfolioCard, ServiceCard } from '@/components/ui/SharedComponents';

const ServiceScene = dynamic(() => import('@/components/3d/ServiceScene'), { ssr: false });

export default function ServiceDetailPage({ params }) {
  const { slug } = use(params);
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center container-custom">
        <h1 className="font-heading font-black text-4xl text-neutral-100">Service Not Found</h1>
        <Link href="/services" className="btn-primary mt-8 inline-flex">Back to Services</Link>
      </div>
    );
  }

  const relatedProjects = portfolio.filter(p => p.services.includes(service.slug)).slice(0, 3);
  const otherServices = services.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 to-transparent" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="tag mb-6 inline-block"
              >
                {service.icon} {service.shortTitle}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading font-black text-3xl md:text-5xl text-neutral-100 uppercase tracking-tight leading-tight"
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-neutral-400 text-base leading-relaxed"
              >
                {service.heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <Link href="/contact" className="btn-primary">
                  Get a Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/portfolio" className="btn-secondary">
                  View Case Studies
                </Link>
              </motion.div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 border-t border-dark-500 pt-6">
                {service.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="font-heading font-bold text-xl text-gold">{stat.value}</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ServiceScene serviceSlug={service.slug} color={service.color} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <span className="tag mb-4 inline-block">The Challenge</span>
              <h3 className="font-heading font-bold text-2xl text-neutral-100 mb-4">Common Problems</h3>
              <ul className="space-y-3">
                {[
                  'Legacy systems holding back business growth',
                  'Poor user experience leading to low conversions',
                  'Inability to scale with increasing demand',
                  'Lack of integration between business systems',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm">
                    <span className="text-red-400 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border-gold/20"
            >
              <span className="tag mb-4 inline-block">Our Solution</span>
              <h3 className="font-heading font-bold text-2xl text-neutral-100 mb-4">How We Solve It</h3>
              <ul className="space-y-3">
                {service.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm">
                    <span className="text-gold mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            tag="Capabilities"
            title="Key Features & Capabilities"
            goldWords={['Capabilities']}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-5 card-hover"
              >
                <div className="w-8 h-8 rounded-lg bg-gold-muted flex items-center justify-center text-gold text-sm mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-neutral-300 text-sm font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <SectionHeader
            tag="Engineering Process"
            title="Our Development Process"
            goldWords={['Process']}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 card-hover relative"
              >
                <span className="absolute top-4 right-4 font-heading font-black text-4xl text-dark-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-heading font-bold text-neutral-100 text-lg mb-2">{step.step}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            tag="Technology Stack"
            title="Technologies We Use"
            goldWords={['Technologies']}
          />

          <div className="flex flex-wrap gap-3 justify-center">
            {service.technologies.map((tech, i) => (
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

      {/* Industry Use Cases */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <SectionHeader
            tag="Industry Applications"
            title="Industry Use Cases"
            goldWords={['Use Cases']}
          />

          <div className="flex flex-wrap gap-4 justify-center">
            {service.industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl px-6 py-4 text-center card-hover min-w-[120px]"
              >
                <span className="text-neutral-300 text-sm font-accent font-medium">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Portfolio */}
      {relatedProjects.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionHeader
              tag="Related Work"
              title="Related Case Studies"
              goldWords={['Case Studies']}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project, i) => (
                <PortfolioCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-neutral-100 uppercase">
            Ready to Build Your{' '}
            <span className="text-gradient-gold">{service.shortTitle}</span> Solution?
          </h2>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
            Let&apos;s discuss how our {service.shortTitle.toLowerCase()} expertise can transform your business.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get a Quote
            </Link>
            <Link href="/business-health-checkup" className="btn-secondary">
              Business Health Checkup
            </Link>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            tag="Explore More"
            title="Other Services"
            goldWords={['Services']}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
