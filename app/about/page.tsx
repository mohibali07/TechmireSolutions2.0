"use client";

import Timeline from "@/components/about/Timeline";
import TeamGrid from "@/components/about/TeamGrid";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-24">
            
            {/* Hero */}
            <section className="py-24 container mx-auto px-6 md:px-12 lg:px-24">
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold leading-none tracking-tight mb-8">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Story.</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                    We started with a simple belief: Digital experiences should be felt, not just seen. Today, we are a global team of innovators pushing the boundaries of the web.
                </p>
            </section>

            <Timeline />
            <TeamGrid />
            <Footer />
        </main>
    );
}
