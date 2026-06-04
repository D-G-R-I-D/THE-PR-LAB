'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, CalendarDays, Camera, Globe2, MessageCircle, ShieldCheck } from 'lucide-react';
import { SITE_NAME, SITE_TAGLINE, SITE_URL, SOCIALS } from '@/lib/constants';


export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const websiteLabel = SITE_URL.replace(/^https?:\/\//, '');
  const sectionHref = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  const studioLinks = [
    { label: 'Appointment Booking', href: sectionHref('#book-appointment'), eyebrow: 'Concierge' },
    { label: 'Protocols', href: sectionHref('#protocol-menu'), eyebrow: 'Treatments' },
    { label: 'Brands & Industry', href: sectionHref('#brands-industry'), eyebrow: 'Partnership' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: SOCIALS.instagram, icon: Camera },
    { label: 'WhatsApp', href: SOCIALS.whatsapp, icon: MessageCircle },
    { label: 'X', href: SOCIALS.x, icon: CalendarDays },
    { label: 'Calendly', href: SOCIALS.calendly, icon: CalendarDays },
  ];

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-[#171310] text-pr-cream">
      <div className="pointer-events-none absolute -right-10 top-8 hidden font-editorial text-[12rem] leading-none text-pr-cream/[0.025] lg:block">
        P.R.
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 md:py-16 lg:px-12 lg:py-20">
        <div className="border-y border-pr-cream/14 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="grid gap-1">
              <p className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-pr-nude/65">
                Private studio appointments
              </p>
              <p className="font-editorial text-2xl leading-tight text-pr-cream md:text-3xl">
                Protocol-led beauty intelligence, curated with proof.
              </p>
            </div>
            <a
              href={sectionHref('#book-appointment')}
              className="group inline-flex min-h-12 w-full items-center justify-between gap-5 border border-pr-nude/42 px-4 py-3 font-body text-[0.68rem] uppercase tracking-[0.22em] text-pr-cream transition-colors duration-300 hover:border-pr-cream hover:bg-pr-cream hover:text-pr-black sm:w-auto sm:min-w-64"
            >
              Book Appointment
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 border-b border-pr-cream/14 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="border-b border-pr-cream/14 py-12 lg:border-b-0 lg:border-r lg:border-pr-cream/14 lg:py-16 lg:pr-14">
            <p className="mb-5 font-body text-[0.62rem] uppercase tracking-[0.34em] text-pr-nude/62">
              The elite proof studio
            </p>
            <h2 className="font-editorial text-6xl font-bold leading-[0.84] text-pr-cream sm:text-7xl md:text-8xl">
              {SITE_NAME}
            </h2>
            <div className="my-8 grid grid-cols-[5rem_1fr] items-center gap-5">
              <div className="h-px bg-pr-nude/46" />
              <p className="font-body text-[0.68rem] uppercase tracking-[0.28em] text-pr-nude/78">
                {SITE_TAGLINE}
              </p>
            </div>
            <p className="max-w-xl font-body text-sm leading-7 text-pr-cream/66">
              Aesthetic protocols, documented skin performance, and strategic beauty communications for clients, founders, and industry partners who need clarity with polish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:min-h-[30rem]">
            <nav className="border-b border-pr-cream/14 py-8 sm:border-b-0 sm:border-r sm:border-pr-cream/14 sm:px-6 lg:py-16">
              <p className="mb-8 font-futura text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-pr-nude">
                01 / Studio
              </p>
              <ul className="space-y-6">
                {studioLinks.map((link) => (
                  <li key={link.label}>
                    <p className="mb-1 font-body text-[0.58rem] uppercase tracking-[0.24em] text-pr-cream/35">
                      {link.eyebrow}
                    </p>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 font-body text-sm text-pr-cream/70 transition-colors duration-300 hover:text-pr-cream"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 transition-all duration-300 group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="border-b border-pr-cream/14 py-8 sm:border-b-0 sm:border-r sm:border-pr-cream/14 sm:px-6 lg:py-16">
              <p className="mb-8 font-futura text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-pr-nude">
                02 / Connect
              </p>
              <ul className="space-y-5">
                {socialLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-10 items-center justify-between gap-3 border-b border-pr-cream/10 pb-3 font-body text-sm text-pr-cream/70 transition-colors duration-300 hover:border-pr-cream/28 hover:text-pr-cream"
                      >
                        <span className="inline-flex items-center gap-3">
                          <Icon size={15} className="text-pr-nude/70" aria-hidden="true" />
                          {link.label}
                        </span>
                        <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="py-8 sm:px-6 lg:py-16">
              <p className="mb-8 font-futura text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-pr-nude">
                03 / Trust
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-3 border-b border-pr-cream/10 pb-5">
                  <ShieldCheck size={17} className="mt-0.5 shrink-0 text-pr-nude/72" aria-hidden="true" />
                  <p className="font-body text-sm leading-6 text-pr-cream/64">
                    Client information is handled with discretion across booking, consultation, and follow-up.
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b border-pr-cream/10 pb-5">
                  <Globe2 size={17} className="mt-0.5 shrink-0 text-pr-nude/72" aria-hidden="true" />
                  <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-body text-sm leading-6 text-pr-cream/70 transition-colors duration-300 hover:text-pr-cream"
                  >
                    {websiteLabel}
                  </a>
                </div>
                <div>
                  <Link
                    href="/privacy-policy"
                    className="inline-flex items-center gap-2 font-body text-sm text-pr-cream/70 transition-colors duration-300 hover:text-pr-cream"
                  >
                    Privacy Policy
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.18em] text-pr-cream/45">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-body text-[0.68rem] uppercase tracking-[0.18em] text-pr-cream/45 md:justify-end">
            <span>Beauty Intelligence</span>
            <span>Clinical Communication</span>
            <span>Skin Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
