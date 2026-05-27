import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['home', 'services', 'how-it-works', 'case-studies', 'contact', 'faq'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky nav
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-lg shadow-primary/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 group"
        >
          {/* Custom inline leaf and growth arrow logo inspired by brand design */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-surface rounded-xl border border-border/80 group-hover:bg-primary-light/20 transition-all">
            {/* Soft background translucent leaf outline */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full text-primary-light/30 transition-transform group-hover:scale-110"
              fill="currentColor"
            >
              <path d="M75,25 C55,25 35,45 25,75 C45,75 75,55 75,25" />
            </svg>
            {/* Main sharp green leaf */}
            <svg
              viewBox="0 0 100 100"
              className="w-6 h-6 text-primary transition-transform group-hover:rotate-6"
              fill="currentColor"
            >
              <path d="M75,25 C55,25 35,45 25,75 C45,75 75,55 75,25" />
              {/* Stem */}
              <path
                d="M25,75 L15,85"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            {/* High-growth indicator vertical arrow right */}
            <div className="absolute right-0 top-1 text-primary-mid scale-75 animate-bounce">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none text-text-dark tracking-tight">
              Grow Influentials
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-text-muted mt-0.5 leading-none">
              Scale Your Story
            </span>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: 'Home', id: 'home' },
            { label: 'Services', id: 'services' },
            { label: 'Case Studies', id: 'case-studies' },
            { label: 'Contact', id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                activeSection === item.id
                  ? 'bg-surface text-primary'
                  : 'text-text-muted hover:text-primary hover:bg-surface/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA BUTTONS / ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 py-2 rounded-full bg-primary hover:bg-primary-mid text-white text-[11px] font-bold transition-all duration-200 shadow-md shadow-primary/10 cursor-pointer"
          >
            Get a Free Strategy Call
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-text-dark hover:bg-surface transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE NAV DRAWER */}
      <div
        className={`fixed top-[64px] left-0 right-0 bg-background border-b border-border shadow-xl md:hidden overflow-hidden transition-all duration-300 z-40 ${
          isMobileMenuOpen ? 'max-h-[380px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col px-6 gap-4">
          {[
            { label: 'Home', id: 'home' },
            { label: 'Services', id: 'services' },
            { label: 'Case Studies', id: 'case-studies' },
            { label: 'Contact', id: 'contact' },
            { label: 'FAQs', id: 'faq' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left py-2 font-display text-base font-semibold ${
                activeSection === item.id ? 'text-primary' : 'text-text-muted hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
          <hr className="border-border my-2" />
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-center py-3 rounded-full bg-primary hover:bg-primary-mid text-white text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
            >
              Get a Free Strategy Call
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
