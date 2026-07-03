"use client";

import { useEffect, useState } from "react";

const FINAL_MESSAGE = "Thank you for being part of my life. This is not a gift, just a reminder that you matter to me.";

export default function FinalReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  const handleReveal = () => {
    setTypedText("");
    setTypingComplete(false);
    setIsRevealed(true);
  };

  useEffect(() => {
    if (!isRevealed) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < FINAL_MESSAGE.length) {
        // Typing character by character
        setTypedText(FINAL_MESSAGE.slice(0, index + 1));
        index++;
      } else {
        setTypingComplete(true);
        clearInterval(interval);
      }
    }, 45); // Typing speed in ms

    return () => clearInterval(interval);
  }, [isRevealed]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full max-w-xl px-6 py-20 text-center">
      {/* Background ambient glow that strengthens when revealed */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-all duration-[2000ms] pointer-events-none ${isRevealed
          ? "w-[400px] h-[400px] bg-purple-600/15"
          : "w-[200px] h-[200px] bg-purple-900/5"
          }`}
      />

      {!isRevealed ? (
        /* Pulsing Button */
        <button
          onClick={handleReveal}
          className="group relative px-8 py-4 rounded-full border border-purple-500/30 bg-purple-950/10 backdrop-blur-md text-purple-200 font-serif text-lg tracking-wider transition-all duration-700 hover:border-purple-500/80 hover:bg-purple-950/30 hover:text-white shadow-[0_0_20px_rgba(147,51,234,0.15)] hover:shadow-[0_0_35px_rgba(147,51,234,0.4)] hover:scale-105 active:scale-98 animate-[float_4s_ease-in-out_infinite]"
        >
          {/* Glowing pulse ring */}
          <span className="absolute inset-0 rounded-full border border-purple-400/40 animate-ping opacity-75 group-hover:animate-none" />

          <span className="relative flex items-center gap-2">
            one more thing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>
      ) : (
        /* Reveal Container */
        <div className="relative flex flex-col items-center justify-center gap-6 w-full">
          {/* Floating Sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <span className="absolute top-1/4 left-10 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-60 animate-[float_6s_infinite_ease-in-out]" />
            <span className="absolute bottom-1/4 right-8 w-1 h-1 rounded-full bg-amber-300 opacity-50 animate-[float_8s_infinite_ease-in-out_1s]" />
            <span className="absolute top-10 right-1/4 w-2 h-2 rounded-full bg-purple-300 opacity-40 animate-[float_7s_infinite_ease-in-out_2s]" />
            <span className="absolute bottom-10 left-1/4 w-1.5 h-1.5 rounded-full bg-purple-500 opacity-50 animate-[float_5s_infinite_ease-in-out_1.5s]" />
          </div>

          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-purple-950/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.2)] animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-pulse"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>

          {/* Typed Secret Message */}
          <p className="font-serif text-xl md:text-2xl text-zinc-100 leading-relaxed md:leading-loose max-w-lg min-h-[6rem] relative">
            {typedText}
            {/* Blinking cursor */}
            <span
              className={`inline-block w-[2px] h-[1.25em] bg-purple-400 ml-1 translate-y-1 ${typingComplete ? "animate-[pulse_1s_infinite]" : "opacity-100"
                }`}
            />
          </p>

          {/* Soft follow-up fading line */}
          <div
            className={`text-xs font-mono text-purple-400/60 uppercase tracking-widest mt-4 transition-all duration-1000 delay-700 ${typingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            made for you... My <span className="text-purple-400">Allouta</span>
          </div>
        </div>
      )}
    </div>
  );
}
