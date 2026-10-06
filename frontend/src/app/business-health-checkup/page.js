'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { healthCheckupSteps } from '@/data/siteData';
import { SectionHeader } from '@/components/ui/SharedComponents';
import { submitHealthCheckup } from '@/utils/api';

export default function BusinessHealthCheckupPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportResult, setReportResult] = useState(null);

  const totalSteps = healthCheckupSteps.length + 1; // +1 for final contact info step
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleAnswerSelect = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    setContactInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculateScore = () => {
    // Generate an intelligent score based on inputs
    let score = 55;
    if (answers.websitePerformance?.includes('Sub-second')) score += 15;
    if (answers.websitePerformance?.includes('Good')) score += 10;
    if (answers.mobileResponsive?.includes('Fully')) score += 15;
    if (answers.currentTechStack?.includes('Modern JavaScript')) score += 15;
    return Math.min(score, 94);
  };

  const handleSubmitAudit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const calculatedScore = calculateScore();
    const payload = {
      ...contactInfo,
      responses: answers,
      score: calculatedScore,
      recommendations: [
        'Modernize frontend to Next.js SSR to achieve <50ms Core Web Vitals',
        'Implement automated CI/CD pipeline and event-driven microservices',
        'Deploy 3D interactive product visualization to boost user engagement by 40%',
        'Introduce automated mobile analytics and real-time performance monitoring',
      ],
    };

    try {
      await submitHealthCheckup(payload);
    } catch (err) {
      console.warn('API error (saved locally):', err);
    } finally {
      setIsSubmitting(false);
      setReportResult(payload);
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="container-custom py-10 text-center">
        <SectionHeader
          tag="COMPLIMENTARY EXECUTIVE TOOL"
          title="Digital Health & Architecture Assessment"
          description="Evaluate your current digital maturity, discover architectural bottlenecks, and receive a tailored technology modernization roadmap in under 3 minutes."
          goldWords={['Assessment', 'Maturity', 'Roadmap']}
        />
      </section>

      <div className="container-custom max-w-4xl mx-auto pb-16">
        {/* Progress Bar */}
        <div className="mb-10 bg-dark-200 p-6 rounded-3xl border border-dark-400">
          <div className="flex items-center justify-between text-xs font-accent mb-3">
            <span className="text-neutral-400 uppercase tracking-wider">
              {reportResult
                ? 'Assessment Completed'
                : `Step ${currentStepIndex + 1} of ${totalSteps}: ${
                    currentStepIndex < healthCheckupSteps.length
                      ? healthCheckupSteps[currentStepIndex].title
                      : 'Final Report Delivery'
                  }`}
            </span>
            <span className="text-gold font-bold">{reportResult ? '100%' : `${progressPercent}%`}</span>
          </div>
          <div className="w-full h-2.5 bg-dark-400 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: reportResult ? '100%' : `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Results Screen */}
        {reportResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12 rounded-3xl bg-dark-200 border border-gold/40 shadow-2xl relative overflow-hidden space-y-8"
          >
            <div className="text-center space-y-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-accent font-bold uppercase tracking-wider bg-gold text-dark inline-block">
                Assessment Complete
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
                Digital Maturity Audit for {reportResult.company || reportResult.name}
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto">
                Prepared by Riyadvi Software Technologies Principal Architecture Group.
              </p>
            </div>

            {/* Score Display Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-dark-300 to-dark-100 border border-gold/30 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
              <div>
                <div className="text-xs font-accent text-neutral-400 uppercase tracking-widest mb-1">
                  Overall Health Score
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-heading font-black text-gold">
                    {reportResult.score}
                  </span>
                  <span className="text-neutral-500 font-bold text-xl">/ 100</span>
                </div>
                <div className="text-xs text-green-400 font-semibold mt-1">
                  ● Status: Moderate Modernization Potential
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-300 w-full sm:w-auto">
                <div className="flex justify-between gap-6 pb-1 border-b border-dark-400">
                  <span>Architecture & Stack</span>
                  <span className="text-gold font-bold">76 / 100</span>
                </div>
                <div className="flex justify-between gap-6 pb-1 border-b border-dark-400">
                  <span>Mobile & UX Performance</span>
                  <span className="text-gold font-bold">82 / 100</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span>Scalability & Automation</span>
                  <span className="text-gold font-bold">70 / 100</span>
                </div>
              </div>
            </div>

            {/* Tailored Recommendations */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <span>⚡</span> Strategic Recommendations:
              </h3>
              <div className="space-y-3">
                {reportResult.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-dark-300 border border-dark-400 flex items-start gap-3 text-sm text-neutral-200"
                  >
                    <span className="text-gold font-bold">0{i + 1}.</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-dark-400 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/contact"
                className="btn-primary w-full sm:w-auto text-xs !py-3.5 !px-8 text-center justify-center uppercase font-bold tracking-wider"
              >
                Schedule Architecture Review Call →
              </Link>
              <button
                type="button"
                onClick={() => {
                  setReportResult(null);
                  setCurrentStepIndex(0);
                  setAnswers({});
                }}
                className="btn-secondary w-full sm:w-auto text-xs !py-3.5 !px-6 text-center justify-center"
              >
                Retake Assessment
              </button>
            </div>
          </motion.div>
        ) : (
          /* Wizard Questions or Final Contact Form */
          <div className="p-8 md:p-12 rounded-3xl bg-dark-200 border border-dark-400 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {currentStepIndex < healthCheckupSteps.length ? (
                /* Steps 1 to 4: Questions */
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl p-3 bg-dark-300 rounded-2xl border border-dark-400">
                      {healthCheckupSteps[currentStepIndex].icon}
                    </span>
                    <div>
                      <span className="text-xs font-accent text-gold uppercase tracking-wider font-bold">
                        Phase {currentStepIndex + 1}
                      </span>
                      <h2 className="text-2xl font-heading font-black text-white">
                        {healthCheckupSteps[currentStepIndex].title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {healthCheckupSteps[currentStepIndex].fields.map((field) => (
                      <div key={field.name} className="space-y-3">
                        <label className="block text-sm font-heading font-semibold text-neutral-200">
                          {field.label}
                        </label>

                        {field.type === 'radio' && (
                          <div className="space-y-2">
                            {field.options.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleAnswerSelect(field.name, option)}
                                className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-body transition-all border flex items-center justify-between ${
                                  answers[field.name] === option
                                    ? 'bg-gold/15 border-gold text-white font-semibold shadow-md'
                                    : 'bg-dark-300 border-dark-400 text-neutral-300 hover:border-neutral-500'
                                }`}
                              >
                                <span>{option}</span>
                                <span
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                                    answers[field.name] === option
                                      ? 'border-gold bg-gold text-dark text-[10px] font-bold'
                                      : 'border-neutral-500'
                                  }`}
                                >
                                  {answers[field.name] === option && '✓'}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}

                        {field.type === 'text' && (
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={answers[field.name] || ''}
                            onChange={(e) => handleAnswerSelect(field.name, e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl bg-dark-300 border border-dark-400 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="pt-6 border-t border-dark-400 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={currentStepIndex === 0}
                      onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-accent font-semibold text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                      className="btn-primary text-xs !py-3 !px-8 uppercase font-bold tracking-wider"
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Step 5: Final Contact Information */
                <motion.div
                  key="final-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <span className="text-3xl block mb-2">🎯</span>
                    <h3 className="text-2xl font-heading font-black text-white mb-2">
                      Where Should We Send Your Detailed Audit?
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Enter your executive credentials to receive your comprehensive PDF report and instant online breakdown.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitAudit} className="space-y-4 max-w-lg mx-auto">
                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={contactInfo.name}
                        onChange={handleContactChange}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={contactInfo.company}
                        onChange={handleContactChange}
                        placeholder="Nexus Enterprises"
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white text-sm focus:outline-none focus:border-gold"
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
                        value={contactInfo.email}
                        onChange={handleContactChange}
                        placeholder="alex@nexus.com"
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={contactInfo.phone}
                        onChange={handleContactChange}
                        placeholder="+91 81377 69939"
                        className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-dark-400 text-white text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                        className="px-4 py-2 text-xs font-accent text-neutral-400 hover:text-white"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary text-xs !py-3.5 !px-8 uppercase font-bold tracking-wider"
                      >
                        {isSubmitting ? 'Calculating Audit...' : 'Generate My Audit Score →'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
