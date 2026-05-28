import HeroSection from './components/HeroSection';
import WhoWeAre from './components/WhoWeAre';
import Ecosystem from './components/Ecosystem';
import ProtocolMenu from './components/ProtocolMenu';
import BookAppointment from './components/BookAppointment';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <WhoWeAre />
      <Ecosystem />
      <ProtocolMenu />
      <BookAppointment />
    </main>
  );
}
