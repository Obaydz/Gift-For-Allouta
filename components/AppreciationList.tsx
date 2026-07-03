"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "You stay even when things get quiet.",
  "You make my days lighter without trying.",
  "You understand me without me explaining everything.",
  "You feel close even when far away.",
  "You make ordinary moments feel special.",
  "You listen to the things I don't say.",
  "You are a safe place in a chaotic world.",
  "Your presence is a quiet comfort.",
  "You bring out the gentlest parts of me.",
  "You remember the little details that others miss.",
  "You make the world feel less lonely.",
  "You are appreciated more than you will ever know."
];

export default function AppreciationList() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center py-20 md:py-32 w-full max-w-2xl px-6 min-h-screen"
      id="appreciation-section"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />

      {/* Decorative vertical line/thread */}
      <div 
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-purple-500/0 via-purple-500/15 to-purple-500/0 transition-all duration-1000 origin-top ${
          isVisible ? "scale-y-100" : "scale-y-0"
        }`} 
      />

      <div className="relative w-full flex flex-col gap-16 md:gap-24">
        {MESSAGES.map((msg, index) => {
          // Alternating alignment layout (left / right card) for dynamic visual flow
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              style={{
                transitionDelay: `${index * 250}ms`,
              }}
              className={`flex w-full ${isEven ? "justify-start md:pr-12" : "justify-end md:pl-12"} transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "opacity-100 translate-y-0 filter-none"
                  : "opacity-0 translate-y-12 blur-md"
              }`}
            >
              {/* Message block */}
              <div className="group relative w-full md:max-w-[85%] flex flex-col gap-2 rounded-2xl border border-purple-500/5 bg-[#080212]/30 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/20 hover:bg-[#080212]/50 hover:shadow-[0_0_20px_rgba(147,51,234,0.08)]">
                {/* Accent mini glowing bullet */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] transition-all duration-700 delay-[500ms] ${
                    isEven 
                      ? "right-0 translate-x-[4px] md:right-auto md:left-0 md:-translate-x-[29px]" 
                      : "left-0 -translate-x-[4px] md:left-auto md:right-0 md:translate-x-[29px]"
                  }`} 
                />

                <span className="text-xs font-mono text-purple-400/60 uppercase tracking-widest">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <p className="font-serif text-lg md:text-xl text-zinc-100/90 leading-relaxed group-hover:text-white transition-colors">
                  {msg}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
