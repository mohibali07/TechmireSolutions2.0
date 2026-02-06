"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import gsap from "gsap";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Simple rotation animation
    gsap.fromTo(".theme-icon", 
        { rotate: 0, scale: 0.5 },
        { rotate: 360, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors duration-300 group"
      aria-label="Toggle Theme"
    >
      <div className="theme-icon relative z-10 flex items-center justify-center">
        {theme === "dark" ? (
            <Moon className="w-5 h-5 text-white" />
        ) : (
            <Sun className="w-5 h-5 text-orange-500" />
        )}
      </div>
      
      {/* Glow Effect */}
      <span className="absolute inset-0 rounded-full bg-[#EF6524]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
    </button>
  );
}
