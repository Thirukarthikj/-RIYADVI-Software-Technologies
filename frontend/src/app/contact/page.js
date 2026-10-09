'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { companyInfo, services } from '@/data/siteData';
import { SectionHeader } from '@/components/ui/SharedComponents';
import { submitContact, submitConsultation } from '@/utils/api';

const faqs = [
  {
    q: 'How fast can Riyadvi begin our engineering project?',
    a: 'Following our initial discovery and architecture alignment call, we typically assemble and initiate dedicated sprint teams within 5 to 7 business days.',
  },
  {
    q: 'What engagement models do you support?',
    a: 'We offer Fixed-Scope Milestone Deliveries, Dedicated Dedicated Engineering Pods (Time & Materials), and Long-Term Fractional CTO / Technology Advisory contracts.',
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Yes, absolutely. We sign bilateral NDAs before discussing any proprietary technical architecture or confidential business workflows.',
  },
  {
    q: 'What is included in the complimentary Consultation session?',
    a: 'A 45-minute architectural deep dive with a Principal Architect to review your technical challenges, review scalability bottlenecks, and recommend optimal tech stacks.',
  },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('consultation'); // 'consultation' | 'message'
  const [openFaq, setOpenFaq] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'web-development',
    budget: '$5k - $15k',
    timeline: '1-3 months',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      let res;
      if (activeTab === 'consultation') {
        res = await submitConsultation({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
        });
      } else {
        res = await submitContact({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: `Inquiry from ${formData.name}`,
          message: formData.message,
        });
      }

      if (res && res.success) {
        setIsSuccess(true);
      } else {
        throw new Error(res.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Something went wrong. Please check your inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="container-custom py-12 md:py-16 text-center">
        <SectionHeader
          tag="GET IN TOUCH"
          title="Let’s Architect Something Extraordinary Together"
          description="Schedule a confidential consultation with our principal technology team, or send us a message regarding your upcoming digital initiative."
          goldWords={['Extraordinary', 'Together']}
        />
      </section>

      {/* Main Section */}
      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form with Tabs */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-dark-200 border border-gold/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

              {/* Tab Selector */}
              <div className="flex p-1.5 rounded-2xl bg-dark-300 border border-dark-400 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('consultation');
                    setIsSuccess(false);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-accent uppercase tracking-wider font-bold transition-all ${
                    activeTab === 'consultation'
                      ? 'bg-gold text-dark shadow-md'
                      : 'text-neutral-500 hover:text-gold'
                  }`}
                >
                  ⚡ Book Architecture Call
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('message');
                    setIsSuccess(false);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-accent uppercase tracking-wider font-bold transition-all ${
                    activeTab === 'message'
                      ? 'bg-gold text-dark shadow-md'
                      : 'text-neutral-500 hover:text-gold'
                  }`}
                >
                  ✉️ General Inquiry
                </button>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/50 mx-auto flex items-center justify-center text-3xl text-gold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-heading font-black text-neutral-100">
                    {activeTab === 'consultation'
                      ? 'Consultation Request Confirmed!'
                      : 'Message Successfully Sent!'}
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-gold">{formData.name}</strong>. A senior technology partner has received your request and will reach out via email ({formData.email}) and phone ({formData.phone}) within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: 'web-development',
                        budget: '$5k - $15k',
                        timeline: '1-3 months',
                        message: '',
                      });
                    }}
                    className="btn-secondary text-xs !py-2.5 !px-6 mt-6"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-900/40 border border-red-500/60 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-dark-400 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-dark-400 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="+91 81377 69939"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-dark-400 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-dark-400 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  {activeTab === 'consultation' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                            Primary Area of Interest
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-dark-400 text-neutral-100 text-sm focus:outline-none focus:border-gold transition-colors"
                          >
                            {services.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                            Target Budget Range
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-dark-400 text-neutral-100 text-sm focus:outline-none focus:border-gold transition-colors"
                          >
                            <option value="<$5k">&lt; $5,000 (Starter / MVP)</option>
                            <option value="$5k - $15k">$5,000 – $15,000 (Growth)</option>
                            <option value="$15k - $50k">$15,000 – $50,000 (Scale)</option>
                            <option value=">$50k">&gt; $50,000 (Enterprise Transformation)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                          Target Timeline
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Immediate (<1 mo)', '1-3 months', '3-6 months', 'Exploratory'].map((time) => (
                            <button
                              type="button"
                              key={time}
                              onClick={() => setFormData((prev) => ({ ...prev, timeline: time }))}
                              className={`py-2 px-3 rounded-xl text-xs font-accent border text-center transition-all ${
                                formData.timeline === time
                                  ? 'bg-gold/20 border-gold text-gold font-bold'
                                  : 'bg-white border-dark-400 text-neutral-400 hover:text-gold'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-accent font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      {activeTab === 'consultation'
                        ? 'Project Summary & Objectives *'
                        : 'How Can We Help You? *'}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        activeTab === 'consultation'
                          ? 'Share details about your current infrastructure, target features, goals...'
                          : 'Write your inquiry here...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-dark-400 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary text-xs !py-4 justify-center uppercase tracking-widest font-bold"
                  >
                    {submitting
                      ? 'Processing Request...'
                      : activeTab === 'consultation'
                      ? 'Reserve Consultation Strategy Call →'
                      : 'Send Message Directly →'}
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center">
                    🔒 Bilateral non-disclosure agreement guaranteed. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channels */}
            <div className="p-8 rounded-3xl bg-dark-200 border border-dark-400 space-y-6">
              <h3 className="text-xl font-heading font-bold text-neutral-100 flex items-center gap-2">
                <span>📍</span> Direct Headquarters
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-lg shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="text-xs font-accent text-gold font-bold uppercase tracking-wider">
                      India Development Center
                    </div>
                    <div className="text-sm text-neutral-300 mt-0.5">
                      Madurai, Chennai, Tamil Nadu, India
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-lg shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs font-accent text-gold font-bold uppercase tracking-wider">
                      Direct Phone
                    </div>
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="text-sm text-neutral-300 hover:text-gold transition-colors mt-0.5 block"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-lg shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs font-accent text-gold font-bold uppercase tracking-wider">
                      Official Inquiries
                    </div>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-sm text-neutral-300 hover:text-gold transition-colors mt-0.5 block"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-lg shrink-0">
                    ⏰
                  </div>
                  <div>
                    <div className="text-xs font-accent text-gold font-bold uppercase tracking-wider">
                      Operational Hours
                    </div>
                    <div className="text-sm text-neutral-300 mt-0.5">
                      Monday – Friday: 9:00 AM – 6:30 PM IST (Global Support 24/7)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Checkup Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-gold/15 via-white to-dark-200 border border-gold/40 relative overflow-hidden shadow-sm">
              <span className="text-[10px] font-accent font-bold uppercase tracking-widest text-gold mb-1 block">
                COMPLIMENTARY EXECUTIVE TOOL
              </span>
              <h4 className="text-lg font-heading font-bold text-neutral-100 mb-2">
                Need a full digital audit first?
              </h4>
              <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                Take our 3-minute Business Health Checkup to score your infrastructure, mobile responsiveness, and commerce readiness.
              </p>
              <a
                href="/business-health-checkup"
                className="btn-primary text-xs !py-2.5 !px-5 inline-flex items-center gap-2"
              >
                Launch Health Checkup →
              </a>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20 pt-16 border-t border-dark-400 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-accent font-bold uppercase tracking-widest text-gold mb-2 block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-neutral-100">
              Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-dark-200 border border-dark-400 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between text-neutral-100 font-heading font-bold text-sm hover:text-gold transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-gold text-base ml-4">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed font-body border-t border-dark-300 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
