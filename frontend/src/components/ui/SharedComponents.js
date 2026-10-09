'use client';
import { motion } from 'framer-motion';

export function SectionHeader({ tag, title, description, align = 'center', goldWords = [] }) {
  const renderTitle = () => {
    if (!goldWords.length) return title;
    let result = title;
    const parts = [];
    let remaining = title;
    
    goldWords.forEach(word => {
      const index = remaining.indexOf(word);
      if (index !== -1) {
        if (index > 0) parts.push({ text: remaining.substring(0, index), gold: false });
        parts.push({ text: word, gold: true });
        remaining = remaining.substring(index + word.length);
      }
    });
    if (remaining) parts.push({ text: remaining, gold: false });
    
    if (parts.length === 0) return title;
    
    return parts.map((part, i) => 
      part.gold ? <span key={i} className="text-gradient-gold">{part.text}</span> : <span key={i}>{part.text}</span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {tag && (
        <span className="tag mb-4 inline-block">
          {tag}
        </span>
      )}
      <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-neutral-100 leading-tight mt-4 uppercase tracking-tight">
        {renderTitle()}
      </h2>
      {description && (
        <p className={`mt-6 text-neutral-400 text-base md:text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function StatCard({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center px-6 py-4"
    >
      <div className="font-heading font-black text-3xl md:text-4xl text-gradient-gold">
        {value}
      </div>
      <p className="text-neutral-400 text-sm mt-2 font-accent uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

export function GoldDivider() {
  return (
    <div className="w-full py-8">
      <div className="line-gold w-full max-w-4xl mx-auto" />
    </div>
  );
}

export function FormInput({ label, name, type = 'text', required = false, placeholder, value, onChange, rows }) {
  const baseClass = "w-full bg-white border border-dark-400 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm font-body shadow-sm";

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-accent font-medium text-neutral-200 mb-2">
          {label} {required && <span className="text-gold">*</span>}
        </label>
      )}
      {rows ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClass + ' resize-none'}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClass}
        />
      )}
    </div>
  );
}

export function ServiceCard({ service, index }) {
  return (
    <motion.a
      href={`/services/${service.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group block glass rounded-2xl p-6 md:p-8 card-hover cursor-pointer relative overflow-hidden bg-white border border-dark-400 shadow-sm"
    >
      {/* Number */}
      <span className="absolute top-4 right-4 font-heading font-black text-5xl text-dark-400 group-hover:text-gold/20 transition-colors">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="text-3xl mb-4">{service.icon}</div>
      
      <h3 className="font-heading font-bold text-lg text-neutral-100 group-hover:text-gold transition-colors mb-3">
        {service.title}
      </h3>
      
      <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {service.tagline}
      </p>

      {/* Stats */}
      <div className="flex gap-4 mb-6">
        {service.stats.slice(0, 2).map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-gold font-heading font-bold text-sm">{stat.value}</div>
            <div className="text-neutral-500 text-[10px] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Technologies preview */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {service.technologies.slice(0, 4).map((tech, i) => (
          <span key={i} className="text-[10px] px-2 py-1 rounded bg-dark-300 text-neutral-400 border border-dark-400">
            {tech}
          </span>
        ))}
      </div>

      <span className="inline-flex items-center gap-2 text-gold text-sm font-accent font-semibold group-hover:gap-3 transition-all">
        Explore Engineering Blueprint
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </motion.a>
  );
}

export function PortfolioCard({ project, index }) {
  return (
    <motion.a
      href={`/portfolio/${project.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group block relative rounded-2xl overflow-hidden card-hover bg-white border border-dark-400 shadow-sm"
    >
      {/* Image */}
      <div className="aspect-video bg-gradient-to-br from-dark-200 to-dark-300 relative overflow-hidden border-b border-dark-400">
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">{project.technologies[0] === 'Next.js' ? '▲' : '⚡'}</span>
        </div>
        {/* Category tag */}
        <span className="absolute top-3 left-3 z-20 tag text-[10px]">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1 font-accent">
          {project.industry}
        </p>
        <h3 className="font-heading font-bold text-neutral-100 text-lg group-hover:text-gold transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm line-clamp-2 mb-4">
          {project.challenge}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-dark-300 text-neutral-400 border border-dark-400">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
