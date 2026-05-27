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

  /* Google Sheets Integration state */
  const [showSyncSettings, setShowSyncSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem('grow_sheet_webhook_url') || '');
  const [copiedScript, setCopiedScript] = useState(false);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);
  const [testingConnection, setTestingConnection] = useState(false);

  const googleAppsScriptCode = `/* Google Apps Script to copy & paste into Extensions -> Apps Script */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date().toLocaleString(),
      data.id || "",
      data.name || "",
      data.email || "",
      data.brandName || "",
      data.website || "",
      data.budget || "",
      data.message || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleSaveWebhook = (url: string) => {
    localStorage.setItem('grow_sheet_webhook_url', url.trim());
    setWebhookUrl(url.trim());
    setTestSuccess(null);
  };

  const handleTestConnection = async () => {
    if (!webhookUrl) return;
    setTestingConnection(true);
    setTestSuccess(null);
    try {
      const payload = {
        id: "TEST-SYNC",
        name: "Test Connection",
        email: "test@growthinfluentialas.com",
        brandName: "Agency Sheet Sync",
        website: "https://growthinfluentialas.com",
        budget: "N/A",
        message: "Sheet sync validation system test"
      };
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setTestSuccess(true);
    } catch (e) {
      console.error(e);
      setTestSuccess(false);
    } finally {
      setTestingConnection(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

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
                    <h5 className="font-bold text-text-dark">Hotline Support</h5>
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
                <div className="border-b border-border/40 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-lg text-text-dark">Inquiry Details</h3>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-widest font-semibold">Scale Your Story With Us</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSyncSettings(!showSyncSettings)}
                    className="p-2 text-text-muted hover:text-primary transition-colors hover:bg-surface rounded-xl border border-transparent hover:border-border/60 cursor-pointer flex items-center gap-1.5 text-[11px] font-semibold"
                    title="Google Sheets Automation Sync Settings"
                  >
                    <Settings className={`w-4 h-4 text-text-dark hover:text-primary ${showSyncSettings ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline text-[10px] text-text-muted font-bold tracking-wider uppercase">Sheet Sync</span>
                  </button>
                </div>

                {/* Google Sheets Automation Widget */}
                {showSyncSettings && (
                  <div className="bg-surface rounded-2xl p-4.5 border border-border/70 flex flex-col gap-4 animate-fade-in text-xs text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-extrabold text-sm text-text-dark flex items-center gap-1.5">
                        <span>📊 Google Sheet Sync Automation</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowSyncSettings(false)}
                        className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                      >
                        Minimize
                      </button>
                    </div>

                    <p className="text-[11px] text-text-body leading-relaxed">
                      Automatically route form bookings and quick CTA submissions to your targeted Google Sheet:
                      <br />
                      <a
                        href="https://docs.google.com/spreadsheets/d/1uHb2ANN5La-crXUcrdZ4BsZKgJz77Rtr9db6x6U2PTc/edit?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary font-semibold hover:underline break-all mt-1 inline-block"
                      >
                        1uHb2ANN5La-crXUcrdZ4BsZKgJz77Rtr9db6x6U2PTc
                      </a>
                    </p>

                    <div className="flex flex-col gap-2 bg-white rounded-xl p-3 border border-border/50">
                      <span className="font-bold text-[10px] text-text-dark uppercase tracking-wide">
                        1. Copy Google Apps Script
                      </span>
                      <p className="text-[10px] text-text-muted">
                        In your spreadsheet, go to <span className="font-semibold text-text-dark">Extensions → Apps Script</span>, delete any existing placeholder code, and paste this verified snippet:
                      </p>
                      <div className="relative mt-1">
                        <pre className="bg-background text-[10px] text-text-body font-mono p-3 rounded-lg overflow-x-auto border border-border/60 max-h-36">
                          {googleAppsScriptCode}
                        </pre>
                        <button
                          type="button"
                          onClick={handleCopyScript}
                          className="absolute top-2 right-2 bg-primary hover:bg-primary-mid text-white px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none transition-all"
                        >
                          {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedScript ? 'Copied!' : 'Copy Code'}
                        </button>
                      </div>
                      <p className="text-[10px] text-text-muted font-bold mt-1">
                        👉 Click "Deploy" → "New deployment" → Choose type "Web App" → Set "Execute as: Me" and "Who has access: Anyone" → Deploy & click Authorize!
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                        <span>2. Paste Deployed Web App URL</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="e.g. https://script.google.com/macros/s/AKfycb.../exec"
                          value={webhookUrl}
                          onChange={(e) => handleSaveWebhook(e.target.value)}
                          className="flex-1 bg-white border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-mid text-text-dark font-medium placeholder:text-text-muted/50"
                        />
                        <button
                          type="button"
                          disabled={!webhookUrl || testingConnection}
                          onClick={handleTestConnection}
                          className="px-4 py-2 bg-text-dark hover:bg-text-body text-white font-bold rounded-xl text-[11px] transition-all disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                        >
                          {testingConnection ? 'Testing...' : 'Test Connection'}
                        </button>
                      </div>
                      {testSuccess === true && (
                        <p className="text-[10px] text-primary font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Webhook saved! A sync test-payload has been dispatched.
                        </p>
                      )}
                      {testSuccess === false && (
                        <p className="text-[10px] text-red-500 font-bold">
                          ⚠️ Sync Connection tested. Please ensure Apps Script allows Anyone (including anonymous) access.
                        </p>
                      )}
                    </div>
                  </div>
                )}

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
