import { Sparkles, Layers, BarChart3, Compass, CheckSquare, ShieldX } from 'lucide-react';

export default function Services() {
  const servicesData = [
    {
      icon: Sparkles,
      title: 'AI-Powered Creator Matching',
      desc: 'We find the exact creators your audience trusts, using advanced contextual and demographic alignment.'
    },
    {
      icon: Layers,
      title: 'End-to-End Campaign Management',
      desc: 'Brief to publish, fully managed by our expert team so your in-house teams can stay focused.'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      desc: 'Real-time client dashboard with verified ROI, click tracking, reach, conversion, and engagement data.'
    },
    {
      icon: Compass,
      title: 'Strategy & Creative Direction',
      desc: 'Highly aligned storytelling concepts, native audience briefs, and direct script/caption style consultation.'
    },
    {
      icon: CheckSquare,
      title: 'Content Review & Approval',
      desc: 'Robust workflow to preview, edit, and sign off on creative assets before anything goes live.'
    },
    {
      icon: ShieldX,
      title: 'Fraud & Fake follower Detection',
      desc: 'Every single content creator is heavily audited mechanically and manually for pristine audience authenticity.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-background relative z-10 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="font-display text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Agency Capabilities
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-dark tracking-tight leading-tight">
            Everything Your Brand Needs to Win at Influencer Marketing
          </h2>
          <div className="h-1 w-20 bg-primary-light rounded mt-5" />
        </div>

        {/* 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, idx) => (
            <div
              key={idx}
              className="group relative bg-surface border border-border/50 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:bg-white overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(74, 92, 26, 0.04)'
              }}
            >
              {/* Left edge dynamic accent border on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 bg-primary transition-all duration-300" />

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-white border border-border/60 flex items-center justify-center text-primary mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <service.icon className="w-5 h-5" />
              </div>

              {/* Card Title */}
              <h3 className="font-display font-bold text-base text-text-dark mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs text-text-muted leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
