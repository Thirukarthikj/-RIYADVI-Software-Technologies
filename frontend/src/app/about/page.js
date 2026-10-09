'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { companyInfo, timeline, services } from '@/data/siteData';
import { SectionHeader } from '@/components/ui/SharedComponents';

const TechEcosystem = dynamic(() => import('@/components/3d/TechEcosystem'), { ssr: false });

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 to-transparent" />
        <div className="container-custom relative">
          <SectionHeader
            tag="About Riyadvi Software Technologies"
            title="Precision-Engineered Digital Solutions Since 2021"
            description="We are a technology and digital solutions partner that combines cutting-edge technology, world-class design, innovation, and business thinking to help businesses grow."
            goldWords={['Digital Solutions']}
          />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="tag mb-4 inline-block">Our Story</span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-neutral-100 mb-4">
                Founded With a Vision to{' '}
                <span className="text-gradient-gold">Transform Businesses</span>
              </h3>
              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  Riyadvi Software Technologies was founded in 2021 with a clear mission: to bridge 
                  the gap between technology and business growth. We saw businesses struggling with 
                  outdated digital infrastructure, poor user experiences, and missed opportunities.
                </p>
                <p>
                  Today, we serve clients across India, Australia, and beyond — delivering 
                  enterprise-grade web applications, mobile experiences, AI solutions, and 
                  immersive 3D experiences that drive real business results.
                </p>
                <p>
                  With over 150 projects delivered and a 98% client satisfaction rate, we&apos;re 
                  proud to be more than just a vendor — we&apos;re your technology partner.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TechEcosystem />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Vision',
                icon: '🔭',
                desc: 'To be the most trusted technology partner for businesses seeking digital transformation, recognized globally for innovation, quality, and measurable impact.',
              },
              {
                title: 'Mission',
                icon: '🎯',
                desc: 'To deliver exceptional digital solutions that consistently exceed client expectations, combining cutting-edge technology with deep business understanding.',
              },
              {
                title: 'Values',
                icon: '💎',
                desc: 'Innovation, Excellence, Integrity, Partnership, and Growth. These values guide every project, decision, and relationship we build.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 card-hover text-center"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-heading font-bold text-xl text-neutral-100 mb-4">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <SectionHeader
            tag="Our Journey"
            title="Milestones & Achievements"
            description="From startup to global recognition — our journey of continuous innovation."
            goldWords={['Achievements']}
          />

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative flex items-start gap-6 md:gap-12 mb-16 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-dark-300 border-2 border-gold flex items-center justify-center z-10 text-xl glow-gold-sm">
                  {item.icon}
                </div>

                <div className={`ml-20 md:ml-0 md:w-1/2 glass rounded-2xl p-6 ${
                  i % 2 === 0 ? 'md:mr-20 md:text-right' : 'md:ml-20'
                }`}>
                  <span className="font-heading font-black text-3xl text-gradient-gold">{item.year}</span>
                  <h3 className="font-heading font-bold text-lg text-neutral-100 mt-2">{item.title}</h3>
                  <p className="text-neutral-400 text-sm mt-2 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            tag="Recognition"
            title="Awards & Recognition"
            goldWords={['Recognition']}
          />
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 text-center glow-gold"
            >
              <span className="text-5xl mb-4 block">🏆</span>
              <h3 className="font-heading font-bold text-xl text-neutral-100">Star of Excellence Award</h3>
              <p className="text-gold font-accent text-sm mt-2">National Integrity Cultural Academy — 2024</p>
              <p className="text-neutral-400 text-sm mt-4 leading-relaxed">
                Recognized for outstanding contributions to technology innovation and digital excellence 
                in the software industry.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-dark-200">
        <div className="container-custom">
          <SectionHeader
            tag="Our Approach"
            title="How We Work"
            description="We follow a systematic, business-first approach to deliver solutions that not only work but drive measurable growth."
            goldWords={['Work']}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Business First', desc: 'We start by understanding your business, not your tech stack.', icon: '💼' },
              { title: 'Design Thinking', desc: 'Every solution begins with user-centered design and research.', icon: '🎨' },
              { title: 'Agile Delivery', desc: 'Sprint-based development with regular demos and feedback loops.', icon: '⚡' },
              { title: 'Quality Assurance', desc: 'Rigorous testing at every stage — unit, integration, and e2e.', icon: '✅' },
              { title: 'Continuous Improvement', desc: 'Post-launch optimization, monitoring, and iterative enhancement.', icon: '📈' },
              { title: 'Partnership', desc: 'We are not vendors. We are your long-term technology partners.', icon: '🤝' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 card-hover"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h4 className="font-heading font-bold text-neutral-100 mb-2">{item.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-neutral-100 uppercase">
            Ready to Partner With <span className="text-gradient-gold">Riyadvi?</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-lg mx-auto">
            Let&apos;s discuss how we can help your business grow through technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Book a Consultation</Link>
            <Link href="/portfolio" className="btn-secondary">View Our Work</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
