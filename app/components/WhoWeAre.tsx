'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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

const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="who-we-are relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={itemVariants} className="font-futura text-3xl md:text-4xl tracking-[0.18em] mb-4">
            BEYOND TREATMENT
          </motion.h2>
          <motion.p variants={itemVariants} className="font-editorial text-base md:text-lg text-pr-black/80 leading-relaxed mb-6">
            THE P.R. LAB operates at the intersection of beauty evidence, aesthetic testing, clinical communication, and structured skin progression.
          </motion.p>
          <motion.p variants={itemVariants} className="font-editorial text-base md:text-lg text-pr-black/80 leading-relaxed mb-8">
            We bridge measurable skin outcomes with beauty intelligence through protocol-led systems designed for individuals and beauty industry stakeholders.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center justify-center">
            <Image
              src="/images/picture1.png"
              alt="THE P.R. LAB seal"
              width={112}
              height={112}
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              priority={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
