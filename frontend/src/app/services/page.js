'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { services } from '@/data/siteData';
import { SectionHeader, ServiceCard } from '@/components/ui/SharedComponents';

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 to-transparent" />
        <div className="container-custom relative">
          <SectionHeader
            tag="End-to-End Technology Capabilities"
            title="End-to-End Technology Capabilities Crafted for Impact"
            description="From full-stack web capabilities to spatial AR experiences, we combine engineering rigor with user psychology at enterprise scale."
            goldWords={['Impact']}
          />

          {/* Capability highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['99.9% Availability Guarantee', 'OWASP Top 10 Hardened', 'Tier-1 Build Support'].map((item, i) => (
              <span key={i} className="glass px-4 py-2 rounded-lg text-xs text-neutral-300 font-accent">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Cadence */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            tag="Consistent Execution Pattern"
            title="The Riyadvi Delivery Cadence"
            description="A battle-tested 4-phase agile cadence: planned sprints, executed without variance, and delivered with code quality, time precision, and zero technical debt."
            goldWords={['Delivery Cadence']}
          />

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { phase: 'Phase 01', title: 'Architecture & Discovery', desc: 'We deconstruct business goals into atomic frontend and backend capabilities', icon: '🏗️' },
              { phase: 'Phase 02', title: 'Iterative Sprint Velocity', desc: 'Two-week development sprints with CI/CD pipeline integration', icon: '⚡' },
              { phase: 'Phase 03', title: 'Rigorous QA & Security', desc: 'Testing across unit, integration, e2e, and security compliance layers', icon: '🛡️' },
              { phase: 'Phase 04', title: 'Zero-Downtime Deployment', desc: 'Blue-green deployment with monitoring, alerting, and rollback automation', icon: '🚀' },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <span className="text-gold text-xs font-accent font-semibold uppercase tracking-wider">{phase.phase}</span>
                <h3 className="font-heading font-bold text-white text-lg mt-2 mb-3">{phase.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{phase.desc}</p>
                <span className="block text-3xl mt-4">{phase.icon}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <div className="glass rounded-3xl p-8 md:p-16 text-center">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase">
              Configure Your <span className="text-gradient-gold">Engagement</span>
            </h2>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
              Select primary deliverables to generate a tailored delivery cadence and cost dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Build a Custom IT Engagement
              </Link>
              <Link href="/business-health-checkup" className="btn-secondary">
                Take the Health Checkup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
