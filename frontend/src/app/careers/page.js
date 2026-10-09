'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { careers } from '@/data/siteData';
import { SectionHeader } from '@/components/ui/SharedComponents';

const perks = [
  {
    icon: '⚡',
    title: 'High-Impact Work',
    desc: 'Work on cutting-edge 3D web applications, high-scale digital platforms, and real customer challenges across international markets.',
  },
  {
    icon: '🏡',
    title: 'Work Flexibility',
    desc: 'Hybrid or fully remote opportunities designed around high trust, autonomy, and work-life harmony.',
  },
  {
    icon: '🚀',
    title: 'Continuous Mastery',
    desc: 'Generous learning budgets, paid certifications, conference sponsorships, and hands-on AI tool access.',
  },
  {
    icon: '💎',
    title: 'Competitive Compensation',
    desc: 'Top-tier base salary, merit-based bonuses, milestone rewards, and annual performance reviews.',
  },
  {
    icon: '🏥',
    title: 'Health & Wellness',
    desc: 'Comprehensive medical insurance coverage for you and your dependents, plus mental health support.',
  },
  {
    icon: '💻',
    title: 'Premium Hardware',
    desc: 'Latest Apple Silicon MacBooks or top-tier Linux/Windows workstations and ergonomic home office stipends.',
  },
];

const cultureValues = [
  {
    title: 'Radical Craftsmanship',
    desc: 'We care deeply about every pixel, every line of code, and every interaction. Good enough is never good enough.',
  },
  {
    title: 'Speed with Precision',
    desc: 'We move fast, automate ruthlessly, and deploy iteratively while maintaining uncompromising quality.',
  },
  {
    title: 'Empathy-Driven Engineering',
    desc: 'Software is for humans. We build with deep consideration for our clients, their users, and each other.',
  },
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = useMemo(() => {
    const depts = ['All'];
    careers.forEach((job) => {
      if (job.department && !depts.includes(job.department)) {
        depts.push(job.department);
      }
    });
    return depts;
  }, []);

  const filteredJobs = useMemo(() => {
    if (selectedDept === 'All') return careers;
    return careers.filter((job) => job.department === selectedDept);
  }, [selectedDept]);

  return (
    <div className="pt-28 pb-20">
      {/* Hero Section */}
      <section className="container-custom py-12 md:py-16 text-center">
        <SectionHeader
          tag="CAREERS AT RIYADVI"
          title="Build Next-Gen Digital Products with World-Class Engineers"
          description="We are a team of visionary technologists, designers, and innovators building digital experiences that define modern industries. Join us and do the most meaningful work of your career."
          goldWords={['Next-Gen', 'Digital', 'Products']}
        />

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-accent">
          <span className="px-4 py-2 rounded-xl bg-dark-300 text-neutral-300 border border-dark-400">
            📍 Headquartered in Madurai & Chennai, India
          </span>
          <span className="px-4 py-2 rounded-xl bg-dark-300 text-neutral-300 border border-dark-400">
            🌍 Global Client Footprint (India, Australia, US)
          </span>
          <span className="px-4 py-2 rounded-xl bg-dark-300 text-neutral-300 border border-dark-400">
            ⭐ Award-Winning Culture
          </span>
        </div>
      </section>

      {/* Culture & Philosophy */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cultureValues.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-dark-200 border border-dark-400 relative overflow-hidden"
            >
              <div className="w-8 h-1 bg-gold rounded-full mb-4" />
              <h3 className="text-xl font-heading font-bold text-neutral-100 mb-3">
                {val.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-body">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Perks and Benefits */}
      <section className="container-custom py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-accent font-bold uppercase tracking-widest text-gold mb-2 block">
            WHY YOU WILL LOVE WORKING HERE
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-black text-neutral-100">
            Comprehensive Benefits & Growth Acceleration
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-dark-200/70 border border-dark-400/80 hover:border-gold/40 transition-all card-glow"
            >
              <span className="text-3xl block mb-4">{perk.icon}</span>
              <h4 className="text-lg font-heading font-bold text-neutral-100 mb-2">
                {perk.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-body">
                {perk.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="container-custom py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-dark-400">
          <div>
            <span className="text-xs font-accent font-bold uppercase tracking-widest text-gold mb-2 block">
              OPEN ROLES ({careers.length})
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-neutral-100">
              Explore Opportunities to Join Riyadvi
            </h2>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-accent uppercase tracking-wider font-semibold transition-all ${
                  selectedDept === dept
                    ? 'bg-gold text-dark font-bold shadow-lg shadow-gold/20'
                    : 'bg-white text-neutral-400 hover:text-gold hover:bg-dark-200 border border-dark-400'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job, idx) => (
            <motion.div
              key={job.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="card-glow p-6 md:p-8 rounded-3xl bg-dark-200 border border-dark-400 hover:border-gold/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-accent uppercase font-bold bg-dark-400 text-gold border border-gold/20">
                    {job.department}
                  </span>
                  <span className="text-xs text-neutral-400 font-accent">
                    📍 {job.location}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-xs text-neutral-400 font-accent">
                    ⏱️ {job.type}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-xs text-gold/90 font-accent font-semibold">
                    🎯 {job.experience}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-bold text-neutral-100 group-hover:text-gold transition-colors">
                  <Link href={`/careers/${job.slug}`}>
                    {job.title}
                  </Link>
                </h3>

                <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed font-body">
                  {job.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/careers/${job.slug}`}
                  className="btn-primary text-xs !py-3 !px-6 whitespace-nowrap"
                >
                  View Details & Apply →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open Application Card */}
        <div className="mt-12 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-dark-200 via-white to-dark-200 border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-xl font-heading font-bold text-neutral-100 mb-2">
              Don&apos;t see your dream role listed?
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              We are constantly seeking brilliant engineers, 3D artists, AI specialists, and digital strategists. Send us your resume and tell us what you would build at Riyadvi.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-secondary text-xs !py-3 !px-6 whitespace-nowrap"
          >
            Submit General Application
          </Link>
        </div>
      </section>
    </div>
  );
}
