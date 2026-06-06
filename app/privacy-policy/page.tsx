import Link from 'next/link';
import { SITE_URL, SOCIALS } from '@/lib/constants'

const lastUpdated = 'June 4, 2026';
const mailSubject = "P.R. LAB WEB";
const cc = "";
const bcc = "chukwudid344@gmail.com";
const mailBody = encodeURIComponent(
  `Hello,\n\n` +
  `I am interested in learning more about your services at P.R. LAB.\n\n` +
  `Could you please provide more information or help me schedule an appointment?\n\n` +
  `Thank you,\nLooking forward to hearing from you.`
);
const mailBox = `mailto:${SOCIALS.mailBox}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}&cc=${cc}&bcc=${bcc}`;
//&cc=${cc}&bcc=${bcc}

export default function PrivacyPolicy() {
  return (
    <main className="w-full min-h-screen bg-pr-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-20">
        <div className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-block font-body text-xs uppercase tracking-[0.24em] text-pr-grey/64 transition-colors hover:text-pr-black"
          >
            Back to site
          </Link>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold mb-2 text-pr-dark">
            Privacy Policy
          </h1>
          <p className="text-pr-grey text-sm font-body">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8 font-body text-pr-dark">
          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">1. Overview</h2>
            <p className="text-sm leading-relaxed text-pr-grey">
              THE P.R. LAB respects your privacy. This policy explains how we collect, use, and protect information shared through our website, appointment booking tools, WhatsApp, Instagram, email, and related client enquiries.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">2. Information We Collect</h2>
            <p className="text-sm leading-relaxed text-pr-grey mb-3">
              We collect information you choose to provide when you contact us, request an appointment, complete a consultation, or communicate with our team. This may include:
            </p>
            <ul className="list-disc pl-5 text-sm text-pr-grey space-y-2">
              <li>Your name, phone number, email address, and preferred contact method.</li>
              <li>Appointment details, consultation notes, skin concerns, treatment preferences, and preparation information you voluntarily share.</li>
              <li>Messages sent through WhatsApp, Instagram, Calendly, email, or website forms.</li>
              <li>Basic website usage data, such as pages visited, device type, browser type, and general analytics information.</li>
              <li>Payment or transaction records where required to confirm bookings or provide services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">3. How We Use Information</h2>
            <p className="text-sm leading-relaxed text-pr-grey mb-3">
              We use your information to:
            </p>
            <ul className="list-disc pl-5 text-sm text-pr-grey space-y-2">
              <li>Respond to enquiries and manage appointment bookings.</li>
              <li>Prepare for consultations, protocols, treatments, and follow-up communication.</li>
              <li>Send service updates, confirmations, reminders, and relevant client care information.</li>
              <li>Improve our website, booking experience, and client communication systems.</li>
              <li>Maintain business, safety, accounting, and legal records where necessary.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">4. Sharing And Service Providers</h2>
            <p className="text-sm leading-relaxed text-pr-grey mb-3">
              We do not sell your personal information. We may share limited information with trusted service providers only when needed to operate the website, manage bookings, process payments, provide communications, or comply with legal obligations.
            </p>
            <ul className="list-disc pl-5 text-sm text-pr-grey space-y-2">
              <li>Calendly or similar scheduling tools for booking appointments.</li>
              <li>WhatsApp, Instagram, email, and related communication platforms when you contact us through those channels.</li>
              <li>Website hosting, analytics, payment, and operational providers that support our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">5. Data Care And Security</h2>
            <p className="text-sm leading-relaxed text-pr-grey">
              We take reasonable administrative and technical steps to protect personal information from loss, misuse, unauthorized access, disclosure, alteration, or destruction. No online system is completely secure, so we encourage you not to send highly sensitive information through public social channels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">6. Retention And Your Choices</h2>
            <p className="text-sm leading-relaxed text-pr-grey">
              We keep personal information only for as long as needed to provide services, maintain business records, resolve enquiries, and meet legal obligations. You may contact us to request access, correction, or deletion of your personal information, subject to any lawful record-keeping requirements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">7. Updates To This Policy</h2>
            <p className="text-sm leading-relaxed text-pr-grey">
              We may update this Privacy Policy from time to time. When we make changes, we will update the date shown above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-pr-dark">8. Contact Us</h2>
            <p className="text-sm leading-relaxed text-pr-grey mb-4">
              For questions about this Privacy Policy or how your information is handled, contact:
            </p>
            <div className="border-t border-pr-grey/20 pt-5 text-sm leading-7 text-pr-grey">
              <p><strong className="text-pr-dark">THE P.R. LAB</strong></p>
              <p><a href={mailBox}>Email: info@theprlabafrica.co</a></p>
              <a href={SITE_URL} >Website: www.theprlabafrica.co</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
