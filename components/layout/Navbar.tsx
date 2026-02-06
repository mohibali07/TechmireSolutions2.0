"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";

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
            className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full z-[50] transition-all duration-500 border
                ${scrolled 
                    ? 'bg-white/80 dark:bg-black/60 backdrop-blur-xl border-black/5 dark:border-white/10 shadow-lg py-3 px-6' 
                    : 'bg-transparent border-transparent py-5 px-6'
                }`}
        >
            <div className="flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="relative z-[60] group">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                        <Image 
                            src="/logo.png" 
                            alt="Techmire" 
                            fill
                            className="object-contain dark:invert-0 invert"
                            priority
                        />
                        {/* Glow for Logo */}
                        <div className="absolute inset-0 bg-[#EF6524] blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden xl:flex items-center gap-1 bg-white/50 dark:bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-black/5 dark:border-white/5">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white relative group overflow-hidden rounded-full transition-colors"
                        >
                            <span className="relative z-10">{item.name}</span>
                            <span className="absolute inset-0 bg-[#EF6524]/10 dark:bg-[#EF6524]/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4 relative z-[60]">
                    <div className="hidden xl:block">
                        <ThemeToggle />
                    </div>

                    <Link 
                        href="/contact"
                        className="hidden xl:flex items-center justify-center px-6 py-2.5 bg-[#EF6524] text-white text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_14px_0_rgba(239,101,36,0.39)] hover:shadow-[0_6px_20px_rgba(239,101,36,0.23)]"
                    >
                        Get Quote
                    </Link>

                    {/* Mobile Menu Trigger + Theme Toggle */}
                    <div className="xl:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button 
                            onClick={toggleMenu}
                            className="group flex flex-col items-end gap-[5px] p-2"
                        >
                            <span className={`w-8 h-[2px] bg-black dark:bg-white group-hover:bg-[#EF6524] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`w-6 h-[2px] bg-black dark:bg-white group-hover:bg-[#EF6524] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-4 h-[2px] bg-black dark:bg-white group-hover:bg-[#EF6524] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px] w-8' : ''}`} />
                        </button>
                    </div>
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
            
            <nav className="flex flex-col gap-6 text-center relative z-10 px-6 max-h-[85vh] overflow-y-auto">
                {menuItems.map((item, i) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        ref={(el) => { itemsRef.current[i] = el; }}
                        className="text-4xl font-black text-black/90 dark:text-white hover:text-[#EF6524] transition-colors uppercase tracking-tight"
                        onClick={() => setIsOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
                 <Link
                    href="/contact"
                    className="mt-8 px-8 py-4 bg-[#EF6524] text-white text-xl font-bold uppercase tracking-widest rounded-full self-center shadow-lg active:scale-95 transition-transform"
                    onClick={() => setIsOpen(false)}
                 >
                    Get a Quote
                 </Link>
            </nav>
        </div>
    </>
  );
}
