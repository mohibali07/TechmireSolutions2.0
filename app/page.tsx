import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/home/AboutSection";
import Services from "@/components/services/Services";
import ProjectsSection from "@/components/home/ProjectsSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <AboutSection />
      <Services />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
