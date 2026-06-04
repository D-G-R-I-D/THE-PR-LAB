'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const sectionHref = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity: fade out completely after 100px of scrolling
  const logoOpacity = Math.max(0, 1 - scrollY / 100);
  const navOpacity = isHoveringTop ? 1 : Math.max(0, 1 - scrollY / 50);

  // Update CSS variables on header element
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.setProperty('--logo-opacity', String(logoOpacity));
      headerRef.current.style.setProperty('--nav-opacity', String(navOpacity));
    }
  }, [logoOpacity, navOpacity]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navItems = [
    { label: 'PROTOCOLS', href: sectionHref('#protocol-menu') },
    { label: 'FOR BRANDS', href: sectionHref('#brands-industry') },
    { label: 'TERRACE 4', href: sectionHref('#terrace-4') },
    { label: 'ABOUT', href: sectionHref('#who-we-are') },
    { label: 'JOURNAL', href: sectionHref('#success-stories') },
    { label: 'CONTACT', href: sectionHref('#book-appointment') },
  ];

  return (
    <header 
      ref={headerRef}
      className="w-full fixed top-0 left-0 z-50"
      onMouseEnter={() => setIsHoveringTop(true)}
      onMouseLeave={() => setIsHoveringTop(false)}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-6 relative z-[60]">
        <div className="flex flex-col pointer-events-none header-logo">
         <div className="font-futura text-[10px] md:text-xs tracking-widest text-pr-dark uppercase">THE P.R. LAB</div>
          <div className="text-[8px] md:text-[10px] text-pr-grey mt-1 tracking-[0.18em] md:tracking-normal">
            WHERE BEAUTY MEETS PROOF
          </div>
        </div>

        {/* Desktop Navigation */}
       <nav className="hidden lg:flex gap-7 text-[9px] uppercase tracking-wider items-center header-nav">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link text-pr-grey transition-colors duration-300 ease-out">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block header-nav">
          <a
            href={sectionHref('#book-appointment')}
            className="px-4 py-2 border border-pr-cream text-pr-cream text-xs tracking-widest uppercase rounded transition-all hover:bg-pr-cream hover:text-pr-dark"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        {isOpen ? (
          <button
            type="button"
            onClick={toggleMenu}
            className="menu-toggle lg:hidden"
            aria-label="Close menu"
            aria-expanded="true"
          >
            <span className="menu-toggle-trace" />
            <span className="menu-toggle-ripple" />
            <X size={22} className="relative z-10 text-pr-dark transition-transform duration-300 ease-out" />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleMenu}
            className="menu-toggle lg:hidden"
            aria-label="Open menu"
            aria-expanded="false"
          >
            <span className="menu-toggle-trace" />
            <span className="menu-toggle-ripple" />
            <Menu size={22} className="relative z-10 text-pr-dark transition-transform duration-300 ease-out" />
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              className="lg:hidden fixed inset-0 z-40 bg-pr-black/18 backdrop-blur-[6px]"
              aria-label="Close menu overlay"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            />
            <motion.div
              id="site-mobile-menu"
              className="mobile-menu-panel lg:hidden fixed top-[76px] left-4 right-4 z-50 border border-white/35 shadow-[0_24px_70px_rgba(42,36,32,0.2)]"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="flex flex-col gap-1 px-3 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="nav-link-mobile text-pr-grey py-3 px-4 text-xs uppercase tracking-[0.24em]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={sectionHref('#book-appointment')}
                  className="mt-3 px-4 py-3 border border-pr-dark/65 text-pr-dark text-[10px] tracking-[0.24em] uppercase transition-all duration-300 ease-out hover:bg-pr-dark hover:text-pr-cream active:scale-[0.99]"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
