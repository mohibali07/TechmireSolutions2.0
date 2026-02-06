"use client";

import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";
import { useState } from "react";

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

export default function GlitchTeamCard({ member }: { member: TeamMember }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="group relative w-full aspect-[3/4] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1. Base Image (Grayscale) */}
            <div className="absolute inset-0 z-10 transition-all duration-500 group-hover:opacity-0">
                <div className="relative w-full h-full rounded-xl overflow-hidden grayscale">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            </div>

            {/* 2. Glitch Layers (Visible on Hover) */}
            <div className={`absolute inset-0 z-20 transition-opacity duration-100 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {/* Red Channel Shift */}
                <div className="absolute inset-0 translate-x-[2px] opacity-70 mix-blend-screen animate-pulse">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image src={member.image} alt={member.name} fill className="object-cover sepia hue-rotate-[-50deg] contrast-150" />
                    </div>
                </div>
                {/* Blue Channel Shift */}
                <div className="absolute inset-0 -translate-x-[2px] opacity-70 mix-blend-screen animate-pulse delay-75">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image src={member.image} alt={member.name} fill className="object-cover sepia hue-rotate-[180deg] contrast-150" />
                    </div>
                </div>
                {/* Main Color Image */}
                <div className="absolute inset-0">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image src={member.image} alt={member.name} fill className="object-cover contrast-125 saturate-150" />
                    </div>
                </div>
            </div>

            {/* 3. Cyber Overlay / Frame */}
            <div className="absolute -inset-2 z-30 pointer-events-none">
                {/* Borders animate in */}
                <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-[#EF6524] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="absolute top-0 right-0 w-[2px] h-1/3 bg-[#EF6524] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-100 origin-top" />
                <div className="absolute bottom-0 right-0 w-1/3 h-[2px] bg-[#EF6524] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-200 origin-right" />
                <div className="absolute bottom-0 left-0 w-[2px] h-1/3 bg-[#EF6524] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-300 origin-bottom" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity delay-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity delay-500" />
            </div>

            {/* 4. Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-40 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-black uppercase italic tracking-wider text-white mb-1 group-hover:text-[#EF6524] transition-colors glitch-text">
                        {member.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mb-4 border-l-2 border-[#EF6524] pl-3">
                        {member.role.toUpperCase()} // <span className="animate-pulse">ONLINE</span>
                    </p>
                    
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <div className="p-2 border border-white/20 hover:bg-[#EF6524] hover:border-[#EF6524] hover:text-white transition-all rounded-full cursor-pointer">
                            <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="p-2 border border-white/20 hover:bg-[#EF6524] hover:border-[#EF6524] hover:text-white transition-all rounded-full cursor-pointer">
                            <Twitter className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-0 group-hover:opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[size:100%_4px]" />
        </div>
    );
}
