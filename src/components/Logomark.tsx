import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Logo3D({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + progress * Math.PI * 2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1 + progress * Math.PI;
    }
    
    if (meshRef.current) {
      // Morph shape by scaling
      const scale = 1 - progress * 0.5;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (materialRef.current) {
      // Transition from metal to glass
      materialRef.current.metalness = 0.9 - progress * 0.8;
      materialRef.current.transmission = progress * 0.9;
      materialRef.current.ior = 1.5 + progress * 0.5;
      materialRef.current.thickness = progress * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshPhysicalMaterial
            ref={materialRef}
            color="#FF2A54"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Logomark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: textRef.current,
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-background">
      <div className="absolute inset-0 flex">
        {/* Sticky Left Panel */}
        <div ref={textRef} className="w-1/2 h-screen p-12 flex flex-col justify-center relative z-10">
          <div className="max-w-md p-8 rounded-3xl bg-surface/40 backdrop-blur-2xl border border-white/5 shadow-2xl">
            <h2 className="font-heading text-4xl font-bold text-white mb-6 uppercase tracking-tighter">
              Logomark Evolution
            </h2>
            <p className="font-body text-lg text-white/70 mb-8 leading-relaxed">
              The primary lockup is designed to be fluid. As constraints tighten, the mark physically melts into its compact form, retaining its core geometric DNA while adapting to its environment.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="font-body text-sm font-bold text-white uppercase tracking-widest">Clear Space</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-accent-green" />
                <span className="font-body text-sm font-bold text-white uppercase tracking-widest">Minimum Size</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Canvas Area */}
        <div className="w-1/2 h-screen sticky top-0 right-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Logo3D progress={progress} />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
            <Environment preset="city" />
          </Canvas>
          
          {/* Overlay Grid/Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF2A54" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
