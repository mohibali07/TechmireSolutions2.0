"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { name: "Graphic Design", href: "/graphic-design" },
  { name: "Digital Marketing", href: "/digital-marketing" },
  { name: "Web Development", href: "/web-development" },
  { name: "Software Development", href: "/software-development" },
  { name: "SEO", href: "/seo" },
  { name: "Our Team", href: "/team" },
  { name: "About Us", href: "/about" },
  { name: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Entrance Animation
    const ctx = gsap.context(() => {
        const hasLoaded = sessionStorage.getItem("techmire-loaded");
        const delayTime = hasLoaded ? 0.5 : 2.8;

        gsap.set(headerRef.current, { y: -100, opacity: 0 });
        gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: delayTime 
        });
    });

    return () => {
        window.removeEventListener("scroll", handleScroll);
        ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 100% 0%)", 
        duration: 1,
        ease: "power4.inOut",
      });
      gsap.fromTo(itemsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <>

        <header 
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-[50] py-6"
        >
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
                
                {/* Left: Logo (Icon Only) */}
                <Link href="/" className="relative z-[60] group">
                    <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                        <Image 
                            src="/logo.png" 
                            alt="Techmire" 
                            fill
                            className="object-contain dark:invert-0 invert"
                            priority
                        />
                    </div>
                </Link>

                {/* Center: Nav Pill - Transparent Glass */}
                <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 z-[60]">
                    
                    {/* Services Dropdown */}
                    <div className="relative group px-4 py-2 rounded-full hover:bg-white/10 transition-all cursor-pointer">
                        <button className="text-sm font-medium text-white/90 group-hover:text-white flex items-center gap-1">
                            Services
                            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div className="absolute top-full text-left left-1/2 -translate-x-1/2 mt-4 w-64 p-2 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 transform origin-top">
                            <div className="flex flex-col gap-1">
                                {[
                                    { name: "Graphic Design", href: "/graphic-design" },
                                    { name: "Digital Marketing", href: "/digital-marketing" },
                                    { name: "Web Development", href: "/web-development" },
                                    { name: "Software Development", href: "/software-development" },
                                    { name: "SEO", href: "/seo" }
                                ].map((service) => (
                                    <Link 
                                        key={service.name}
                                        href={service.href}
                                        className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                    >
                                        {service.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Standard Links - Active state simulation (e.g. 'Our Team' active for demo if needed, or just hover styles) */}
                    <Link href="/team" className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all">Our Team</Link>
                    <Link href="/about" className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all">About Us</Link>
                    <Link href="/blogs" className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all">Blogs</Link>
                </nav>

                {/* Right: CTA & Mobile Trigger */}
                <div className="flex items-center gap-4 relative z-[60]">
                    
                    {/* CTA Button - "Let's Talk Us" (Back to Right) */}
                    <Link 
                        href="/contact"
                        className="hidden md:flex items-center justify-center px-6 py-3 bg-[#EF6524] text-white text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_14px_0_rgba(239,101,36,0.39)]"
                    >
                        Let's Talk Us
                    </Link>

                    {/* Hamburger Trigger - Mobile/Tablet Only */}
                    <button 
                        onClick={toggleMenu}
                        className="xl:hidden w-12 h-12 flex items-center justify-center bg-[#EF6524] rounded-full hover:scale-110 transition-transform shadow-[0_4px_14px_0_rgba(239,101,36,0.39)]"
                    >
                         <div className="flex flex-col gap-[5px] items-center">
                            <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                         </div>
                    </button>
                </div>
            </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div
            ref={menuRef}
            className="fixed inset-0 z-[49] bg-white dark:bg-[#050505] flex items-center justify-center pointer-events-auto xl:hidden"
            style={{ clipPath: "circle(0% at 100% 0%)" }}
        >
            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#EF6524]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <nav className="flex flex-col gap-6 text-center relative z-10 px-6 max-h-[85vh] overflow-y-auto w-full">
                {menuItems.map((item, i) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        ref={(el) => { itemsRef.current[i] = el; }}
                        className="text-3xl md:text-5xl font-black text-black/90 dark:text-white hover:text-[#EF6524] transition-colors uppercase tracking-tight"
                        onClick={() => setIsOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
                 <Link
                    href="/contact"
                    className="mt-8 px-10 py-5 bg-[#EF6524] text-white text-xl font-bold uppercase tracking-widest rounded-full self-center shadow-lg active:scale-95 transition-transform"
                    onClick={() => setIsOpen(false)}
                 >
                    Get a Quote
                 </Link>
            </nav>
        </div>
    </>
  );
}
