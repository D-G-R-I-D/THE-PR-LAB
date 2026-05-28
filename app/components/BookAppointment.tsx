'use client';

import { CalendarDays, Clock, MapPin, Sparkles } from 'lucide-react';

const appointmentTypes = [
  {
    title: 'Consultation',
    duration: '30 minutes',
    location: 'THE P.R. LAB studio or virtual review',
    preparation: 'Arrive with current routine details, recent treatments, and your primary skin goal.',
  },
  {
    title: 'Single Session',
    duration: '60-75 minutes',
    location: 'THE P.R. LAB treatment studio',
    preparation: 'Avoid active exfoliation for 48 hours and arrive with clean, product-free skin where possible.',
  },
  {
    title: 'Protocol Program',
    duration: '90-minute start, then scheduled reviews',
    location: 'THE P.R. LAB treatment studio',
    preparation: 'Bring product history, concern timeline, and any relevant professional treatment notes.',
  },
  {
    title: 'Membership Consultation',
    duration: '45 minutes',
    location: 'THE P.R. LAB studio or virtual review',
    preparation: 'Prepare your maintenance goals, preferred cadence, and key calendar moments.',
  },
];

const calendlyUrl = 'https://calendly.com';

const BookAppointment = () => {
  return (
    <section id="book-appointment" className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/55 mb-4">Book Appointment</p>
            <h2 className="font-futura text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[0.02em] text-pr-black max-w-3xl">
              BEGIN YOUR PROOF JOURNEY
            </h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {appointmentTypes.map((type) => (
                <article key={type.title} className="border border-pr-cream bg-pr-cream/45 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <CalendarDays size={17} className="text-pr-grey" aria-hidden="true" />
                    <h3 className="font-futura text-sm uppercase tracking-[0.2em] text-pr-black">{type.title}</h3>
                  </div>
                  <dl className="space-y-4 font-body text-sm text-pr-grey/82">
                    <div>
                      <dt className="flex items-center gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-pr-grey/55 mb-1">
                        <Clock size={13} aria-hidden="true" />
                        Expected duration
                      </dt>
                      <dd>{type.duration}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-pr-grey/55 mb-1">
                        <MapPin size={13} aria-hidden="true" />
                        Location
                      </dt>
                      <dd>{type.location}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-pr-grey/55 mb-1">
                        <Sparkles size={13} aria-hidden="true" />
                        Preparation notes
                      </dt>
                      <dd>{type.preparation}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>

          <div className="border border-pr-cream bg-pr-cream/35 p-3 md:p-4">
            <iframe
              src={calendlyUrl}
              title="Calendly appointment scheduler"
              className="h-[720px] w-full bg-white"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
