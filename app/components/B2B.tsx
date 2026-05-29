import Image from 'next/image';
import { BarChart3, FlaskConical, MessageSquareText, Network, ShieldCheck, Sparkles } from 'lucide-react';

const services = [
  { label: 'Testing Systems', icon: FlaskConical },
  { label: 'Beauty Intelligence', icon: BarChart3 },
  { label: 'Claims Guidance', icon: ShieldCheck },
  { label: 'Product Evaluation', icon: Sparkles },
  { label: 'Market Integration', icon: Network },
  { label: 'Strategic Communication', icon: MessageSquareText },
];

const proofImages = [
  { src: '/images/Pictures7.png', label: 'Partners' },
  // { src: '/images/Pictures5.png', label: 'Communication' },
];

const B2B = () => {
  return (
    <section id="brands-industry" className="relative w-full bg-[#eee7df] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-8 lg:gap-0 border border-pr-grey/14 bg-[#f7f2ec]">
          <div className="p-6 md:p-10 lg:p-12">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-4">
              Beauty Intelligence / B2B
            </p>
            <h2 className="font-editorial text-5xl md:text-7xl leading-[0.88] tracking-normal text-pr-black max-w-2xl">
              FOR BRANDS &amp; INDUSTRY
            </h2>
            <div className="my-8 h-px w-16 bg-pr-grey/38" />
            <p className="max-w-md font-body text-sm leading-7 text-pr-grey/76">
              Luxury institutional visual systems for beauty brands seeking structured evaluation, sharper claims, and market-facing proof.
            </p>
            <p className="mt-8 font-body text-xs uppercase tracking-[0.28em] text-pr-grey/65">
              Partnership opportunities available.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] border-t border-pr-grey/14 lg:border-l lg:border-t-0">
            <div className="grid grid-cols-1 gap-px bg-pr-grey/14">
              {proofImages.map((image) => (
                <figure key={image.src} className="relative min-h-[34rem] bg-[#f7f2ec]">
                  <Image
                    src={image.src}
                    alt={`THE P.R. LAB ${image.label.toLowerCase()} visual`}
                    fill
                    sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 24vw, 50vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute bottom-3 left-3 bg-[#fbf6ef]/86 px-3 py-2 font-body text-[0.55rem] uppercase tracking-[0.24em] text-pr-grey">
                    {""}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="border-t border-pr-grey/14 xl:border-l xl:border-t-0">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.label}
                    className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-4 border-b border-pr-grey/14 px-5 py-4 md:px-7 md:py-5"
                  >
                    <span className="font-editorial text-2xl text-pr-grey/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-body text-xs uppercase tracking-[0.22em] text-pr-black">
                      {service.label}
                    </h3>
                    <span className="flex h-9 w-9 items-center justify-center border border-pr-grey/18 text-pr-grey">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2B;
