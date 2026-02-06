"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Check if we've already loaded this session
    const hasLoaded = sessionStorage.getItem("techmire-loaded");
    if (hasLoaded) {
      setComplete(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
        document.body.style.overflow = "auto";
        sessionStorage.setItem("techmire-loaded", "true");
      },
    });

    // Disable scroll during preload
    document.body.style.overflow = "hidden";

    const obj = { val: 0 };

    // Counter Animation
    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power4.inOut",
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.innerText = Math.floor(obj.val).toString();
        }
      },
    });

    // "Explosion" / Exit Animation properties
    tl.to(textRef.current, {
      scale: 10,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
      filter: "blur(20px)",
    });

    // Fade out container
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      },
      "-=0.4",
    );
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-[#EF6524]"
      style={{ perspective: "1000px" }}
    >
      <h1
        ref={textRef}
        className="text-[25vw] font-black tracking-tighter leading-none select-none mix-blend-screen"
        style={{
          textShadow: "0 0 30px #EF6524, 0 0 100px #EF6524",
        }}
      >
        0
      </h1>
    </div>
  );
}
