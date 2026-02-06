"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
    { name: "Alex Sterling", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2544&auto=format&fit=crop" },
    { name: "Sarah Jenkins", role: "Creative Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" },
    { name: "Marcus Chen", role: "Lead Developer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop" },
    { name: "Emily Dao", role: "UX Strategy", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop" },
    { name: "David Kim", role: "3D Artist", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop" },
    { name: "Olivia Rhye", role: "Brand Manager", image: "https://images.unsplash.com/photo-1601288496920-b613c7158388?q=80&w=2670&auto=format&fit=crop" },
    { name: "James L.", role: "Strategy", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" },
    { name: "Nina K.", role: "Design", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop" },
    { name: "Tom Baker", role: "Motion", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2700&auto=format&fit=crop" },
];

export default function TeamGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                // Determine movement direction based on column index
                // Col 0: Up (-y)
                // Col 1: Down (+y)
                // Col 2: Up (-y)
                
                columnsRef.current.forEach((col, i) => {
                    const direction = i % 2 === 0 ? -1 : 1;
                    
                    gsap.fromTo(col, 
                        { y: 0 },
                        {
                            y: direction * 150, // Parallax distance
                            ease: "none",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1,
                            }
                        }
                    );
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Split team into 3 columns for desktop
    const columns = [[], [], []] as typeof team[];
    team.forEach((member, i) => columns[i % 3].push(member));

    return (
        <section ref={containerRef} className="relative py-32 bg-[#050505] overflow-hidden min-h-screen">
            
            <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-24">
                <h2 className="text-6xl md:text-[10vw] font-black uppercase text-white leading-[0.85] tracking-tighter">
                    Vision <br />
                    <span className="text-[#EF6524] italic">Collective</span>
                </h2>
                <div className="w-full h-px bg-white/10 mt-12" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {columns.map((colMembers, colIndex) => (
                        <div 
                            key={colIndex} 
                            ref={el => { columnsRef.current[colIndex] = el }}
                            className={`flex flex-col gap-12 ${colIndex === 1 ? 'lg:pt-24' : ''}`} // Offset middle column
                        >
                            {colMembers.map((member, index) => (
                                <div key={index} className="group relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-900">
                                    <Image 
                                        src={member.image} 
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                    {/* Text Content - Always Visible but Stylized */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                        <h3 className="text-3xl font-bold text-white mb-2">{member.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-px bg-[#EF6524] group-hover:w-16 transition-all duration-300" />
                                            <p className="text-gray-300 uppercase tracking-widest text-sm">{member.role}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 border-2 border-[#EF6524] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 rounded-[2rem] pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
