import { ArrowRight, Sparkles, CheckCircle, TrendingUp, Users, Heart } from 'lucide-react';

interface HeroProps {
  onCtas: (targetId: string) => void;
}

export default function Hero({ onCtas }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* GLOWING AMBIENT OBLOB GRADIENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1 */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-light/10 blur-[120px] mix-blend-multiply"
          style={{
            animation: 'floatBlob1 18s ease-in-out infinite alternate'
          }}
        />
        {/* Blob 2 */}
        <div 
          className="absolute top-[40%] -right-[10%] w-[45%] h-[45%] rounded-full bg-primary/8 blur-[100px] mix-blend-multiply"
          style={{
            animation: 'floatBlob2 14s ease-in-out infinite alternate'
          }}
        />
        {/* Blob 3 */}
        <div 
          className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-primary-light/15 blur-[90px]"
          style={{
            animation: 'floatBlob3 16s ease-in-out infinite alternate'
          }}
        />

        {/* CSS Animation Keyframes for drift */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes floatBlob1 {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(40px, -60px) scale(1.1); }
            100% { transform: translate(-20px, 40px) scale(0.95); }
          }
          @keyframes floatBlob2 {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-60px, 30px) scale(0.9); }
            100% { transform: translate(30px, -5 \t0px) scale(1.05); }
          }
          @keyframes floatBlob3 {
            0% { transform: translate(0px, 0px) scale(0.95); }
            50% { transform: translate(50px, 50px) scale(1.1); }
            100% { transform: translate(-30px, -30px) scale(1); }
          }
        `}} />

        {/* Thin minimalist grid patterns representing modern influencer dashboard grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#A8B87A0a_1px,transparent_1px),linear-gradient(to_bottom,#A8B87A0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 w-full z-10 text-center flex flex-col items-center">
        {/* LEFT TEXT CONTENT (centered) */}
        <div className="flex flex-col items-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 w-fit mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-primary">
              Premium Creator Matchmaking
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-dark leading-[1.08] tracking-tight mb-6 max-w-4xl">
            We Help Brands <span className="text-primary">Scale Their Story</span> With the Right Influencers
          </h1>

          <p className="font-sans text-base md:text-lg text-text-body leading-relaxed max-w-2.5xl mb-8">
            Grow Influentials connects ambitious brands with vetted creators across every niche — driving real engagement, real reach, and real revenue.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-16 w-full sm:w-auto">
            <button
              onClick={() => onCtas('contact')}
              className="px-8 py-4 rounded-full bg-primary hover:bg-primary-mid text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Get a Free Strategy Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onCtas('case-studies')}
              className="px-8 py-4 rounded-full border border-primary/40 text-primary hover:text-primary hover:border-primary hover:bg-surface text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              See Our Work
            </button>
          </div>

          {/* 3 Floating Stat Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
            {[
              { label: '500+ Campaigns', desc: 'Vetted scale & delivery' },
              { label: '12M+ Total Reach', desc: 'Across top social channels' },
              { label: '94% Retention', desc: 'Long-term brand trust' }
            ].map((pill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-border/80 rounded-2xl p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md justify-start"
              >
                <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center text-primary flex-shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-xs uppercase text-text-dark leading-tight">
                    {pill.label}
                  </h4>
                  <p className="text-[10px] text-text-muted">
                    {pill.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
