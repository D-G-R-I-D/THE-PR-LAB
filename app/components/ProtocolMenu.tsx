'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const protocols = [
  {
    title: 'Single Session Protocols',
    eyebrow: '01 / Immediate clarity',
    summary: 'Targeted studio treatments for a specific skin objective, event, or reset moment.',
    details: ['Express skin read', 'Focused aesthetic treatment', 'Post-session care direction'],
    image: '/images/SS .png',
  },
  {
    title: 'Skin Foundations',
    eyebrow: '02 / Baseline work',
    summary: 'A measured starting point for skin health, routine structure, and visible consistency.',
    details: ['Barrier support', 'Routine audit', 'Progress markers'],
    image: '/images/Pictures10.png',
  },
  {
    title: 'Visible Glow',
    eyebrow: '03 / Radiance system',
    summary: 'A brightening and refinement path for texture, tone, luminosity, and polish.',
    details: ['Glow-focused treatment rhythm', 'Hydration and texture support', 'Event-ready finish'],
    image: '/images/Pictures4.png',
  },
  {
    title: 'Transformation',
    eyebrow: '04 / Structured change',
    summary: 'A progressive program for complex concerns that need consistency and evidence-led review.',
    details: ['Multi-session plan', 'Before-and-after checkpoints', 'Protocol adjustments'],
    image: '/images/Pictures3.png',
  },
  {
    title: 'Elite Membership',
    eyebrow: '05 / Ongoing proof',
    summary: 'A high-touch continuity model for clients who want regular skin intelligence and maintenance.',
    details: ['Priority scheduling', 'Monthly protocol rhythm', 'Long-term skin documentation'],
    image: '/images/Innercircle4.png',
  },
];

const ProtocolMenu = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const activeProtocol = protocols[openIndex] ?? protocols[0];

  return (
    <section id="protocol-menu" className="relative w-full bg-pr-black text-pr-cream py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-16 items-start">
          <div className="hidden lg:block lg:sticky lg:top-28">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-nude/70 mb-4">Protocol Menu</p>
            <h2 className="font-futura text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[0.02em] max-w-xl">
              TREATMENT AS PROOF
            </h2>
            <div className="mt-8 relative aspect-[0.72] max-w-sm overflow-hidden border border-pr-cream/15 bg-pr-cream/5">
              <Image
                src={activeProtocol.image}
                alt={`${activeProtocol.title} visual`}
                fill
                sizes="(min-width: 1024px) 320px, 80vw"
                className="object-cover object-top opacity-75"
              />
              <div className="absolute inset-0 bg-pr-black/15" />
            </div>
          </div>

          <div className="border-t border-pr-cream/20">
            {protocols.map((protocol, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={protocol.title} className="border-b border-pr-cream/20">
                  <button
                    type="button"
                    className="w-full py-6 md:py-8 text-left flex items-start justify-between gap-6 group"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>
                      <span className="block font-body text-[0.62rem] uppercase tracking-[0.28em] text-pr-nude/60 mb-3">
                        {protocol.eyebrow}
                      </span>
                      <span className="block font-editorial text-3xl md:text-5xl leading-none text-pr-cream group-hover:text-white transition-colors">
                        {protocol.title}
                      </span>
                    </span>
                    <span className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center border border-pr-cream/25">
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 md:pb-10 grid grid-cols-1 md:grid-cols-[1fr_0.78fr] gap-6 md:gap-10">
                          <p className="font-editorial text-xl md:text-2xl leading-relaxed text-pr-cream/82">
                            {protocol.summary}
                          </p>
                          <ul className="space-y-3 font-body text-xs uppercase tracking-[0.2em] text-pr-nude/70">
                            {protocol.details.map((detail) => (
                              <li key={detail} className="border-l border-pr-nude/35 pl-4">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Mobile image - only visible on screens smaller than lg */}
                        <div className="lg:hidden mt-6 relative aspect-[0.72] max-w-sm md:max-w-sm overflow-hidden border border-pr-cream/15 bg-pr-cream/5">
                          <Image
                            src={protocol.image}
                            alt={`${protocol.title} visual`}
                            fill
                            sizes="(min-width: 768px) 400px, 80vw"
                            className="object-cover object-top opacity-75"
                          />
                          <div className="absolute inset-0 bg-pr-black/15" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtocolMenu;
