import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2680&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop',
];

export function BrandImagery() {
  const footerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(bgRef.current, {
            clipPath: `inset(${(1 - self.progress) * 100}% 0 0 0)`,
            duration: 0.1,
            ease: 'none',
          });
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-background pt-32">
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-0 px-8">
        {images.map((src, i) => (
          <div key={i} className="relative w-full overflow-hidden group mb-0 break-inside-avoid cursor-pointer">
            <div className="relative w-full h-full aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img 
                src={src} 
                alt="Brand Imagery" 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                referrerPolicy="no-referrer"
              />
              {/* Fake RGB Split using mix-blend */}
              <div className="absolute inset-0 bg-primary mix-blend-screen opacity-0 group-hover:opacity-50 translate-x-[-10px] transition-all duration-300 pointer-events-none" />
              <div className="absolute inset-0 bg-accent-green mix-blend-screen opacity-0 group-hover:opacity-50 translate-x-[10px] transition-all duration-300 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Giant Footer */}
      <div ref={footerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background mt-32">
        <h2 className="absolute z-10 font-heading text-[10vw] font-bold text-white leading-none uppercase tracking-tighter text-center">
          Embrace<br/>Fluidity
        </h2>
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-accent-green z-20 flex items-center justify-center"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <h2 className="font-heading text-[10vw] font-bold text-background leading-none uppercase tracking-tighter text-center">
            Embrace<br/>Fluidity
          </h2>
        </div>
      </div>
    </section>
  );
}
