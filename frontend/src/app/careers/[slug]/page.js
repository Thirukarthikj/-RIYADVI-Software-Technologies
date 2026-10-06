'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { careers } from '@/data/siteData';
import { submitApplication } from '@/utils/api';

export default function JobDetailPage({ params }) {
  const unwrappedParams = use(params);
  const job = careers.find((j) => j.slug === unwrappedParams.slug);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    linkedin: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!job) {
    notFound();
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('jobTitle', job.title);
      data.append('jobSlug', job.slug);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('portfolio', formData.portfolio);
      data.append('linkedin', formData.linkedin);
      data.append('coverLetter', formData.coverLetter);
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      const res = await submitApplication(data);
      if (res && res.success) {
        setSubmitSuccess(true);
      } else {
        throw new Error(res.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'There was an issue sending your application. Please check your fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Breadcrumb */}
      <div className="container-custom py-6">
        <div className="flex items-center gap-2 text-xs font-accent text-neutral-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/careers" className="hover:text-gold transition-colors">
            Careers
          </Link>
          <span>/</span>
          <span className="text-gold truncate max-w-xs">{job.title}</span>
        </div>
      </div>

      {/* Job Header */}
      <header className="container-custom py-8">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-accent uppercase font-bold bg-gold text-dark">
              {job.department}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-accent uppercase font-semibold bg-dark-300 text-neutral-300 border border-dark-400">
              📍 {job.location}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-accent uppercase font-semibold bg-dark-300 text-neutral-300 border border-dark-400">
              ⏱️ {job.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-accent uppercase font-semibold bg-dark-300 text-gold border border-gold/30">
              🎯 {job.experience}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight mb-6">
            {job.title}
          </h1>

          <p className="text-lg text-neutral-300 leading-relaxed font-body">
            {job.description}
          </p>
        </div>
      </header>

      {/* Main Content Grid: Job Details vs Application Form */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Job Details */}
          <div className="lg:col-span-7 space-y-12">
            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="p-8 rounded-3xl bg-dark-200 border border-dark-400">
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-4">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                      <span className="text-gold font-bold mt-0.5">✓</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <section className="p-8 rounded-3xl bg-dark-200 border border-dark-400">
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  What We Look For (Requirements)
                </h3>
                <ul className="space-y-4">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                      <span className="text-gold font-bold mt-0.5">▸</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section className="p-8 rounded-3xl bg-dark-200 border border-dark-400">
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  What We Offer
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((ben, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-dark-300 border border-dark-400 flex items-center gap-3 text-xs text-neutral-300 font-medium">
                      <span className="text-base">🎁</span>
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-8 rounded-3xl bg-dark-200 border border-gold/30 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-accent font-bold uppercase tracking-widest text-gold mb-1 block">
                DIRECT APPLICATION
              </span>
              <h3 className="text-2xl font-heading font-black text-white mb-2">
                Apply for this Role
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill in your details below and our leadership team will respond within 48 hours.
              </p>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-dark-300 border border-gold text-center space-y-4"
                >
                  <span className="text-5xl block">🎉</span>
                  <h4 className="text-xl font-heading font-bold text-white">
                    Application Submitted!
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Thank you for applying to Riyadvi Software Technologies for the{' '}
                    <strong className="text-gold">{job.title}</strong> role. Our engineering leaders will review your profile.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({ name: '', email: '', phone: '', portfolio: '', linkedin: '', coverLetter: '' });
                      setResumeFile(null);
                    }}
                    className="btn-secondary text-xs !py-2 !px-4 mt-4"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/50 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Portfolio / GitHub
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://github.com/..."
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Upload Resume / CV (PDF, DOCX)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-300 border border-dark-400 text-neutral-400 text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-dark hover:file:bg-gold-light cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Why are you excited about this role?
                    </label>
                    <textarea
                      name="coverLetter"
                      rows={3}
                      value={formData.coverLetter}
                      onChange={handleChange}
                      placeholder="Brief note on your relevant experience..."
                      className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary text-xs !py-3.5 justify-center tracking-wider uppercase font-bold"
                  >
                    {submitting ? 'Submitting Application...' : 'Send Application →'}
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center">
                    🔒 We respect your privacy. Your information is kept strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
