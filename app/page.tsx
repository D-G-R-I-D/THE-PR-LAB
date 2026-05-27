import HeroSection from './components/HeroSection';
import WhoWeAre from './components/WhoWeAre';
import Ecosystem from './components/Ecosystem';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <WhoWeAre />
      <Ecosystem />
    </main>
  );
}
