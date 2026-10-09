'use client';
import Link from 'next/link';
import { companyInfo, services, navigationLinks } from '@/data/siteData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Solutions & Services',
      links: services.map(s => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
    },
    {
      title: 'Executive Tools',
      links: [
        { label: 'Business Health Checkup', href: '/business-health-checkup' },
        { label: 'Project Planning Guide', href: '/software-project-planning-guide' },
        { label: 'Portfolio Case Studies', href: '/portfolio' },
        { label: 'Careers & Fellowship', href: '/careers' },
        { label: 'Blog & Insights', href: '/blog' },
      ],
    },
    {
      title: 'Corporate Headquarters',
      isInfo: true,
      content: [
        companyInfo.locations[0],
        '',
        companyInfo.phone,
        companyInfo.email,
        '',
      ],
    },
  ];

  return (
    <footer className="bg-dark-200 border-t border-dark-500">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-heading font-black text-dark text-lg">
                R
              </div>
              <div>
                <span className="font-heading font-bold text-neutral-100 text-sm tracking-wide">
                  RIYADVI
                </span>
                <span className="block text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
                  Software Technologies
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Technology & Digital Solutions Partner delivering innovative digital 
              experiences, custom software, and business growth strategies since 2021.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-dark-500 flex items-center justify-center text-neutral-400 hover:border-gold hover:text-gold transition-all text-xs"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold text-neutral-100 text-sm uppercase tracking-wider mb-6">
                {section.title}
              </h4>
              {section.isInfo ? (
                <div className="space-y-2">
                  {section.content.map((line, i) => (
                    <p key={i} className="text-sm text-neutral-400">{line || <br />}</p>
                  ))}
                  <Link
                    href="/contact"
                    className="inline-block mt-4 text-sm text-gold hover:text-gold-light transition-colors font-semibold"
                  >
                    Book a Consultation →
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-500">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {currentYear} {companyInfo.name}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-neutral-500 hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-neutral-500 hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
