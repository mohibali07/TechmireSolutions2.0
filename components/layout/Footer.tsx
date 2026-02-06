"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (textRef.current) {
                gsap.fromTo(textRef.current,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 70%",
                        }
                    }
                );
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="relative w-full bg-[#050505] text-white pt-32 pb-12 overflow-hidden">
            
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#EF6524]/50 to-transparent" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Massive CTA */}
                <div className="mb-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
                     <div className="max-w-4xl">
                        <h2 ref={textRef} className="text-6xl md:text-8xl lg:text-[120px] font-bold leading-[0.9] tracking-tight mb-8">
                            Have an <span className="text-[#EF6524]">Idea?</span><br />
                            Let's Build.
                        </h2>
                        <Link href="/contact" className="group inline-flex items-center gap-4 text-xl md:text-2xl font-medium border-b border-white/20 pb-2 hover:border-[#EF6524] transition-colors">
                            <span>Start a Project</span>
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#EF6524] transition-colors duration-300">
                                <ArrowUpRight className="w-6 h-6 transform group-hover:rotate-45 transition-transform" />
                            </div>
                        </Link>
                     </div>
                </div>

                {/* Grid Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
                    
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
                            Techmire<span className="text-[#EF6524]">.</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Architecting digital futures with precision and passion.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Sitemap</h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-[#EF6524] transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Socials</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
                                { name: "Instagram", icon: <Instagram className="w-4 h-4" /> },
                                { name: "Twitter", icon: <Twitter className="w-4 h-4" /> },
                                { name: "Facebook", icon: <Facebook className="w-4 h-4" /> },
                            ].map((item) => (
                                <li key={item.name}>
                                    <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-[#EF6524] transition-colors group">
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Contact</h4>
                        <p className="text-gray-400 mb-2">hello@techmiresolutions.com</p>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                        <p className="text-gray-500 text-sm mt-8">
                            © {new Date().getFullYear()} Techmire Solutions.<br />All rights reserved.
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
