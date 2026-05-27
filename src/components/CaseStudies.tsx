import { useState } from 'react';
import { ArrowRight, X, TrendingUp, Users, Target, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../types';

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'lumiskin',
      brand: 'Beauty & Skincare Campaign',
      category: 'Beauty & Skincare',
      challenge: 'Struggling to stand out in a saturated beauty space, this campaign fought high customer acquisition costs (CAC) and stagnating brand organic awareness on traditional paid social banners.',
      solution: 'Coordinated a synchronized wave of 15 micro and mid-tier clean-skin advocates who focused on authentic, unfiltered AM/PM routine videos showcasing product integrity.',
      metrics: {
        reach: '4.2M total reach',
        engagement: '8.7% engagement rate',
        roas: '3.1x verified ROAS'
      }
    },
    {
      id: 'harvestbox',
      brand: 'D2C Food & Beverage Campaign',
      category: 'D2C Food & Beverage',
      challenge: 'This D2C brand wanted to boost high-retention monthly subscribers for their organic ingredient farm-delivery boxes, without relying on cheap discount codes that erode value.',
      solution: 'Contracted 12 lifestyle food vloggers and home chefs to shoot raw, conversational aesthetic recipe reels using the farm-delivery box elements to generate emotional lifestyle context.',
      metrics: {
        reach: '2.8M impressions',
        engagement: '6.4% conv boost',
        roas: '2.4x subscription ROI'
      }
    },
    {
      id: 'workflowai',
      brand: 'B2B SaaS / Tech Campaign',
      category: 'B2B SaaS / Tech',
      challenge: 'This B2B software venture needed to capture high-authority interest from CTOs and engineering directors, bypassing overcrowded Google Ads and generic software directories.',
      solution: 'Sourced 8 veteran developer and productivity-focused B2B YouTube creators to build highly instructive, deep practical videos on automating standard developer workflows using modern integrations.',
      metrics: {
        reach: '850k high-intent hits',
        engagement: '11.2% click-through',
        roas: '340+ enterprise leads'
      }
    }
  ];

  return (
    <section id="case-studies" className="py-24 bg-surface/30 relative z-10 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="font-display text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Campaign Records
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-dark tracking-tight leading-tight">
            Campaign Case Studies
          </h2>
          <p className="font-sans text-xs md:text-sm text-text-muted mt-3 max-w-xl">
            See how we have helped brands cross vertical categories scale their story and exceed core growth metrics.
          </p>
          <div className="h-1 w-20 bg-primary-light rounded mt-5" />
        </div>

        {/* 3-Col Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-white hover:bg-surface border border-border/50 rounded-3xl p-6 text-left flex flex-col justify-between shadow-md shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group border-t-4 border-t-primary-light"
            >
              <div>
                {/* Category Badge & Brand */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary-light/20 px-3 py-1 rounded-full">
                    {cs.category}
                  </span>
                </div>

                {/* Challenge Block */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#7A8560] mb-1 leading-none">The Challenge</h4>
                  <p className="text-xs text-text-body leading-relaxed line-clamp-2">
                    {cs.challenge}
                  </p>
                </div>

                {/* Solution Block */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#7A8560] mb-1 leading-none">The Strategy</h4>
                  <p className="text-xs text-text-body leading-relaxed line-clamp-2">
                    {cs.solution}
                  </p>
                </div>

                {/* mini grid metrics */}
                <div className="grid grid-cols-3 gap-2.5 bg-surface/60 border border-border/30 rounded-2xl p-3 mb-6">
                  {Object.entries(cs.metrics).map(([key, val], idx) => {
                    const numberPart = val.split(' ')[0];
                    const textLabel = val.split(' ').slice(1).join(' ');
                    return (
                      <div key={idx} className="flex flex-col items-center justify-center text-center">
                        <span className="text-[11px] font-extrabold text-primary leading-tight font-mono">
                          {numberPart}
                        </span>
                        <span className="text-[8px] text-text-muted leading-tight mt-0.5">
                          {textLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action trigger */}
              <button
                onClick={() => setSelectedCase(cs)}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-primary-mid transition-colors mt-auto w-fit cursor-pointer"
              >
                Read Full Case Study
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FULL EXPANDABLE MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-text-dark/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-[32px] border border-border max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close trigger */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface transition-colors text-text-muted hover:text-text-dark cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Brand Info */}
            <div className="mb-6 text-left">
              <span className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedCase.category}
              </span>
              <h3 className="font-display font-bold text-3xl text-text-dark mt-3">
                {selectedCase.brand} Scale Story
              </h3>
              <p className="text-xs text-text-muted mt-1">Verified Growth Study • Campaign Lock #G-{selectedCase.id.toUpperCase()}</p>
            </div>

            <hr className="border-border/60 my-5" />

            {/* In Depth Story Section */}
            <div className="flex flex-col gap-5 text-left text-xs md:text-sm leading-relaxed text-text-body">
              <div>
                <h4 className="font-display font-bold text-text-dark text-xs uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  The Stagnant Baseline (Challenge)
                </h4>
                <p className="pl-6 bg-surface/30 p-3 rounded-xl border border-border/30">
                  {selectedCase.challenge} Through expensive online channels, original target CPA grew by 45%. The core brand struggled to maintain authority without dynamic organic storytelling.
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-text-dark text-xs uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  The Custom Curation Loop (Solution)
                </h4>
                <p className="pl-6 bg-surface/30 p-3 rounded-xl border border-border/30">
                  {selectedCase.solution} Our analytics systems mapped demographic subsets instantly to isolate authentic creators with verified high organic metrics. We curated creative constraints that emphasized unfiltered product utility benefits.
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-text-dark text-xs uppercase tracking-wider flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Delivered Metrics (Verified ROI)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
                    <span className="block font-display font-extrabold text-base md:text-lg text-primary">
                      {selectedCase.metrics.reach.split(' ')[0]}
                    </span>
                    <span className="block text-[9px] text-text-muted font-bold uppercase mt-1 leading-none">
                      {selectedCase.metrics.reach.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
                    <span className="block font-display font-extrabold text-base md:text-lg text-primary">
                      {selectedCase.metrics.engagement.split(' ')[0]}
                    </span>
                    <span className="block text-[9px] text-text-muted font-bold uppercase mt-1 leading-none">
                      {selectedCase.metrics.engagement.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
                    <span className="block font-display font-extrabold text-base md:text-lg text-primary">
                      {selectedCase.metrics.roas.split(' ')[0]}
                    </span>
                    <span className="block text-[9px] text-text-muted font-bold uppercase mt-1 leading-none">
                      {selectedCase.metrics.roas.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal action button */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-6 py-2.5 rounded-full border border-border text-xs font-bold text-text-muted hover:bg-surface cursor-pointer"
              >
                Close Case Studio
              </button>
              <a
                href="#contact"
                onClick={() => {
                  setSelectedCase(null);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-mid text-white text-xs font-bold cursor-pointer"
              >
                Book Similar Campaign
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
