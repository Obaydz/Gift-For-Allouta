"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio("/audio/ambient-piano.mp3");
    audio.loop = true;
    audio.volume = 0; // Start at 0 for fade-in
    audioRef.current = audio;

    return () => {
      if (audio) {
        audio.pause();
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeIn = (audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    audio.play().catch((err) => {
      console.log("Audio play blocked by browser autoplay policy:", err);
      setIsPlaying(false);
    });

    const targetVolume = 0.35;
    const step = 0.02;
    
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume < targetVolume) {
        audio.volume = Math.min(audio.volume + step, targetVolume);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  const fadeOutAndPause = (audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    const step = 0.03;
    
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume > 0.03) {
        audio.volume = Math.max(audio.volume - step, 0);
      } else {
        audio.volume = 0;
        audio.pause();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeOutAndPause(audio);
      setIsPlaying(false);
    } else {
      fadeIn(audio);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in opacity-0 delay-500">
      <button
        onClick={togglePlay}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-purple-500/20 bg-black/40 backdrop-blur-md text-purple-200 transition-all duration-500 hover:border-purple-500/50 hover:bg-black/60 hover:text-white shadow-[0_0_15px_rgba(147,51,234,0.15)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          /* Equalizer Icon when playing */
          <div className="flex items-end justify-center gap-[3px] w-5 h-5">
            <span className="w-[3px] h-4 bg-purple-300 rounded-full origin-bottom animate-eq-1" />
            <span className="w-[3px] h-5 bg-purple-400 rounded-full origin-bottom animate-eq-2" />
            <span className="w-[3px] h-3 bg-purple-300 rounded-full origin-bottom animate-eq-3" />
          </div>
        ) : (
          /* Muted Speaker Icon when paused */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-purple-300/80 group-hover:text-purple-200 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        )}

        {/* Floating text helper shown on hover */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/85 border border-purple-500/20 px-2.5 py-1 text-xs text-purple-200 opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none shadow-[0_0_10px_rgba(147,51,234,0.1)]">
          {isPlaying ? "Pause sound" : "Play sound"}
        </span>
      </button>
    </div>
  );
}
