"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop to avoid interfering with mobile touch natively
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    // However, the brief asks to "Replace the mouse cursor with a Touch Ripple. Where the user touches, a ring of Orange energy expands and fades."
    // So we will implement a logic that handles both or unifies them.
    // For now, let's focus on a follow cursor for mouse and click ripples for all.

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleLinkHover = () => {
        gsap.to(cursor, { scale: 1.5, opacity: 0.5 });
        gsap.to(follower, { scale: 3, borderColor: "transparent", background: "rgba(239, 101, 36, 0.1)" });
    };

    const handleLinkLeave = () => {
        gsap.to(cursor, { scale: 1, opacity: 1 });
        gsap.to(follower, { scale: 1, borderColor: "#EF6524", background: "transparent" });
    };

    window.addEventListener("mousemove", moveCursor);
    
    // Add listeners to clickable elements
    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
        link.addEventListener("mouseenter", handleLinkHover);
        link.addEventListener("mouseleave", handleLinkLeave);
    });
    
    // Clean up
    return () => {
        window.removeEventListener("mousemove", moveCursor);
        links.forEach((link) => {
            link.removeEventListener("mouseenter", handleLinkHover);
            link.removeEventListener("mouseleave", handleLinkLeave);
        });
    };
  }, []);

  // Ripple Effect logic could be global or separate. 
  // For the prompt "Where the user touches, a ring of Orange energy expands and fades", 
  // let's add a global click listener.
  useEffect(() => {
    const createRipple = (e: MouseEvent | TouchEvent) => {
        let x, y;
        if (window.TouchEvent && e instanceof TouchEvent) {
             x = e.touches[0].clientX;
             y = e.touches[0].clientY;
        } else if (e instanceof MouseEvent) {
             x = e.clientX;
             y = e.clientY;
        } else {
            return;
        }
        
        const ripple = document.createElement("div");
        ripple.classList.add("ripple-ring");
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        document.body.appendChild(ripple);

        gsap.fromTo(ripple, 
            { scale: 0, opacity: 1 },
            { scale: 4, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() }
        );
    };

    window.addEventListener("mousedown", createRipple);
    window.addEventListener("touchstart", createRipple);

    return () => {
        window.removeEventListener("mousedown", createRipple);
        window.removeEventListener("touchstart", createRipple);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-[#EF6524] rounded-full pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-[#EF6524] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hidden md:block"
      />
      <style jsx global>{`
        .ripple-ring {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #EF6524;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }
        body {
            cursor: none; /* Hide default cursor */
        }
        /* Restore cursor on mobile/touch? usually desirable to hide it if we custom handle it, 
           but for accessibility let's be careful. For now, strictly following "Replace mouse cursor". */
        @media (hover: none) and (pointer: coarse) {
            body {
                cursor: auto;
            }
        }
      `}</style>
    </>
  );
}
