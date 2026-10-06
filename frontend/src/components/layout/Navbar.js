'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationLinks, companyInfo } from '@/data/siteData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-dark py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-heading font-black text-dark text-lg">
              R
            </div>
            <div className="absolute inset-0 rounded-lg bg-gold/20 blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-white text-sm tracking-wide">
              RIYADVI
            </span>
            <span className="block text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
              Software Technologies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigationLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="px-4 py-2 text-sm font-body text-neutral-300 hover:text-gold transition-colors relative group"
              >
                {link.label}
                {link.children && (
                  <svg className="inline-block w-3 h-3 ml-1 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {link.children && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 glass rounded-xl p-2 shadow-2xl"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-300 hover:text-gold hover:bg-gold-muted transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/business-health-checkup"
            className="text-xs font-accent font-semibold text-gold border border-gold/30 px-4 py-2 rounded-lg hover:bg-gold-muted transition-all tracking-wide uppercase"
          >
            Health Checkup
          </Link>
          <Link
            href="/contact"
            className="btn-primary text-xs !py-2 !px-5"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-0 bg-dark-100/98 backdrop-blur-xl z-40 overflow-y-auto pt-24"
          >
            <div className="container-custom flex flex-col gap-2 pb-8">
              {navigationLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-4 text-lg font-heading font-semibold text-white hover:text-gold border-b border-dark-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-8 space-y-1 mt-1 mb-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block py-2 text-sm text-neutral-400 hover:text-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="mt-8 space-y-3">
                <Link
                  href="/business-health-checkup"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center btn-secondary w-full"
                >
                  Business Health Checkup
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center btn-primary w-full justify-center"
                >
                  Book Consultation
                </Link>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-neutral-500">{companyInfo.phone}</p>
                <p className="text-sm text-neutral-500">{companyInfo.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
