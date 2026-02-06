"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Scene from "./Scene";
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import gsap from "gsap";

// Custom TikTok icon since Lucide might not have it or it might vary
const TikTok = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.5 });
        
        tl.fromTo(".hero-line", 
            { y: 100, skewY: 7, opacity: 0 },
            { y: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
        );
        
        tl.fromTo(".hero-fade",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
            "-=0.5"
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col pt-24 pb-4 md:pb-8 bg-[#050505] overflow-hidden">
      
      {/* Background Particles (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Scene />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col h-full justify-between">
        
        {/* 1. Centered Stacked Headline - Scaled for 100vh fit */}
        <div className="flex flex-col items-center justify-center text-center flex-grow">
            <h1 className="text-[11vw] md:text-[9vw] lg:text-[7vw] xl:text-[130px] font-[600] leading-[0.85] tracking-tight uppercase text-white">
                <div className="overflow-hidden bg-[#050505] relative z-20">
                    <span className="hero-line block">Digital</span>
                </div>
                <div className="overflow-hidden bg-[#050505] relative z-10 -mt-[1vw] md:-mt-[0.5vw]">
                    <span className="hero-line block text-[#EF6524]">Transformation</span>
                </div>
                <div className="overflow-hidden bg-[#050505] relative z-0 -mt-[1vw] md:-mt-[0.5vw]">
                    <span className="hero-line block">Agency</span>
                </div>
            </h1>
        </div>

        {/* 2. Bottom Grid Layout - Compact for 100% fit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end w-full pb-4">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-5 flex flex-col gap-6 hero-fade">
                <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-lg leading-relaxed font-light hidden md:block">
                    We turn ideas into effective digital solutions that simplify your workflow and enhance user experience. Every design is crafted with clarity, creativity, and purpose.
                </p>
                <div className="flex items-center gap-4">
                    <Link 
                        href="/projects"
                        className="px-6 py-3 md:px-8 md:py-4 bg-[#EF6524] text-white text-sm md:text-base font-bold rounded-full hover:scale-105 transition-transform shadow-[0_4px_20px_rgba(239,101,36,0.4)]"
                    >
                        Discover Project
                    </Link>
                    <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45" />
                    </button>
                </div>
            </div>

            {/* Right Column: Holographic 3D Card - Responsive Height */}
            <div className="hidden md:block lg:col-span-7 w-full h-[25vh] md:h-[30vh] lg:h-[350px] relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl hero-fade">
                {/* Glass Layer */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-10 pointer-events-none" />
                
                {/* 3D Scene Inside Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#000000] z-0">
                     <Scene />
                </div>

                {/* Card Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20 pointer-events-none" />
            </div>
        </div>

      </div>
    </section>
  );
}


