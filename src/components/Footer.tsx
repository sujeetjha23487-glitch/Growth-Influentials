import { Linkedin, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const socialIcons = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/grow-influentials/' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' }
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-text-dark text-white pt-20 pb-10 relative overflow-hidden z-10 w-full select-none text-left">
      {/* Decorative Top Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-light/40 via-primary-mid/60 to-primary/80" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
        
        {/* Col 1 (4 grids): Logo and details */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <a href="#home" className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl transition-all">
              <svg viewBox="0 0 100 100" className="w-6 h-6 text-primary-light" fill="currentColor">
                <path d="M75,25 C55,25 35,45 25,75 C45,75 75,55 75,25" />
                <path d="M25,75 L15,85" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg leading-none tracking-tight text-white">
                Grow Influentials
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-primary-light mt-0.5 leading-none">
                Scale Your Story
              </span>
            </div>
          </a>

          <p className="font-sans text-xs text-white/60 leading-relaxed max-w-sm">
            We connect ambitious brands with pre-vetted influencers cross vertical categories to deliver authentic, high-velocity engagement and verified campaign ROI.
          </p>

          {/* Connected Social rows */}
          <div className="flex items-center gap-3 mt-2">
            {socialIcons.map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:bg-primary transition-all duration-300"
              >
                <soc.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 (2.5 grids): Services */}
        <div className="lg:col-span-2.5 flex flex-col gap-4">
          <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-[#A8B87A]">
            Services
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-white/60">
            {['Creator Matchmaking', 'Brief Orchestration', 'Staging Workspaces', 'Automated Escrows', 'Performance ROI Tracking', 'Audience Vetting'].map((item) => (
              <li key={item}>
                <a href="#services" className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 (2.5 grids): Company links */}
        <div className="lg:col-span-2.5 flex flex-col gap-4">
          <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-[#A8B87A]">
            Agency
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-white/60">
            {['About Our Mission', 'Success Case Studies', 'Curation Blueprint', 'Investment Plans', 'Frequently Asked Questions', 'Press Media Kits', 'Careers'].map((item) => (
              <li key={item}>
                <a href={item === 'Success Case Studies' ? '#case-studies' : item === 'Investment Plans' ? '#pricing' : '#how-it-works'} className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 (3 grids): Contact information */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-[#A8B87A]">
            Corporate Info
          </h4>
          <div className="flex flex-col gap-3 text-xs text-white/60">
            <div>
              <span className="block font-bold text-white/80 select-all font-mono">hello@growthinfluentialas.com</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Response within 24 business hours</span>
            </div>
            <div>
              <span className="block font-medium text-white/70 font-mono">Phone: +91 9315189074</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Direct growth & strategy consultations</span>
            </div>
            {/* Direct up-to-top trigger */}
            <button
              onClick={handleScrollTop}
              className="mt-4 flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-primary px-4 py-2 rounded-xl text-[10px] font-bold text-white/84 transition-all w-fit cursor-pointer"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/45 font-medium select-none">
        <span className="font-sans text-center sm:text-left">
          © 2025 Grow Influentials Inc. All rights reserved. Registered USA CRM system.
        </span>
        <div className="flex gap-4 items-center">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-white/20">|</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span className="text-white/20">|</span>
          <a href="#" className="hover:text-white transition-colors">Digital Millenium Compliance</a>
        </div>
      </div>
    </footer>
  );
}
