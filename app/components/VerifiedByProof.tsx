import Image from 'next/image';

const VerifiedByProof = () => {
  return (
    <section id="verified-by-proof" className="relative w-full bg-pr-black py-16 md:py-24 text-pr-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-[0.86fr_1.14fr] gap-10 md:gap-14 items-center">
          <div className="grid grid-cols-[1fr] gap-4 items-end lg:pr-10">
            <div className="relative flex h-58 w-58 aspect-square items-center justify-center justify-self-center lg:justify-self-end border border-pr-cream/18 bg-pr-cream/5 p-4">
              <Image
                src="/images/picture1.png"
                alt="THE P.R. LAB certification seal"
                width={188}
                height={188}
                className="relative z-10 h-full w-full object-contain"
              />
            </div>
            {/* <div className="relative aspect-[0.8] border border-pr-cream/18 bg-pr-cream/5">
              <Image
                src="/images/Pictures4.png"
                alt="THE P.R. LAB testing and certification page"
                fill
                sizes="(min-width: 768px) 24vw, 48vw"
                className="object-cover object-top"
              />
            </div> */}
          </div>

          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-nude/62 mb-4">
              Verified by Proof
            </p>
            <h2 className="font-editorial text-5xl md:text-7xl leading-[0.88] tracking-normal">
              TESTED BY THE P.R. LAB
            </h2>
            <p className="mt-8 max-w-xl font-editorial text-xl md:text-2xl leading-relaxed text-pr-cream/78">
              A future brand verification ecosystem for products, protocols, and beauty claims evaluated through structured proof.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedByProof;
