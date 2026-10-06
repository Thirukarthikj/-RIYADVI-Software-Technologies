'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services, stats, portfolio, technologies, transformationSteps, timeline, companyInfo } from '@/data/siteData';
import { SectionHeader, StatCard, GoldDivider, ServiceCard, PortfolioCard } from '@/components/ui/SharedComponents';

// Dynamically import 3D components to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });
const TechEcosystem = dynamic(() => import('@/components/3d/TechEcosystem'), { ssr: false });

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark-100 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-100/80 to-transparent z-[1]" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="tag mb-6 inline-block">
              Technology & Digital Solutions Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] uppercase tracking-tight"
          >
            Custom Software &{' '}
            <span className="text-gradient-gold">Digital Solutions</span>{' '}
            to Grow Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Web & App Development, UI/UX Design, and Business Strategy — all tailored to your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/contact" className="btn-primary">
              Book a Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore Our Solutions
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-dark-500 pt-8"
          >
            {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} label={stat.label} delay={1.2 + i * 0.1} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-accent">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ============ BUILT FOR GROWTH ============
function BuiltForGrowth() {
  return (
    <section className="section-padding bg-dark-200 relative overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          tag="Enterprise-Grade Solutions"
          title="Built for Business. Designed for Growth."
          description="From early-stage startups to established enterprises, we engineer digital solutions that scale with your ambitions, streamline operations, and accelerate revenue."
          goldWords={['Growth.']}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-6 text-center card-hover"
            >
              <div className="font-heading font-black text-3xl md:text-4xl text-gradient-gold">
                {stat.value}
              </div>
              <p className="text-neutral-400 text-xs mt-2 font-accent uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TRANSFORMATION SECTION ============
function TransformationSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          tag="Our Methodology"
          title="From Business Challenge to Business Growth."
          description="Our battle-tested methodology takes you from identifying bottlenecks to scaling solutions. Digital transformation isn't a project — it's a journey."
          goldWords={['Business Growth.']}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent" />

          {transformationSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative flex items-start gap-6 md:gap-12 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold glow-gold-sm z-10 mt-2" />

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <span className="text-gold font-accent font-bold text-sm">Step {step.step}</span>
                <h3 className="font-heading font-bold text-xl text-white mt-1">{step.title}</h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES SECTION ============
function ServicesSection() {
  return (
    <section className="section-padding bg-dark-200 relative overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          tag="End-to-End Technology Capabilities"
          title="Engineering & Digital Capabilities."
          description="From full-stack web capabilities to spatial AR experiences, we combine engineering rigor with user psychology at enterprise scale."
          goldWords={['Digital Capabilities.']}
        />

        {/* Service filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {['All Capabilities', 'Web & Cloud', 'Mobile & UI', 'Strategy', 'AR/VR/3D', 'Growth', 'Full Stack Support'].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-xs font-accent font-semibold transition-all ${
                i === 0 ? 'bg-gold text-dark' : 'bg-dark-400 text-neutral-400 hover:text-gold hover:bg-dark-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TECH ECOSYSTEM ============
function TechSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          tag="Technology Arsenal"
          title="The Technology Behind the Experience."
          description="We use a curated set of cutting-edge technologies to build scalable, performant, and future-proof digital solutions."
          goldWords={['Experience.']}
        />

        {/* 3D Visualization */}
        <TechEcosystem />

        {/* Tech Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-12">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4 text-center card-hover group cursor-default"
            >
              <span className="text-2xl block mb-2">{tech.icon}</span>
              <span className="text-[10px] text-neutral-400 group-hover:text-gold transition-colors font-accent font-medium">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PORTFOLIO PREVIEW ============
function PortfolioPreview() {
  const featured = portfolio.find(p => p.featured);

  return (
    <section className="section-padding bg-dark-200 relative overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          tag="Verified Client Architectures"
          title="Ideas We've Turned Into Digital Experiences."
          description="Explore verified digital transformations, high-performance platforms, and award-winning products built across industries."
          goldWords={['Digital Experiences.']}
        />

        {/* Featured Project */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="tag mb-4 inline-block">Featured Platinum Case Study</span>
                <h3 className="font-heading font-black text-2xl md:text-3xl text-white uppercase">{featured.title}</h3>
                <p className="text-neutral-400 mt-4 leading-relaxed">{featured.challenge}</p>
                <div className="flex gap-6 mt-6">
                  {featured.results.map((r, i) => (
                    <div key={i}>
                      <div className="font-heading font-bold text-xl text-gold">{r.value}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{r.metric}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/portfolio/${featured.slug}`}
                  className="inline-flex items-center gap-2 mt-6 text-gold font-accent font-semibold text-sm hover:gap-3 transition-all"
                >
                  View Complete Case Study
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="aspect-video bg-gradient-to-br from-dark-400 to-dark-600 rounded-xl flex items-center justify-center">
                <span className="text-6xl opacity-30">🧬</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.filter(p => !p.featured).slice(0, 6).map((project, i) => (
            <PortfolioCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="btn-secondary">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============ WHY RIYADVI ============
function WhyRiyadvi() {
  const reasons = [
    { title: 'Expertise', desc: 'Deep technical knowledge across web, mobile, AI, 3D, and cloud technologies.', icon: '🎯' },
    { title: 'End-to-End Solutions', desc: 'Strategy → Design → Development → Marketing → Optimization → Growth.', icon: '⚙️' },
    { title: 'Since 2021', desc: 'Proven track record with 150+ projects delivered across global markets.', icon: '📅' },
    { title: 'Business First', desc: 'We understand technology is a means to business growth, not just code.', icon: '📈' },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          tag="Why Executive Leaders Choose Us"
          title="Why Executive Leaders Partner With Us."
          description="We combine technology expertise with business understanding to deliver digital solutions that drive measurable growth."
          goldWords={['Partner With Us.']}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <span className="text-3xl mb-4 block">{reason.icon}</span>
              <h3 className="font-heading font-bold text-white text-lg mb-2">{reason.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Preview */}
        <div className="mt-16">
          <h3 className="font-heading font-bold text-xl text-white text-center mb-8">Our Engineering Trajectory</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-4 text-center min-w-[140px] card-hover"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="font-heading font-bold text-gold mt-2">{item.year}</div>
                <div className="text-neutral-400 text-xs mt-1">{item.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CTA SECTION ============
function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
      <div className="container-custom relative">
        <div className="glass rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="tag mb-6 inline-block">Ready to Transform?</span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
              Your Next Digital Move{' '}
              <span className="text-gradient-gold">Starts Here.</span>
            </h2>
            <p className="text-neutral-400 mt-6 max-w-xl mx-auto leading-relaxed">
              Partner with us to build your next breakthrough product. Let&apos;s discuss how technology 
              can accelerate your business growth.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Book a Free Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/software-project-planning-guide" className="btn-secondary">
                Download Project Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ MAIN PAGE ============
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BuiltForGrowth />
      <TransformationSection />
      <ServicesSection />
      <TechSection />
      <PortfolioPreview />
      <WhyRiyadvi />
      <CTASection />
    </>
  );
}
