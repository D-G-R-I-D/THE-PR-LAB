import NewsletterSignup from './NewsletterSignup';

export default function NewsletterSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-pr-black to-[#1a1410] py-16 md:py-24 text-pr-cream overflow-hidden">
      <div className="absolute -left-20 top-0 h-96 w-96 bg-pr-cream/5 rounded-full blur-3xl opacity-20" aria-hidden="true" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 bg-pr-cream/5 rounded-full blur-3xl opacity-20" aria-hidden="true" />

      <div className="container relative mx-auto px-4 md:px-8 z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-nude/62">
            Stay Connected
          </p>
          <h2 className="font-editorial text-4xl md:text-5xl leading-tight text-pr-cream mb-6">
            Beauty Intelligence & Proof
          </h2>
          <p className="font-body text-sm md:text-base leading-7 text-pr-cream/70 mb-10 max-w-xl mx-auto">
            Subscribe to receive protocol-led beauty insights, exclusive research, product testing updates, and special magazines delivered to your inbox.
          </p>

          <div className="flex justify-center">
            <NewsletterSignup />
          </div>

          <p className="mt-8 font-body text-[0.6rem] uppercase tracking-[0.2em] text-pr-nude/50">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
