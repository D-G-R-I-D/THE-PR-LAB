'use client';

import { motion } from 'framer-motion';

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

const Ecosystem = () => {
  return (
    <section id="ecosystem" className="ecosystem relative w-full bg-[transparent] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
          <motion.h3 variants={itemVariants} className="font-futura text-2xl md:text-3xl tracking-[0.12em] text-center mb-8">
            THE P.R. LAB ECOSYSTEM
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="ecosystem-card p-6 border border-pr-cream/40 bg-white/60 rounded-md">
              <h4 className="font-futura text-sm tracking-widest text-pr-nude mb-4">INDIVIDUALS</h4>
              <ul className="list-disc list-inside space-y-2 font-editorial text-sm text-pr-grey/85">
                <li>Single Session Protocols</li>
                <li>Skin Foundations</li>
                <li>Visible Glow</li>
                <li>Transformation Programs</li>
                <li>Elite Membership</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="ecosystem-card p-6 border border-pr-cream/40 bg-white/60 rounded-md">
              <h4 className="font-futura text-sm tracking-widest text-pr-nude mb-4">BRANDS & INDUSTRY</h4>
              <ul className="list-disc list-inside space-y-2 font-editorial text-sm text-pr-grey/85">
                <li>Product Evaluation</li>
                <li>Testing Frameworks</li>
                <li>Beauty Communications</li>
                <li>Claims Guidance</li>
                <li>Market Integration</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ecosystem;
