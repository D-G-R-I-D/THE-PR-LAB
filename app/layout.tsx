import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'THE P.R. LAB - Where Beauty Meets Proof',
  description: 'Hybrid Aesthetic Testing & Communications Studio. Skin Performance. Beauty Intelligence. Clinical Communication.',
  keywords: ['aesthetic testing', 'beauty intelligence', 'skin protocols', 'clinical communication'],
  authors: [{ name: 'THE P.R. LAB' }],
  openGraph: {
    title: 'THE P.R. LAB - Where Beauty Meets Proof',
    description: 'Hybrid Aesthetic Testing & Communications Studio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-pr-cream text-pr-dark font-body">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
