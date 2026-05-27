export default function TrustedBy() {
  const brands = [
    { name: 'LumiSkin', weight: 'font-bold tracking-tight' },
    { name: 'HarvestBox', weight: 'font-semibold tracking-wider italic' },
    { name: 'WorkflowAI', weight: 'font-extrabold tracking-normal uppercase' },
    { name: 'Solstice', weight: 'font-medium tracking-[0.2em] uppercase' },
    { name: 'FORMA', weight: 'font-bold tracking-[0.1em]' },
    { name: 'Elixir Co.', weight: 'font-light tracking-wide italic' },
    { name: 'Verdant', weight: 'font-extrabold tracking-widest uppercase' },
    { name: 'Apex Media', weight: 'font-semibold tracking-tight' }
  ];

  // We duplicate the list to ensure seamless endless carousel looping
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-white border-y border-border/40 overflow-hidden relative z-10 w-full select-none">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="font-display text-[10px] uppercase font-bold tracking-[0.2em] text-center text-text-muted">
          Trusted by growth-focused brands
        </p>
      </div>

      {/* INFINITE MARQUEE INNER CONTAINER */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Soft edge fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Soft edge fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-12 sm:gap-16 py-3 items-center whitespace-nowrap">
          {duplicatedBrands.map((brand, idx) => (
            <div
              key={idx}
              className={`text-xl sm:text-2xl text-text-muted/50 hover:text-primary transition-colors duration-300 select-none cursor-default flex items-center ${brand.weight}`}
            >
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
