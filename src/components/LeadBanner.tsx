import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { LeadSubmission } from '../types';

interface LeadBannerProps {
  onAddLead: (lead: LeadSubmission) => void;
}

export default function LeadBanner({ onAddLead }: LeadBannerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    const ticketId = 'G-LEAD-' + Math.floor(Math.random() * 90000 + 10000);
    const leadPayload: LeadSubmission = {
      id: ticketId,
      name,
      email,
      budget: 'Growth Machine (Fast-Tracked Quick-Call)',
      message: 'Quick-call request from bottom CTA Banner.',
      submittedAt: new Date().toISOString()
    };

    try {
      // Direct POST to configured webhook if set
      const sheetWebhookUrl = localStorage.getItem('grow_sheet_webhook_url') || '';
      if (sheetWebhookUrl.trim()) {
        await fetch(sheetWebhookUrl.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        });
      }

      // Sync with master CRM
      onAddLead(leadPayload);
      setSuccess(true);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Quietly fallback local save:', err);
      onAddLead(leadPayload);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden z-10 w-full select-none text-center">
      
      {/* Dynamic diagonal stripe styling accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#A8B87A30_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none opacity-60" />
      <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(168,184,122,0.12)_0,transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Sparkle Tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-primary-light" />
          <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-primary-light">
            Fast Track Strategy Call
          </span>
        </div>

        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 max-w-2xl mx-auto leading-[1.12]">
          Ready to Scale Your Story?
        </h2>

        <p className="font-sans text-white/80 text-xs md:text-sm max-w-lg mx-auto mb-10 leading-relaxed">
          Book a free 30-minute strategy call. No commitment, just hyper-focused campaign clarity.
        </p>

        {success ? (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6.5 border border-white/15 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-light mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-2">Thanks! We'll be in touch within 24 hours.</h4>
            <p className="text-xs text-white/70">Our creative growth strategist is auditing your brand parameters.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch justify-center">
            <input
              required
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-white text-text-dark text-xs font-medium rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary-light border-0 placeholder:text-text-muted/60 min-h-[48px]"
            />
            <input
              required
              type="email"
              placeholder="Corporate Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-text-dark text-xs font-medium rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary-light border-0 placeholder:text-text-muted/60 min-h-[48px]"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-8 bg-white hover:bg-surface text-primary font-black tracking-wider uppercase rounded-xl text-xs transition-all duration-300 min-h-[48px] shadow-lg shadow-black/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Booking...' : 'Book My Free Call'}
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Small Trust caption */}
        <p className="text-white/60 text-[10px] sm:text-xs mt-6 flex items-center justify-center gap-1.5 font-medium select-none">
          <ShieldCheck className="w-4 h-4 text-primary-light" /> No spam. No hard sell. Just high-ROI creator strategy.
        </p>
      </div>
    </section>
  );
}
