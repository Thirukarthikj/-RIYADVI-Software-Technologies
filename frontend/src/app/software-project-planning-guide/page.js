'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SharedComponents';
import { submitLeadMagnet } from '@/utils/api';

const chapters = [
  {
    num: '01',
    title: 'Scope Definition & Architecture Strategy',
    desc: 'How to transition from ambiguous product ideas to modular, battle-tested system architectures with zero technical debt.',
  },
  {
    num: '02',
    title: 'Technology Stack Decision Matrix 2025',
    desc: 'Objective comparison of Next.js, Node.js, React Native, Flutter, microservices vs monoliths, and serverless edge runtimes.',
  },
  {
    num: '03',
    title: 'Budgeting & Milestone Timeline Framework',
    desc: 'Realistic budgeting models, sprint capacity calculations, and cost-risk mitigations for custom software builds.',
  },
  {
    num: '04',
    title: 'Security, Compliance & Cloud Infrastructure',
    desc: 'Production readiness checklist: SOC2, GDPR, OAuth, AWS/GCP cost containment, and CI/CD pipelines.',
  },
  {
    num: '05',
    title: 'Engineering Vendor Selection Rubric',
    desc: 'The exact 18-point rubric CTOs use to vet development agencies and ensure engineering excellence.',
  },
];

export default function SoftwareProjectPlanningGuidePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitLeadMagnet({
        ...formData,
        guideName: 'The Enterprise Software Project Planning Guide 2025',
      });
      if (res && res.success) {
        setDownloadReady(true);
      } else {
        throw new Error(res.message || 'Submission error');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Unable to submit lead form. Please check your information.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Hero Header */}
      <section className="container-custom py-10 text-center">
        <SectionHeader
          tag="COMPLIMENTARY EXECUTIVE PLAYBOOK"
          title="The 2025 Software Project Planning Blueprint"
          description="A comprehensive, 38-page technical guide written by Riyadvi's Principal Architects to help founders, CTOs, and product leaders plan, budget, and execute modern software initiatives with zero failure rate."
          goldWords={['Software', 'Planning', 'Blueprint']}
        />
      </section>

      {/* Main Grid: Guide Breakdown & Form */}
      <div className="container-custom max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Guide Chapters */}
          <div className="lg:col-span-7 space-y-8">
            {/* Guide Highlights */}
            <div className="p-8 rounded-3xl bg-dark-200 border border-dark-400">
              <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">📘</span> What&apos;s Inside This Executive Guide:
              </h3>
              <div className="space-y-6">
                {chapters.map((ch) => (
                  <div key={ch.num} className="flex items-start gap-4 pb-4 border-b border-dark-400/50 last:border-0 last:pb-0">
                    <span className="text-lg font-heading font-black text-gold/80 bg-dark-300 px-3 py-1 rounded-xl shrink-0">
                      {ch.num}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-white text-base mb-1">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed font-body">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial / Social Proof */}
            <div className="p-8 rounded-3xl bg-dark-200/60 border border-gold/30 flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-xl text-gold shrink-0">
                ⭐
              </div>
              <div>
                <p className="text-sm italic text-neutral-300 mb-2">
                  &ldquo;This blueprint saved our engineering leadership months of false starts. The architecture selection rubric alone is worth tens of thousands in consulting fees.&rdquo;
                </p>
                <div className="text-xs font-accent text-gold font-bold">
                  — VP of Technology, Enterprise SaaS Partner
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-8 md:p-10 rounded-3xl bg-dark-200 border border-gold/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

              {downloadReady ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold mx-auto flex items-center justify-center text-3xl text-gold">
                    ⬇️
                  </div>
                  <h3 className="text-2xl font-heading font-black text-white">
                    Access Unlocked!
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Thank you, <strong className="text-gold">{formData.name}</strong>. Your copy has been dispatched to <strong>{formData.email}</strong>. You can also download it immediately below.
                  </p>

                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Simulated Download: "Riyadvi-Software-Project-Planning-Guide-2025.pdf" initiated!');
                    }}
                    className="btn-primary w-full text-xs !py-4 justify-center uppercase font-bold tracking-wider inline-flex items-center gap-2"
                  >
                    Download PDF Blueprint (38 Pages) 📄
                  </a>

                  <div className="pt-4 border-t border-dark-400">
                    <p className="text-xs text-neutral-400 mb-3">
                      Ready to discuss your project scope with our Principal Architect?
                    </p>
                    <Link
                      href="/contact"
                      className="btn-secondary text-xs !py-2.5 !px-5 inline-block"
                    >
                      Book 1-on-1 Consultation
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <>
                  <span className="text-[10px] font-accent font-bold uppercase tracking-widest text-gold mb-1 block">
                    INSTANT PDF DOWNLOAD
                  </span>
                  <h3 className="text-2xl font-heading font-black text-white mb-2">
                    Claim Your Free Copy
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6">
                    Enter your work email to receive immediate access to the 38-page guide.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
                        {errorMessage}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Sarah Connor"
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Inc"
                          className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                          Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder="CTO / Founder"
                          className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 81377 69939"
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-primary text-xs !py-4 justify-center uppercase font-bold tracking-wider mt-2"
                    >
                      {submitting ? 'Unlocking Guide...' : 'Get Instant Access (Free) →'}
                    </button>

                    <p className="text-[11px] text-neutral-500 text-center">
                      🔒 Zero spam guarantee. Direct download unlocks immediately.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
