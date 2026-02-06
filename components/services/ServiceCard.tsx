"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ServiceCardProps {
    id: string;
    title: string;
    description: string;
    href: string;
    index: number;
    icon: React.ReactNode;
}

export default function ServiceCard({ id, title, description, href, index, icon }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="group relative w-[320px] md:w-[450px] h-[550px] md:h-[650px] flex-shrink-0 rounded-[2rem] overflow-hidden border border-white/10 bg-[#111]/40 backdrop-blur-md transition-all duration-700 hover:border-[#EF6524]/50 hover:shadow-[0_0_40px_-10px_rgba(239,101,36,0.2)] hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br from-[#EF6524]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            {/* Vertical Index (01, 02...) */}
            <div className="absolute top-8 left-8 text-white/10 text-7xl font-bold z-10 select-none group-hover:text-white/20 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20">
                
                {/* 3D Floating Icon */}
                <div className="mb-6 w-16 h-16 relative group-hover:-translate-y-4 transition-transform duration-500 delay-75">
                     <div className="absolute inset-0 bg-[#EF6524]/20 rounded-2xl blur-xl" />
                     <div className="relative w-full h-full bg-gradient-to-br from-[#EF6524] to-[#ff8f5a] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_20px_rgba(239,101,36,0.4)] border-t border-white/30 transform transition-transform group-hover:rotate-12 duration-500">
                        {icon}
                     </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-[#EF6524] transition-colors duration-300 transform group-hover:-translate-y-2 origin-left">
                    {title}
                </h3>

                {/* Description (Reveal) */}
                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isHovered ? 'max-h-40 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed border-l-2 border-[#EF6524] pl-4">
                        {description}
                    </p>
                </div>

                {/* Arrow Button */}
                <Link 
                    href={href}
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EF6524] group-hover:border-[#EF6524] group-hover:scale-110 transition-all duration-300 shadow-lg"
                >
                    <ArrowUpRight className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
}
