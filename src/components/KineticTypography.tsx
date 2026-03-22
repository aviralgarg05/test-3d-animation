import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !text1Ref.current || !text2Ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(text1Ref.current, { x: -progress * 500, duration: 0.5, ease: 'power2.out' });
          gsap.to(text2Ref.current, { x: progress * 500, duration: 0.5, ease: 'power2.out' });
          
          // Simulate variable font stretch based on velocity
          const velocity = Math.abs(self.getVelocity());
          const scaleX = Math.min(1.5, 1 + velocity / 5000);
          gsap.to([text1Ref.current, text2Ref.current], {
            scaleX: scaleX,
            duration: 0.2,
            ease: 'power1.out',
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-background flex flex-col justify-center overflow-hidden py-32">
      <div className="relative z-10 flex flex-col gap-16 whitespace-nowrap">
        <h2 
          ref={text1Ref}
          className="font-heading text-[140px] font-bold text-white leading-none uppercase tracking-tighter text-outline text-outline-hover transition-colors duration-300 cursor-default origin-left"
          style={{ willChange: 'transform' }}
        >
          SYNCOPATE 700 SYNCOPATE 700 SYNCOPATE 700
        </h2>
        
        <h3 
          ref={text2Ref}
          className="font-body text-[48px] font-bold text-primary leading-none uppercase tracking-[0.2em] ml-[-20vw] cursor-default hover:text-accent-green transition-colors duration-300 origin-right"
          style={{ willChange: 'transform' }}
        >
          SPACE GROTESK 400 SPACE GROTESK 400 SPACE GROTESK 400
        </h3>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-accent-purple/10 blur-[120px] pointer-events-none mix-blend-screen" />
    </section>
  );
}
