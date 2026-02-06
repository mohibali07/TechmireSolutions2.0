"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance
            gsap.fromTo(".contact-reveal",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out"
                }
            );

            // Form Reveal
            gsap.fromTo(formRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.3
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
            
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EF6524]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    
                    {/* Left Info */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-8 text-[#EF6524] contact-reveal">
                            <span className="w-2 h-2 rounded-full bg-[#EF6524] animate-pulse" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Contact Us</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight contact-reveal">
                            Let's Start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Conversation.</span>
                        </h1>
                        
                        <p className="text-gray-400 text-lg mb-12 max-w-md contact-reveal">
                            Have an idea? We'd love to help you build it. Reach out to us and let's create something extraordinary together.
                        </p>

                        <div className="space-y-8 contact-reveal">
                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#EF6524] group-hover:bg-[#EF6524]/10 transition-colors">
                                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#EF6524] transition-colors" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Email</h4>
                                    <p className="text-xl">hello@techmiresolutions.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#EF6524] group-hover:bg-[#EF6524]/10 transition-colors">
                                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-[#EF6524] transition-colors" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Phone</h4>
                                    <p className="text-xl">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#EF6524] group-hover:bg-[#EF6524]/10 transition-colors">
                                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[#EF6524] transition-colors" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Office</h4>
                                    <p className="text-xl">123 Innovation Blvd, Tech City</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="relative">
                         <form 
                            ref={formRef}
                            className="w-full p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EF6524] to-transparent" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#EF6524] transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Email</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#EF6524] transition-colors" />
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Subject</label>
                                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#EF6524] transition-colors appearance-none">
                                    <option>Project Inquiry</option>
                                    <option>Career</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Message</label>
                                <textarea rows={4} placeholder="Tell us about your project..." className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#EF6524] transition-colors resize-none"></textarea>
                            </div>

                            <button className="w-full py-4 bg-[#EF6524] text-white font-bold rounded-xl hover:bg-[#ff7a3d] transition-colors flex items-center justify-center gap-2 group">
                                Send Message
                                <ArrowUpRight className="w-5 h-5 transform group-hover:rotate-45 transition-transform" />
                            </button>

                         </form>
                    </div>

                </div>
            </div>
        </main>
    );
}
