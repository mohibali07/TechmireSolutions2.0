"use client";

import { useEffect, useRef } from "react";
import { servicesData } from "@/lib/servicesData";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicePage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const service = servicesData[slug as keyof typeof servicesData];
    const containerRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!service) return;

        const ctx = gsap.context(() => {
            // 1. Hero Entrance
            const tl = gsap.timeline();
            tl.from(".hero-bg", {
                scale: 1.2,
                opacity: 0,
                duration: 2,
                ease: "power4.out"
            })
            .from(".hero-tag", {
                y: 20,
                opacity: 0,
                duration: 0.8
            }, "-=1.2")
            .from(".hero-title", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1
            }, "-=1")
            .from(".hero-p", {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, "-=0.8");

            // 2. Module Reveals
            const modules = gsap.utils.toArray(".service-module");
            modules.forEach((module: any) => {
                gsap.from(module, {
                    scrollTrigger: {
                        trigger: module,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // 3. Image Parallax
            imageRefs.current.forEach((img) => {
                if (!img) return;
                gsap.to(img.querySelector("img"), {
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    },
                    y: 50,
                    ease: "none"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [service]);

    if (!service) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-black font-bold text-2xl tracking-tighter uppercase">Service Not Found</div>;
    }

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
            
            {/* 1. Hero Section */}
            <section className="relative w-full h-[85vh] flex items-end pb-24 px-6 md:px-12 lg:px-24">
                <div className="absolute inset-0 z-0 overflow-hidden hero-bg">
                    <Image 
                        src={service.heroImage} 
                        alt={service.title}
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20" />
                </div>
                
                <div ref={heroContentRef} className="relative z-10 max-w-5xl">
                    <span className="text-[#EF6524] font-bold tracking-[0.3em] uppercase mb-6 block hero-tag text-sm md:text-base">Strategic Solution</span>
                    <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-black uppercase leading-[0.85] mb-8 hero-title tracking-tighter">
                        {service.title.split(" ").map((word, i) => (
                            <span key={i} className="inline-block mr-4">{word}</span>
                        ))}
                    </h1>
                    <p className="text-xl md:text-3xl font-light text-gray-400 max-w-2xl leading-relaxed hero-p">
                        {service.tagline}
                    </p>
                </div>
            </section>

            {/* 2. Philosophy Section */}
            <section className="container mx-auto px-6 md:px-12 lg:px-24 py-32 lg:py-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40">
                    <div className="lg:sticky lg:top-32 h-fit">
                        <div className="text-gray-500 font-mono mb-4">01 / PHILOSOPHY</div>
                        <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-12 tracking-tight">
                            {service.description}
                        </h2>
                        <div className="w-20 h-1 bg-[#EF6524]" />
                    </div>
                    <div className="flex flex-col justify-center">
                         <div className="text-gray-400 text-lg md:text-xl leading-relaxed space-y-12">
                            <p className="border-l-2 border-white/10 pl-8">
                                In a world drowned in noise, clarity is the only currency. We strip away the superfluous to reveal the core essence of your brand, engineering visual languages that speak louder than noise.
                            </p>
                            <p className="border-l-2 border-white/10 pl-8">
                                Complexity is easy. Simplicity is difficult. Our approach fuses data with intuition to create experiences that don't just work—they resonate.
                            </p>
                         </div>
                    </div>
                </div>
            </section>

            {/* 3. Modules / Process */}
            <section className="container mx-auto px-6 md:px-12 lg:px-24 py-24 space-y-48 md:space-y-64 pb-64">
                {service.modules.map((module, index) => (
                    <div 
                        key={index} 
                        className={`service-module flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        
                        <div className="w-full lg:w-[55%]">
                            <div 
                                ref={el => { imageRefs.current[index] = el }}
                                className="relative aspect-[16/10] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 group bg-gray-900"
                            >
                                <Image 
                                    src={module.image}
                                    alt={module.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all" />
                            </div>
                        </div>

                        <div className="w-full lg:w-[45%]">
                            <div className="text-gray-500 font-mono mb-6">0{index + 2} / CORE TASK</div>
                            <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">{module.title}</h3>
                            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mb-12">{module.text}</p>
                            
                            <Link href="/contact" className="inline-flex gap-6 items-center text-[#EF6524] font-bold uppercase tracking-[0.2em] text-sm group">
                                <span className="relative">
                                    Start Project
                                    <span className="absolute -bottom-2 left-0 w-full h-px bg-[#EF6524] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                </span>
                                <div className="w-12 h-12 rounded-full border border-[#EF6524]/30 flex items-center justify-center group-hover:bg-[#EF6524] group-hover:text-black transition-all duration-300">
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </div>

                    </div>
                ))}
            </section>

            {/* 4. Next Service CTA */}
            <section className="py-52 border-t border-white/5 relative overflow-hidden group cursor-pointer">
                <Link href={`/services/${service.nextService}`} className="block relative z-10 container mx-auto px-6 md:px-12 lg:px-24 text-center lg:text-left">
                    <span className="text-gray-500 uppercase tracking-[0.5em] mb-8 block text-xs font-black">Up Next</span>
                    <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
                        <h2 className="text-6xl md:text-9xl font-black uppercase text-white group-hover:text-[#EF6524] transition-colors duration-500 leading-none">
                            {service.nextService.replace("-", " ")}
                        </h2>
                        <div className="w-32 h-32 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-[#EF6524] group-hover:bg-[#EF6524] transition-all duration-700">
                            <ArrowRight className="w-12 h-12 text-white group-hover:text-black transition-all duration-500" />
                        </div>
                    </div>
                </Link>
                
                {/* Background Text Ripple */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] uppercase pointer-events-none select-none leading-none">
                    NEXT
                </div>
            </section>

            <Footer />
        </main>
    );
}
