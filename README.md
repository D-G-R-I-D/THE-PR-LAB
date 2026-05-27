# THE P.R. LAB - Where Beauty Meets Proof

A luxury editorial website for THE P.R. LAB built with Next.js 14, React, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Fonts**: Cormorant Garamond (Editorial), Inter (Body), Futura (UI)

## Project Structure

```
THE_P.R_LAB_WEBSITE/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── HeroSection.tsx
│   │   ├── WhoWeAre.tsx
│   │   ├── Ecosystem.tsx
│   │   ├── Protocols.tsx
│   │   ├── BookAppointment.tsx
│   │   ├── B2B.tsx
│   │   ├── Clinical.tsx
│   │   ├── VerifiedByProof.tsx
│   │   ├── Terrace4.tsx
│   │   └── Footer.tsx
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── styles/
│   └── globals.css          # Global styles and animations
├── lib/                     # Utilities and helpers
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
└── .gitignore
```

## Color System

- **Primary Background**: `#F1EEEB` (pr-cream)
- **Secondary Nude**: `#E4D8CB` (pr-nude)
- **Typography Neutral**: `#D2C9C0` (pr-grey)
- **Dark Text**: `#4D443D` (pr-dark)
- **Black**: `#2A2420` (pr-black)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Features Implemented

### Phase 1: Architecture & Hero
- ✅ Next.js 14 project setup
- ✅ Tailwind CSS configuration with custom colors
- ✅ TypeScript setup
- ✅ Framer Motion integration
- ✅ Hero section with split layout
- ✅ Luxury animations and micro-interactions
- ✅ Responsive mobile-first design
- ✅ Custom fonts (Cormorant Garamond, Inter)

### Phase 2: Upcoming
- [ ] Who We Are section
- [ ] Ecosystem & protocol cards
- [ ] Protocol accordion
- [ ] Calendly integration
- [ ] B2B / Beauty Intelligence section
- [ ] Clinical partnership section
- [ ] Verified by Proof section
- [ ] Terrace 4 hospitality section
- [ ] Footer with links and social
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] SEO enhancements

## Design Philosophy

- **Whitespace first**: Generous spacing and clean composition
- **Typography driven**: Editorial hierarchy with premium fonts
- **Minimal animation**: Soft, slow, elegant transitions
- **Institutional luxury**: Calm, proof-led, evidence-based aesthetic
- **Editorial tone**: Quiet luxury, Aesop-inspired minimalism

## Key Components

### Hero Section
- Full-width split layout
- Left: Brand messaging and CTAs
- Right: Floating luxury editorial image placeholder
- Scroll cue animation
- Responsive mobile stack

## Notes

- All custom colors available as Tailwind classes: `bg-pr-cream`, `text-pr-dark`, etc.
- Animations use `transition-luxury` and `transition-smooth` utility classes
- Font families available: `font-editorial`, `font-futura`, `font-body`
- Framer Motion used for complex animations; Tailwind for simple ones
# THE-PR-LAB
