import Image from 'next/image';

const Clinical = () => {
  return (
    <section id="clinical-collaboration" className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] border border-pr-cream bg-[#f7f2ec]">
          <div className="relative min-h-[35rem] lg:min-h-[34rem]">
            <Image
              src="/images/Pictures2.png"
              alt="THE P.R. LAB and THE AESTHETIC CLINIC partnership visual"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-pr-black/8" />
          </div>

          <div className="flex items-center p-6 md:p-10 lg:p-14">
            <div className="max-w-xl">
              <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-4">
                The Aesthetic Clinic Partnership
              </p>
              <h2 className="font-editorial text-5xl md:text-7xl leading-[0.9] tracking-normal text-pr-black">
                CLINICAL COLLABORATION
              </h2>
              <div className="my-8 h-px w-16 bg-pr-grey/34" />
              <p className="font-editorial text-2xl md:text-4xl leading-tight text-pr-grey/86">
                The P.R. LAB collaborates with THE AESTHETIC CLINIC in advancing structured aesthetic pathways and elevated skin health experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clinical;
