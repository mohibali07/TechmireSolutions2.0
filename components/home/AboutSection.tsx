"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Text Reveal Animation (Cinematic)
            if (textRef.current) {
                const words = textRef.current.querySelectorAll(".reveal-word");
                gsap.fromTo(words, 
                    { opacity: 0.1,  y: 20, filter: "blur(8px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        stagger: 0.04,
                        duration: 1,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 85%",
                            end: "bottom 60%",
                            scrub: 1,
                        }
                    }
                );
            }

            // 2. Mouse Spotlight Logic
            const handleMouseMove = (e: MouseEvent) => {
                if (!containerRef.current || !spotlightRef.current) return;
                const bounds = containerRef.current.getBoundingClientRect();
                const x = e.clientX - bounds.left;
                const y = e.clientY - bounds.top;
                
                gsap.to(spotlightRef.current, {
                    x: x,
                    y: y,
                    duration: 0.6,
                    ease: "power2.out"
                });

                // 3. 3D Tilt Card Logic
                if (cardRef.current) {
                    const cardBounds = cardRef.current.getBoundingClientRect();
                    const cardCX = cardBounds.left + cardBounds.width / 2;
                    const cardCY = cardBounds.top + cardBounds.height / 2;
                    
                    const rotateX = -((e.clientY - cardCY) / cardBounds.height) * 10; // Max 10deg
                    const rotateY = ((e.clientX - cardCX) / cardBounds.width) * 10;

                    gsap.to(cardRef.current, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformPerspective: 1000,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            };

            // 4. Reset Tilt on Leave
            const handleMouseLeave = () => {
                if (cardRef.current) {
                    gsap.to(cardRef.current, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.6,
                        ease: "elastic.out(1, 0.5)"
                    });
                }
            };

            window.addEventListener("mousemove", handleMouseMove);
            if (containerRef.current) {
                containerRef.current.addEventListener("mouseleave", handleMouseLeave);
            }

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                if (containerRef.current) {
                    containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
                }
            };

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const headlineText = "We are the architects of the digital future. We build immersive experiences that transcend the ordinary.";

    return (
        <section ref={containerRef} className="relative w-full py-20 lg:py-40 bg-[#050505] text-white overflow-hidden cursor-none">
            
            {/* Spotlight Effect */}
            <div 
                ref={spotlightRef}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#EF6524]/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"
            />
            
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] -z-10 opacity-20" />

            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                
                {/* Header Badge */}
                <div className="flex justify-center md:justify-start mb-20">
                    <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2 hover:bg-white/10 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#EF6524] animate-pulse shadow-[0_0_10px_#EF6524]" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">Who We Are</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                    
                    {/* Left: Huge Typography */}
                    <div>
                        <h2 ref={textRef} className="text-5xl md:text-7xl lg:text-[90px] font-bold leading-[1.05] tracking-tight mb-8">
                            {headlineText.split(" ").map((word, i) => (
                                <span key={i} className="reveal-word inline-block mr-5 opacity-100 blur-0">
                                    {word}
                                </span>
                            ))}
                        </h2>
                    </div>

                    {/* Right: 3D Holographic Card */}
                    <div className="relative perspective-[2000px]">
                        <div 
                            ref={cardRef}
                            className="p-10 md:p-14 rounded-[2rem] border border-white/10 bg-[#111]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group will-change-transform"
                        >
                             {/* Internal Glow */}
                             <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#EF6524]/20 rounded-full blur-[80px] group-hover:bg-[#EF6524]/30 transition-colors duration-500" />
                             
                             <h3 className="text-3xl font-bold mb-6 text-white relative z-10">Beyond Renovation</h3>
                             <p className="text-gray-400 text-xl leading-relaxed mb-10 relative z-10">
                                Techmire Solutions isn't just an agency; it's a <span className="text-white font-semibold">catalyst</span>. Since 2018, we've been merging technical precision with artistic vision to create digital ecosystems that live, breathe, and perform.
                             </p>

                             <div className="flex flex-wrap gap-8 relative z-10 border-t border-white/10 pt-8">
                                <div className="flex flex-col">
                                    <span className="text-5xl font-bold text-[#EF6524] tabular-nums">4k+</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Projects</span>
                                </div>
                                <div className="w-px h-auto bg-white/10" />
                                <div className="flex flex-col">
                                    <span className="text-5xl font-bold text-[#EF6524] tabular-nums">24+</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Years Exp.</span>
                                </div>
                             </div>

                             <Link 
                                href="/about"
                                className="mt-12 inline-flex items-center gap-3 text-white font-medium group/btn relative z-10"
                             >
                                <span className="border-b border-[#EF6524] pb-1 group-hover/btn:text-[#EF6524] transition-colors text-lg">Read Our Story</span>
                                <ArrowRight className="w-5 h-5 text-[#EF6524] group-hover/btn:translate-x-2 transition-transform duration-300" />
                             </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
