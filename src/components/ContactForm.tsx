import React, { useState } from 'react';
import { Send, CheckCircle, ShieldAlert, Mail, Phone, Settings, Check, Copy, HelpCircle } from 'lucide-react';
import { LeadSubmission } from '../types';

interface ContactFormProps {
  onAddLead: (lead: LeadSubmission) => void;
  onSubmitCount: number;
}

export default function ContactForm({ onAddLead }: ContactFormProps) {
  /* Form Inputs */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  /* Submission statuses */
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitForm = () => {
    const nameEl = document.getElementById("inp-name") as HTMLInputElement;
    const emailEl = document.getElementById("inp-email") as HTMLInputElement;
    const companyEl = document.getElementById("inp-company") as HTMLInputElement;
    const websiteEl = document.getElementById("inp-website") as HTMLInputElement;
    const goalsEl = document.getElementById("inp-goals") as HTMLTextAreaElement;

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const company = companyEl ? companyEl.value.trim() : '';
    const website = websiteEl ? websiteEl.value.trim() : '';
    const goals = goalsEl ? goalsEl.value.trim() : '';

    if (!name || !email) {
      alert("Please fill in your name and email.");
      return;
    }

    const btn = document.getElementById("submit-btn") as HTMLButtonElement;
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
    }

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "0b748f5a-7f5b-4d14-acae-cf0586b5f9db",
        name,
        email,
        company,
        website,
        goals
      })
    })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        const formEl = document.getElementById("contact-form");
        if (formEl) formEl.style.display = "none";
        const successEl = document.getElementById("success-msg");
        if (successEl) {
          successEl.style.display = "block";
          successEl.innerHTML = `
            <div class="w-16 h-16 rounded-full bg-[#8A9A5B]/10 border border-[#8A9A5B]/20 flex items-center justify-center text-[#8A9A5B] mb-6 shadow-sm">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-display font-black text-2xl text-[#606C38] mb-3">Inquiry Received!</h3>
            <p class="text-[#606C38] text-sm font-semibold max-w-sm leading-relaxed">
              ✅ Thanks ${name}! We'll call you within 24 hours.
            </p>
          `;
        }

        // Also trigger onAddLead to keep local storage sync intact safely
        try {
          const ticketId = 'G-LEAD-' + Math.floor(Math.random() * 90000 + 10000);
          onAddLead({
            id: ticketId,
            name,
            email,
            brandName: company,
            website,
            budget: 'Requested consultation call (Custom Proposal)',
            message: goals,
            submittedAt: new Date().toISOString()
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        alert("Something went wrong. Please try again.");
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Book My Free Call";
        }
      }
    })
    .catch((err) => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Book My Free Call";
      }
      alert("Something went wrong. Please try again.");
      console.error("Submission error:", err);
    });
  };

  return (
    <section id="contact" className="py-24 bg-background relative z-10 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="font-display text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Connect With Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-dark tracking-tight leading-tight">
            Book a Free Creator Strategy Session
          </h2>
          <div className="h-1 w-20 bg-primary-light rounded mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6 text-left">
          {/* Left instructions block (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface rounded-3xl p-8 border border-border/60">
              <h3 className="font-display font-extrabold text-lg text-text-dark mb-4">
                Let's Craft Your Strategy
              </h3>
              <p className="text-xs text-text-body leading-relaxed mb-6">
                Tell us about your brand goals. Our curation strategists will construct a personalized matching campaign brief tailored specifically to your core audience demographics.
              </p>

              <div className="flex flex-col gap-4 text-xs border-t border-border/60 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-border/60 text-primary flex items-center justify-center shadow-sm">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-dark">Email Inquiries</h5>
                    <p className="text-text-muted text-[11px] font-mono select-all">hello@growthinfluentialas.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-border/60 text-primary flex items-center justify-center shadow-sm">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-dark">Phone Number</h5>
                    <p className="text-text-muted text-[11px] font-mono select-all">+91 9315189074</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom info panel */}
            <div className="bg-surface/40 rounded-2xl p-5 border border-border flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-primary-mid flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-text-muted leading-relaxed">
                All strategy requests undergo direct manual reviews. One of our lead advisors will contact you with initial alignment matches within 24 business hours.
              </p>
            </div>
          </div>

          {/* Right inquiry form block (7 columns) */}
          <div className="lg:col-span-7">
            <form
              id="contact-form"
              onSubmit={(e) => { e.preventDefault(); submitForm(); }}
              className="bg-white border border-border/60 rounded-3xl p-6.5 md:p-8 flex flex-col gap-5 shadow-sm"
            >
                
                {/* Visual Header */}
                <div className="border-b border-border/40 pb-4">
                  <h3 className="font-display font-black text-lg text-text-dark">Inquiry Details</h3>
                  <p className="text-[10px] text-text-muted mt-1 uppercase tracking-widest font-semibold">Scale Your Story With Us</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted required flex items-center gap-1">
                      Your Name <span className="text-primary font-bold">*</span>
                    </label>
                    <input
                      required
                      id="inp-name"
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-mid focus:ring-1 focus:ring-primary-mid text-text-dark font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted required flex items-center gap-1">
                      Email Address <span className="text-primary font-bold">*</span>
                    </label>
                    <input
                      required
                      id="inp-email"
                      type="email"
                      placeholder="e.g. sarah@solstice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-mid focus:ring-1 focus:ring-primary-mid text-text-dark font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Brand Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Brand or Company Name
                    </label>
                    <input
                      id="inp-company"
                      type="text"
                      placeholder="e.g. Solstice Wear"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-mid focus:ring-1 focus:ring-primary-mid text-text-dark font-medium"
                    />
                  </div>

                  {/* Website */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Brand Website
                    </label>
                    <input
                      id="inp-website"
                      type="url"
                      placeholder="e.g. https://solstice.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-mid focus:ring-1 focus:ring-primary-mid text-text-dark font-medium"
                    />
                  </div>
                </div>

                {/* Message detail description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Campaign Goals & Target Channels
                  </label>
                  <textarea
                    id="inp-goals"
                    rows={4}
                    placeholder="Briefly tell us about your brand goals. Mention target niches, preferred creator profiles, and timelines."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-mid focus:ring-1 focus:ring-primary-mid text-text-dark font-medium"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="submit-btn"
                  type="button"
                  onClick={submitForm}
                  className="w-full bg-primary hover:bg-primary-mid text-white py-4 rounded-xl text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/10 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Sending Request...' : 'Book My Free Call'}
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Hidden div styled in olive green shown below the form */}
              <div
                id="success-msg"
                style={{ display: 'none' }}
                className="bg-[#FAF9F5] border border-[#CCD9C0] rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[420px] animate-fade-in text-[#606C38] font-bold text-lg"
              >
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
