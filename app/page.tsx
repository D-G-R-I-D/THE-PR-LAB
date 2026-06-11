import HeroSection from './components/HeroSection';
import WhoWeAre from './components/WhoWeAre';
import Ecosystem from './components/Ecosystem';
import ProtocolMenu from './components/ProtocolMenu';
import B2B from './components/B2B';
import Clinical from './components/Clinical';
import VerifiedByProof from './components/VerifiedByProof';
import Terrace4 from './components/Terrace4';
import SuccessStories from './components/SuccessStories';
import BookAppointment from './components/BookAppointment';
import ContactForm from './components/ContactForm';
import NewsletterSection from './components/NewsletterSection';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <WhoWeAre />
      <Ecosystem />
      <ProtocolMenu />
      <B2B />
      <Clinical />
      <VerifiedByProof />
      <Terrace4 />
      <SuccessStories />
      <BookAppointment />
      <ContactForm />
      <NewsletterSection />
    </main>
  );
}
