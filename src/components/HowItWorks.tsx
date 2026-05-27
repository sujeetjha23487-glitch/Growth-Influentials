import { Edit, Users, Play, BarChart4 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Share Your Brief',
      desc: 'Tell us your brand objectives, budget, target demographics, and required channels. Whether looking for organic engagement, high-end Instagram lifestyle placements, or deep YouTube product reviews, we lock down alignment early.',
      icon: Edit,
      illustration: (
        <div className="w-full h-full min-h-[220px] bg-white border border-border/60 rounded-2xl p-5 flex flex-col gap-4 shadow-sm relative overflow-hidden group">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#A8B87A04_1px,transparent_1px),linear-gradient(to_bottom,#A8B87A04_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">Brief Deck</span>
            <span className="text-[10px] font-mono text-text-muted">ID: #9439A</span>
          </div>
          <div className="flex flex-col gap-2.5 z-10 text-left">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-muted font-medium">Budget Target</span>
              <span className="text-text-dark font-bold bg-surface px-2.5 py-0.5 rounded">$25,000+</span>
            </div>
            <div className="w-full bg-surface/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-mid h-full w-[70%]" />
            </div>
            
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-text-muted font-medium">Audience Niche</span>
              <span className="text-text-dark font-semibold">Clean Skincare & D2C Foodies</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-muted font-medium">Core Channels</span>
              <span className="text-primary font-bold">Instagram Reels, YouTube Shorts</span>
            </div>
          </div>
          {/* Status completion block */}
          <div className="mt-auto bg-surface/50 border border-border/40 rounded-xl p-2.5 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">✓</div>
              <span className="text-[10px] font-bold text-text-dark">Goals Confirmed</span>
            </div>
            <span className="text-[9px] bg-primary text-white font-bold px-1.5 py-0.5 rounded-md">Lock in</span>
          </div>
        </div>
      )
    },
    {
      num: '02',
      title: 'We Match Your Creators',
      desc: 'Our proprietary curation pipeline extracts direct affinity matches from our database of 200+ fully-vetted creators. We ensure target audience authenticity by auditing historical engagement, verified fake-follower ratios, and brand safety logs.',
      icon: Users,
      illustration: (
        <div className="w-full h-full min-h-[220px] bg-white border border-border/60 rounded-2xl p-5 flex flex-col gap-4 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">Matchmaker Panel</span>
            <span className="text-[10px] font-bold text-primary">Curation Active</span>
          </div>
          {/* Creator card stacks */}
          <div className="flex flex-col gap-2 relative">
            {[
              { name: 'Elena R.', niche: 'Beauty & Wellness', score: '98%', init: 'ER' },
              { name: 'Marcus K.', niche: 'Tech Tech reviewer', score: '94%', init: 'MK' },
              { name: 'Sarah Jin', niche: 'Chef & Baker', score: '91%', init: 'SJ' }
            ].map((cre, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-surface/40 hover:bg-surface border border-border/30 rounded-xl p-2 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary font-bold text-white text-[10px] flex items-center justify-center">
                    {cre.init}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-text-dark">{cre.name}</span>
                    <span className="text-[9px] text-text-muted leading-none">{cre.niche}</span>
                  </div>
                </div>
                {/* Affinity Score */}
                <div className="text-right flex flex-col items-end">
                  <span className="text-[9px] text-text-muted leading-none uppercase font-semibold">Affinity</span>
                  <span className="text-[10px] font-extrabold text-primary leading-tight">{cre.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'Campaign Goes Live',
      desc: 'Through our dedicated staging environment, brands inspect and sign-off on individual creator assets before publishing. Content is deployed collaboratively at synchronized peak-performance times for maximum viral distribution.',
      icon: Play,
      illustration: (
        <div className="w-full h-full min-h-[220px] bg-white border border-border/60 rounded-2xl p-5 flex flex-col gap-3 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">Staging Workspace</span>
            <span className="text-[9px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Publishing Ready
            </span>
          </div>
          {/* Live Mobile Post Mockup */}
          <div className="bg-surface/30 border border-border/40 rounded-xl p-3 flex flex-col gap-2 relative text-left">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary-mid text-white text-[8px] font-bold flex items-center justify-center">ER</div>
              <span className="text-[10px] font-bold text-text-dark">Elena R. @elena.skin</span>
            </div>
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-2 flex items-center justify-between text-[10px] mt-1 text-text-body">
              <span>"✨ Absolute gamechanger for my AM routine..."</span>
              <span className="text-primary font-bold">#ad</span>
            </div>
            {/* Live engagement counters */}
            <div className="flex gap-4 mt-1 text-[9px] text-text-muted font-semibold">
              <span>❤ 4,895 Likes</span>
              <span>💬 412 Comments</span>
              <span>↗ 839 Shares</span>
            </div>
          </div>
        </div>
      )
    },
    {
      num: '04',
      title: 'Measure & Scale',
      desc: 'Log in to your Live ROI and tracking dashboard to analyze real-time demographic, click-through, and conversion statistics. Easily re-brief and scale top-performing creators to double down on what works.',
      icon: BarChart4,
      illustration: (
        <div className="w-full h-full min-h-[220px] bg-white border border-border/60 rounded-2xl p-5 flex flex-col gap-3 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">Real-Time ROI</span>
            <span className="text-[10px] font-bold text-primary font-mono">📈 ROAS: 3.4x</span>
          </div>
          <div className="h-28 flex flex-col justify-end mt-2">
            {/* Elegant SVG/CSS Scale Line Graph */}
            <div className="relative w-full h-20 flex items-end">
              <svg className="absolute inset-0 w-full h-full text-primary" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path
                  d="M0,45 Q20,38 40,25 T80,10 T100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0,45 Q20,38 40,25 T80,10 T100,5 L100,50 L0,50 Z"
                  fill="url(#gradient-scale)"
                  opacity="0.12"
                />
                <defs>
                  <linearGradient id="gradient-scale" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Highlight pointer */}
              <div className="absolute right-[10%] top-[4%] w-3 h-3 rounded-full bg-primary border-2 border-white shadow-md animate-ping" />
              <div className="absolute right-[10%] top-[4%] w-2.5 h-2.5 rounded-full bg-primary border-2 border-white shadow-md" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-text-muted mt-2 font-semibold">
              <span>Briefing</span>
              <span>Deploying</span>
              <span>Profit Scaling</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-surface/40 relative z-10 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-20">
          <span className="font-display text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Campaign Blueprint
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-dark tracking-tight leading-tight">
            From Brief to Results in 4 Simple Steps
          </h2>
          <div className="h-1 w-20 bg-primary-light rounded mt-5" />
        </div>

        {/* Alternate steps grid */}
        <div className="relative flex flex-col gap-20">
          {/* Dashed background connector line (desktop-only) */}
          <div className="absolute left-1/2 top-10 bottom-10 w-0.5 border-l-2 border-dashed border-border/80 -translate-x-1/2 hidden lg:block z-0" />

          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Illustration Cover block (5 columns) */}
                <div
                  className={`lg:col-span-5 order-2 ${
                    isEven ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'
                  }`}
                >
                  <div className="relative p-2 bg-surface rounded-[24px] border border-border/80 shadow-md shadow-primary/5 aspect-[4/3] flex items-center justify-center">
                    {step.illustration}
                  </div>
                </div>

                {/* Vertical Step Number Circle (2 columns desktop, hidden on mobile) */}
                <div className="hidden lg:col-span-2 lg:flex justify-center items-center order-2">
                  <div className="w-16 h-16 bg-white border border-border shadow-md rounded-full flex items-center justify-center font-display font-extrabold text-sm text-primary z-20 group-hover:bg-primary group-hover:text-white transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Text Context Columns (5 columns) */}
                <div
                  className={`lg:col-span-5 text-left flex flex-col order-1 ${
                    isEven ? 'lg:order-1 lg:col-span-5' : 'lg:order-3 lg:col-start-8'
                  }`}
                >
                  {/* Step Number styling background */}
                  <div className="relative flex items-center gap-3 mb-3">
                    <span className="font-display tracking-tight text-8xl font-black text-primary/10 select-none leading-none -ml-2">
                      {step.num}
                    </span>
                    <div className="h-px bg-border/80 flex-grow" />
                  </div>

                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-text-dark mb-4">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-text-body leading-relaxed">
                    {step.desc}
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
