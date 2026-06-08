'use client';

import { motion } from 'framer-motion';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <>
      <section className="hero-section relative w-full min-h-screen overflow-hidden hero-background">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto min-h-screen px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-start gap-8 md:gap-12 lg:gap-16">
          {/* TEXT CONTENT */}
          <motion.div
            className="hero-copy flex flex-col justify-start md:col-start-1 items-start pt-24 pb-24 md:pt-28 md:pb-20 lg:pt-32 lg:pb-0 pr-2 md:pr-6 lg:pr-20 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Intro: Welcome + Logo (metallic) */}
            <motion.div variants={itemVariants} className="hero-brand mb-4 md:mb-6 text-left">
              <div className="hero-kicker text-xs text-pr-grey/85 tracking-widest mb-3 pl-[30%] lg:pl-[38%]">WELCOME TO</div>
              <h1 className="futura font-ultrathin text-[3.42rem] sm:text-4xl md:text-5xl lg:text-5xl leading-tight tracking-[0.2em] sm:tracking-[0.35em] md:tracking-[0.4em] metallic-silver">
                THE P.R. LAB
              </h1>
              <div className="hero-proof-line mt-4 flex flex-wrap items-center gap-3 sm:gap-4  lg:px-10">
                <div className="h-px w-12 sm:w-20 bg-pr-t/50" />
                <div className="text-xs sm:text-sm text-pr-dark/80 font-bold tracking-wider">WHERE BEAUTY MEETS PROOF</div>
                <div className="h-px w-12 sm:w-20 bg-pr-t/50" />  
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="font-editorial text-sm md:text-[2rem] text-pr-black/75 mb-6 md:mb-8 max-w-md leading-relaxed.block lg:pl-[12.9%] pl-[10%]"
            >
              <span className="font-editorial text-[1.3rem] md:text-[2rem] text-pr-black/75 leading-relaxed"> A Hybrid Aesthetic Testing & </span>
              <br />
              <span className="font-editorial text-[1.1em] md:text-[1.5rem] text-pr-black/75 mb-6 pl-[0%] leading-none.block">Communications Studio by MCE Media</span>
            </motion.p>

            {/* Service Pillars */}
            <motion.div variants={itemVariants} className="hero-pillars mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              <div className="space-y-0.6 sm:space-y-0.7 md:space-y-0.8 lg:space-y-0.9">
                <div>
                  <p className="font-editorial text-sm md:text-base text-pr-grey/85 leading-none">
                    Skin Performance.
                  </p>
                </div>
                <div>
                  <p className="font-editorial text-sm md:text-base text-pr-grey/85 leading-none">
                    Beauty Intelligence.
                  </p>
                </div>
                <div>
                  <p className="font-editorial text-sm md:text-base text-pr-grey/85 leading-none">
                    Clinical Communication.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <motion.a
                href="#book-appointment"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-pr-cream text-pr-dark font-body text-xs md:text-sm tracking-wider uppercase transition-luxury border border-pr-cream hover:bg-pr-cream/90"
              >
                Book Appointment
              </motion.a>
              <motion.a
                href="#protocol-menu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-pr-cream text-pr-cream font-body text-xs md:text-sm tracking-wider uppercase transition-luxury hover:bg-pr-cream hover:text-pr-dark"
              >
                Explore Protocols
              </motion.a>
            </motion.div>

            {/* Certification area */}
            {/* <motion.div variants={itemVariants} className="hero-cert mt-7 sm:mt-8 md:mt-10 lg:mt-12 flex items-center gap-4 sm:gap-6">
              <div className="text-[11px] sm:text-xs text-pr-cream/80">
                <div className="uppercase tracking-widest font-futura">Tested by THE P.R. LAB</div>
                <div className="text-[10px] sm:text-[12px] mt-1">Verified by Proof</div>
              </div>
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-pr-cream/20 rounded-full border border-pr-cream/30 flex items-center justify-center flex-shrink-0">
                <div className="text-xs sm:text-sm text-pr-cream/80">Seal</div>
              </div>
            </motion.div> */}
          </motion.div>

          <div className="hidden md:block md:col-start-1 md:row-start-1" />
        </div>
      </div>

      {/* SCROLL CUE */}
      <motion.div
        className="scroll-cue absolute bottom-5 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="text-[0.65rem] font-light tracking-[0.15em] uppercase text-pr-nude">Scroll</span>
        <motion.div
          className="w-[2px] h-8 sm:h-10 rounded-full bg-gradient-to-b from-pr-nude to-transparent"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
      </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
 
