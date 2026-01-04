"use client";
import Link from "next/link";
import { FiZap, FiInfo } from "react-icons/fi";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-16 pt-32 md:pt-40 pb-20 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white">
      {/* Background Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse -z-10"></div>

      {/* Hero Content */}
      <div className="text-center flex flex-col items-center gap-6 z-10 animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,200,255,0.4)]">
          The Link Compressor
        </h1>

        <p className="text-lg md:text-2xl font-medium text-blue-200 max-w-2xl">
          Transform long, messy URLs into sleek, shareable links —
          <br className="hidden md:block" /> fast, free, and privacy-focused.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Link href="/Shorten">
            <button className="flex items-center gap-2 px-8 py-3 rounded-full text-white text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-cyan-400 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 hover:scale-105">
              <FiZap /> Try Now
            </button>
          </Link>
          <Link href="/about">
            <button className="flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300">
              <FiInfo /> Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Simple Fade-in Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
