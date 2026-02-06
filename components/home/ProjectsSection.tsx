"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Neon Horizon",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        year: "2024"
    },
    {
        id: 2,
        title: "Cyber Pulse",
        category: "Brand Identity",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: 3,
        title: "Quantum Flow",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: 4,
        title: "Orbital Edge",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1492619882488-2512db496525?q=80&w=2669&auto=format&fit=crop",
        year: "2024"
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Parallax
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Project Reveal Animation
            const projectCards = document.querySelectorAll(".project-card");
            projectCards.forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-32 bg-[#050505] text-white overflow-hidden">
            
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                
                {/* Header */}
                <div ref={titleRef} className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-[#EF6524]">
                            <span className="w-2 h-2 rounded-full bg-[#EF6524]" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Selected Work</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Projects</span>
                        </h2>
                    </div>
                    <Link href="/projects" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#EF6524] transition-colors">
                        View All Work
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className={`project-card group relative w-full aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer ${index % 2 === 1 ? 'md:translate-y-24' : ''}`}
                        >
                            {/* Image Scale on Hover */}
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[#EF6524] text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                                    <span className="text-white/50 text-xs font-mono border border-white/20 px-2 py-1 rounded-full">{project.year}</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-0 group-hover:mb-4 transition-all duration-300">
                                    {project.title}
                                </h3>
                                <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                                    <p className="text-gray-300 text-sm">Click to view case study</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
