import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import CaseStudies from './components/CaseStudies';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import LeadBanner from './components/LeadBanner';
import Footer from './components/Footer';
import { LeadSubmission } from './types';
import { motion } from 'motion/react';

function ScrollFadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [submissions, setSubmissions] = useState<LeadSubmission[]>(() => {
    const local = localStorage.getItem('grow_influentials_submissions');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error('Failed to parse localStorage logs:', err);
      }
    }
    const defaultLeads: LeadSubmission[] = [
      {
        id: 'G-LEAD-48210',
        name: 'Sarah Connor',
        email: 'sarah@solsticewear.com',
        brandName: 'Solstice Wear',
        website: 'https://solsticewear.com',
        budget: 'Growth Machine ($2.8k-3.5k)',
        message: 'We are launching our clean summer swimwear line in June and need 12-15 active fashion/travel creators who can model eco-friendly values in tropical contexts.',
        submittedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString() // 1 day ago
      },
      {
        id: 'G-LEAD-19283',
        name: 'James Chen',
        email: 'james@drinkelixir.com',
        brandName: 'Elixir Soda',
        website: 'https://drinkelixir.co',
        budget: 'Starter Discovery ($1.2k-1.5k)',
        message: 'Looking to seed 5-8 lifestyle/fitness micro creators to model our sugar-free organic carbonated sodas on TikTok and Instagram Reels.',
        submittedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString() // 4 hours ago
      }
    ];
    localStorage.setItem('grow_influentials_submissions', JSON.stringify(defaultLeads));
    return defaultLeads;
  });

  useEffect(() => {
    localStorage.setItem('grow_influentials_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const handleAddLead = (lead: LeadSubmission) => {
    setSubmissions((prev) => [lead, ...prev]);
  };

  const handleCtaScroll = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden text-text-body">
      
      {/* Section 1: STICKY NAVIGATION */}
      <Navbar onOpenAdmin={() => {}} />

      {/* Main assembler segments */}
      <main className="w-full">
        {/* Section 2: HERO SECTION */}
        <ScrollFadeIn>
          <Hero onCtas={handleCtaScroll} />
        </ScrollFadeIn>

        {/* Section 3: TRUSTED BY BRANDS */}
        <ScrollFadeIn>
          <TrustedBy />
        </ScrollFadeIn>

        {/* Section 4: SERVICES / FEATURES */}
        <ScrollFadeIn>
          <Services />
        </ScrollFadeIn>

        {/* Section 5: HOW IT WORKS */}
        <ScrollFadeIn>
          <HowItWorks />
        </ScrollFadeIn>

        {/* Section 6: STATS SECTION COUNT METRICS */}
        <ScrollFadeIn>
          <Stats />
        </ScrollFadeIn>

        {/* Section 7: CASE STUDIES */}
        <ScrollFadeIn>
          <CaseStudies />
        </ScrollFadeIn>

        {/* Section 9: CONTACT US DETAILS */}
        <ScrollFadeIn>
          <ContactForm onAddLead={handleAddLead} onSubmitCount={submissions.length} />
        </ScrollFadeIn>

        {/* Section 11: FAQ */}
        <ScrollFadeIn>
          <FAQ />
        </ScrollFadeIn>

        {/* Section 12: LEAD GENERATION INTERACTIVE BANNER */}
        <ScrollFadeIn>
          <LeadBanner onAddLead={handleAddLead} />
        </ScrollFadeIn>
      </main>

      {/* Section 13: FOOTER */}
      <Footer />
    </div>
  );
}
