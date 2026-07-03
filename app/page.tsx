"use client";

import { useEffect, useState } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import AppreciationList from "@/components/AppreciationList";
import FinalReveal from "@/components/FinalReveal";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-[#030008] via-[#080212] to-[#120424] text-[#f5f2fa] overflow-hidden">
      {/* Interactive cursor spotlight background */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(700px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 80%)`,
        }}
      />

      {/* Background ambient glowing shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-950/10 blur-[150px] animate-pulse-slow pointer-events-none" />

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* 1. Landing Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center px-6 z-20">
        <div className="flex flex-col items-center gap-6">
          {/* Main Title */}
          <h1 className="font-serif text-6xl md:text-8xl tracking-tight select-none bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] animate-fade-in">
            For Allouta
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.25em] text-purple-300/80 animate-fade-in-up delay-300 opacity-0">
            A small reminder of what I notice
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-3 animate-fade-in delay-1000 opacity-0">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400/60 select-none">
            scroll down
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500/50 to-transparent relative overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-4 bg-purple-400 animate-[bounce_1.8s_infinite] rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. Appreciation list Section */}
      <section className="relative flex flex-col items-center w-full z-20">
        <AppreciationList />
      </section>

      {/* 3. Final Reveal Section */}
      <section className="relative flex flex-col items-center justify-center w-full z-20">
        <FinalReveal />
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500/40 border-t border-purple-950/20 z-20">
        made with care
      </footer>
    </main>
  );
}
