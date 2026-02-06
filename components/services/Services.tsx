"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "./ServiceCard";
import { Palette, Megaphone, Globe, Code, Search } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "graphic-design",
        title: "Graphic Design",
        description: "Visual storytelling that captivates your audience. From branding to marketing materials, we create stunning visuals.",
        href: "/services/graphic-design",
        icon: <Palette className="w-8 h-8 text-white" />
    },
    {
        id: "digital-marketing",
        title: "Digital Marketing",
        description: "Data-driven strategies to grow your reach. We handle SEO, PPC, and social media to maximize ROI.",
        href: "/services/digital-marketing",
        icon: <Megaphone className="w-8 h-8 text-white" />
    },
    {
        id: "web-development",
        title: "Web Development",
        description: "High-performance websites built for the modern web. Fast, responsive, and scalable solutions.",
        href: "/services/web-development",
        icon: <Globe className="w-8 h-8 text-white" />
    },
    {
        id: "software-development",
        title: "Software Development",
        description: "Custom software solutions tailored to your business needs. We build robust and secure applications.",
        href: "/services/software-development",
        icon: <Code className="w-8 h-8 text-white" />
    },
    {
        id: "seo",
        title: "SEO Optimization",
        description: "Rank higher and get found exactly when your customers are looking. Comprehensive organic search strategies.",
        href: "/services/seo",
        icon: <Search className="w-8 h-8 text-white" />
    }
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const scrollContainer = scrollContainerRef.current;
            const trigger = triggerRef.current;
            if (!scrollContainer || !trigger) return;

            // Only enable on desktop
            const mm = gsap.matchMedia();
            
            mm.add("(min-width: 1024px)", () => {
                const totalWidth = scrollContainer.scrollWidth;
                const viewWidth = window.innerWidth;
                const distance = totalWidth - viewWidth;

                // Reset position explicitly
                gsap.set(scrollContainer, { x: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: trigger,
                        start: "top top",
                        end: `+=${distance + 1000}`, // Ensure enough scroll space
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                tl.fromTo(scrollContainer, 
                    { x: 0 },
                    {
                        x: -distance,
                        ease: "none",
                        immediateRender: false // Critical: Prevent pre-calculation gltich
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#050505] text-white overflow-x-clip py-24">
            
            {/* Background Atmosphere & Spotlight */}
             <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] -z-10 opacity-20" />
            
            <div ref={triggerRef} className="w-full h-auto lg:h-screen flex flex-col justify-center relative z-10">
                
                {/* Header */}
                <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                     <div>
                        <div className="flex items-center gap-2 mb-6 text-[#EF6524]">
                            <span className="w-2 h-2 rounded-full bg-[#EF6524] animate-pulse" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">What We Do</span>
                        </div>
                        <h3 className="text-5xl md:text-7xl lg:text-[90px] font-bold leading-[0.9] tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Services</span>
                        </h3>
                    </div>
                    <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed mb-4">
                        Comprehensive digital solutions tailored to elevate your brand in the modern landscape.
                    </p>
                </div>

                {/* Horizontal Scroll Container (Desktop) / Vertical (Mobile) */}
                <div className="w-full lg:w-[100vw] overflow-visible lg:overflow-hidden">
                     <div 
                        ref={scrollContainerRef}
                        className="flex flex-col lg:flex-row gap-8 lg:gap-8 w-full lg:w-max px-6 md:px-12 lg:px-24"
                     >
                        {services.map((service, index) => (
                            <ServiceCard 
                                key={service.id}
                                index={index}
                                {...service}
                            />
                        ))}
                     </div>
                </div>

            </div>
        </section>
    );
}
