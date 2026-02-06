"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    { year: "2018", title: "The Inception", description: "Founded in a small garage with a vision to redefine digital aesthetics." },
    { year: "2020", title: "Global Expansion", description: "Opened our first international office and crossed 100+ clients." },
    { year: "2022", title: "Innovation Award", description: "Recognized as the 'Top Digital Agency' by TechWeekly." },
    { year: "2024", title: "The Optical Core", description: "Rebranded to Techmire Solutions 2.0, focusing on immersive 3D web experiences." },
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Line drawing animation
            gsap.fromTo(lineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    }
                }
            );

            // Item fade-ins
            const items = document.querySelectorAll(".timeline-item");
            items.forEach((item) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-32 text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="mb-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-[#EF6524]">Journey</span></h2>
                    <p className="text-gray-400 text-lg">From humble beginnings to digital dominance.</p>
                </div>

                <div className="relative w-full max-w-5xl mx-auto">
                    {/* Center Line (Absolute) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
                         <div ref={lineRef} className="w-full bg-[#EF6524] shadow-[0_0_15px_#EF6524]" />
                    </div>

                    <div className="space-y-24">
                        {milestones.map((item, index) => (
                            <div key={index} className="timeline-item relative grid grid-cols-[50px_1fr] md:grid-cols-[1fr_80px_1fr] items-center gap-6 md:gap-0">
                                
                                {/* 1. Content Left (Desktop Only - Even Index) */}
                                <div className={`hidden md:block ${index % 2 === 0 ? 'text-right pr-6' : 'col-start-3 pl-6'}`}>
                                    {index % 2 === 0 ? (
                                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#EF6524]/50 transition-colors duration-300">
                                            <span className="text-[#EF6524] font-bold text-2xl block mb-2">{item.year}</span>
                                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                        </div>
                                    ) : (
                                        <span className="text-6xl font-bold text-white/5 font-outline-2">{item.year}</span>
                                    )}
                                </div>

                                {/* 2. Center Node */}
                                <div className="relative flex justify-center h-full md:col-start-2">
                                     <div className="w-4 h-4 rounded-full bg-[#050505] border-2 border-[#EF6524] outline outline-4 outline-black z-10 shadow-[0_0_20px_#EF6524] mt-8 md:mt-0" />
                                </div>

                                {/* 3. Content Right (Desktop Only - Odd Index) */}
                                <div className={`hidden md:block ${index % 2 !== 0 ? 'text-left pl-6' : 'col-start-1 text-right pr-6'}`}>
                                    {index % 2 !== 0 ? (
                                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#EF6524]/50 transition-colors duration-300">
                                            <span className="text-[#EF6524] font-bold text-2xl block mb-2">{item.year}</span>
                                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                        </div>
                                    ) : (
                                         <span className="text-6xl font-bold text-white/5 font-outline-2">{item.year}</span>
                                    )}
                                </div>

                                {/* Mobile Content (Full Width) */}
                                <div className="md:hidden pb-8 border-b border-white/10 last:border-0 pl-4">
                                    <span className="text-[#EF6524] font-bold text-xl block mb-2">{item.year}</span>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
