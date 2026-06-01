import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'How do you vet influencers in your network?',
      answer: 'Every creator undergoes a rigorous multi-tier audit. We check historical engagement ratios, audience demographics, and geographic distribution. Additionally, we verify audience quality using advanced systems checking for fake or silent followers, ensuring 100% brand-safe alignment.'
    },
    {
      id: 2,
      question: 'What niches and industries do you work with?',
      answer: 'We have pre-vetted creators in Fashion & Beauty, Tech & Gadgets, Health & Fitness, Food & Lifestyle, Personal Finance, Travel, Esports & Gaming, and B2B SaaS/Business Solutions. We also have capability to source bespoke creator pools for highly niche topics.'
    },
    {
      id: 3,
      question: 'How long does it take to launch a campaign?',
      answer: 'Typically, a standard campaign goes from finalized briefing to live deployment in 2 to 3 weeks. This includes the matchmaker shortlisting phase, creator briefing, secure contract execution, draft assets staging, and synchronized publication.'
    },
    {
      id: 4,
      question: 'Do you handle content creation or just distribution?',
      answer: 'We coordinate both! The matched creators shoot original authentic assets based on the creative constraints, securing raw native audience feel. We then manage the secure workflow staging, editing sign-offs, and final organic + paid distribution.'
    },
    {
      id: 5,
      question: 'What platforms do you cover?',
      answer: 'Our core active networks are on Instagram Reels/Stories, YouTube (Deep integration videos + Shorts), and TikTok. We optimize platform selection based purely on your brief and targeted conversion goals.'
    },
    {
      id: 6,
      question: 'How do you measure campaign ROI?',
      answer: 'We configure custom, real-time client tracking metrics. You can log into your Grow Live Dashboard to track direct impressions, real-time clicks, engagement velocity, and conversion attribution tied directly to custom checkout UTMs.'
    },
    {
      id: 7,
      question: 'What’s the minimum budget to get started?',
      answer: 'Our base campaign execution package starts at ₹1,25,000/month (Discovery tier). This is ideal for testing target creative briefs or Micro pools with high organic efficacy.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-background relative z-10 w-full border-b border-border/40">
      <div className="max-w-4xl mx-auto px-6 text-left">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-display text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Curious Minds
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-dark tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-20 bg-primary-light rounded mx-auto mt-4" />
        </div>

        {/* Accordion Stack list */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-primary-light shadow-md shadow-primary/5 bg-surface/20'
                    : 'border-border/60 hover:border-primary-light/60'
                }`}
              >
                {/* Trigger Button bar */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-extrabold text-[#1A1E0F] text-sm md:text-base pr-4 flex items-center gap-3">
                    <HelpCircle className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-surface border border-border/85 flex items-center justify-center text-primary-mid transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-primary text-white border-primary' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer body wrapper */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[220px] opacity-100 border-t border-border/40' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-5 md:p-6 text-xs md:text-sm text-text-body font-normal leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
