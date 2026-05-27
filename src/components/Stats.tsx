import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  target: number;
  suffix?: string;
}

function CountUp({ target, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic Out easing
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = Math.floor(ease * target);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <span ref={elementRef} className="font-display font-bold tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statsData = [
    { target: 500, suffix: '+', label: 'Campaigns Delivered' },
    { target: 12, suffix: 'M+', label: 'Reach Generated' },
    { target: 200, suffix: '+', label: 'Vetted Creators' },
    { target: 94, suffix: '%', label: 'Client Retention Rate' }
  ];

  return (
    <section className="py-20 bg-text-dark text-white relative overflow-hidden z-10 w-full select-none">
      
      {/* Subtle Grid Dot Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#A8B87A20_1px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-80" />
      
      {/* Decorative vertical divider lights */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-white/0 via-primary-light/10 to-white/0" />
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-white/0 via-primary-light/10 to-white/0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center group"
            >
              {/* Stat representation */}
              <div className="text-4xl md:text-5xl lg:text-6xl text-primary-light font-display font-bold leading-none mb-3 drop-shadow-[0_2px_10px_rgba(168,184,122,0.15)]">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              
              {/* Divider bar */}
              <div className="w-8 h-0.5 bg-primary-light/40 group-hover:w-16 group-hover:bg-primary-light transition-all duration-300 mt-2 mb-3.5 rounded" />

              {/* Label */}
              <p className="text-xs md:text-sm font-sans font-medium tracking-wide text-white/70 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
