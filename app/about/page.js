"use client";
import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e3a8a] text-white px-6 py-16 relative overflow-hidden">
      {/* 🔹 Soft gradient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-600/30 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400/20 blur-[150px] rounded-full animate-pulse"></div>
      </div>

      {/* 🧊 Main Container */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-900/40 p-6 md:p-16 gap-10 transition-all duration-500 hover:shadow-cyan-500/30 hover:scale-[1.01]">
        {/* 🔹 About Section */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            LINK COMPRESSOR
          </h1>
          <p className="text-slate-200 text-lg leading-relaxed">
            We are a <span className="text-cyan-300 font-semibold">modern</span> and{" "}
            <span className="text-cyan-400 font-semibold">secure</span> link
            shortener built for simplicity and privacy.
            <br />
            No signups, no tracking — just fast, reliable URL compression.
          </p>



          <Link href="/Shorten">
            <button className="mt-6 px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
              🚀 Start Shortening
            </button>
          </Link>
        </div>

        {/* 🔹 Contact Section */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-5 w-full">
          <h2 className="text-3xl font-bold text-cyan-400">Contact Us</h2>
          <p className="text-slate-200 text-base font-medium">
            Facing issues with <span className="text-cyan-300">Link Compressor</span>?
            <br /> Need help or want to share feedback?
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-white">
              📧 Email:{" "}
              <a
                href="mailto:mrpatra.web@gmail.com"
                className="text-cyan-400 hover:underline"
              >
                mrpatra.web@gmail.com
              </a>
            </p>
            <p className="font-semibold text-white">
              📞 Phone:{" "}
              <a href="tel:8144129955" className="text-cyan-400 hover:underline">
                8144129955
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="https://mrpatra.vercel.app/"
              target="_blank"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-full text-sm px-5 py-2.5 hover:scale-105 hover:shadow-md hover:shadow-cyan-500/30 transition-all duration-300 flex justify-center items-center"
            >
              💬 MY WEB
            </Link>
            <Link
              href="mailto:amitkumarpatraaa@gmail.com"
              className="border border-cyan-400 text-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 hover:bg-cyan-400 hover:text-white transition-all duration-300 flex justify-center items-center"
            >
              📩 Send Mail
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
