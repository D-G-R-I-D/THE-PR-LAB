import Image from 'next/image';

const pairings = [
  'Chinese tea partnerships',
  'Burundi Arabica coffee',
  'African luxe nut selection',
  'Dark chocolate selection',
  'Dried fruit pairings',
  'Tea biscuits',
];

const Terrace4 = () => {
  return (
    <section id="terrace-4" className="relative w-full bg-[#f4eee7] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl border border-pr-grey/14 bg-[#fbf6ef] p-5 md:p-9 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-10 lg:gap-14 items-center">
            <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-4">
              Terrace 4 Refreshment Menu
            </p>
            <h2 className="font-editorial text-5xl md:text-7xl leading-[0.88] tracking-normal text-pr-black">
              TERRACE 4
            </h2>
            <p className="mt-3 font-body text-xs uppercase tracking-[0.3em] text-pr-grey/68">
              Tea rituals, Burundi Arabica coffee, Chinese tea partnerships
            </p>
            <p className="mt-8 max-w-lg font-editorial text-xl md:text-2xl leading-relaxed text-pr-grey/82">
              Curated tea rituals and botanical pairings, thoughtfully selected to nourish, restore, and elevate the experience at THE P.R. LAB.
            </p>

            <div className="mt-10">
              <h3 className="font-body text-xs uppercase tracking-[0.34em] text-pr-black">Minimal Pairings</h3>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {pairings.map((pairing) => (
                  <p key={pairing} className="border-b border-pr-grey/14 pb-3 font-editorial text-2xl leading-tight text-pr-grey/88">
                    {pairing}
                  </p>
                ))}
              </div>
            </div>
          </div>

            <div className="relative aspect-[0.72] overflow-hidden border border-pr-grey/12 shadow-[0_24px_70px_rgba(77,68,61,0.18)]">
              <Image
                src="/images/Pr refreshment menu.png"
                alt="Terrace 4 refreshment menu"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terrace4;
