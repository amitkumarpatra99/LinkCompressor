"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { FiLink, FiTag, FiCopy, FiCheck, FiZap } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // basic url validation (very small)
  const isValidUrl = (s) => {
    try {
      // if the user didn't include protocol, allow http(s) by prepending for check
      const u = s.startsWith("http://") || s.startsWith("https://") ? s : `https://${s}`;
      new URL(u);
      return true;
    } catch {
      return false;
    }
  };

  const generate = async () => {
    if (!url || !shorturl) {
      toast.warn("Please fill in both fields ⚠️", { theme: "colored" });
      return;
    }

    if (!isValidUrl(url)) {
      toast.warn("Please enter a valid URL (include domain).", { theme: "colored" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shorturl }),
      });

      // if backend returned non-JSON (or 500 HTML), avoid .json() throwing
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // not JSON
        data = { message: text || "Server returned an unexpected response." };
      }

      if (!res.ok) {
        // backend returned error status
        toast.error(data.message || `Server error: ${res.status}`, { theme: "colored" });
        console.error("Generate error", res.status, data);
        setLoading(false);
        return;
      }

      // success
      const host = process.env.NEXT_PUBLIC_HOST || (typeof window !== "undefined" ? `${window.location.origin}` : "");
      const built = `${host.replace(/\/+$/, "")}/${shorturl.replace(/^\/+/, "")}`;
      setGenerated(built);
      setUrl("");
      setShorturl("");
      toast.success(data.message || "✅ Link generated successfully!", { theme: "colored" });
    } catch (err) {
      console.error("Fetch error", err);
      toast.error("❌ Network or server error. Check console.", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generated) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generated);
      } else {
        // fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = generated;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.info("📋 Link copied to clipboard!", { theme: "colored" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
      toast.error("Cannot copy to clipboard on this browser.", { theme: "colored" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white px-4 py-20 relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-700 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-25 animate-pulse"></div>
      </div>

      {/* Main card */}
      <div className="mx-auto max-w-3xl w-full rounded-3xl border border-blue-700/50 bg-white/10 backdrop-blur-xl p-6 md:p-10 flex flex-col gap-6 shadow-2xl shadow-blue-900/30">
        <h1 className="text-center text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Generate Your Link
        </h1>

        <div className="flex flex-col items-center gap-4 mt-4 w-full">
          <div className="relative w-full md:w-2/3">
            <FiLink className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-300 text-xl" />
            <input
              className="w-full border border-blue-400/40 bg-white/20 text-white placeholder:text-blue-200 rounded-full pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all text-sm md:text-base"
              type="text"
              placeholder="Enter your long URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="relative w-full md:w-2/3">
            <FiTag className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-300 text-xl" />
            <input
              className="w-full border border-blue-400/40 bg-white/20 text-white placeholder:text-blue-200 rounded-full pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all text-sm md:text-base"
              type="text"
              placeholder="Enter your preferred short URL"
              value={shorturl}
              onChange={(e) => setShorturl(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className={`mt-3 w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold text-white ${loading ? "bg-gray-500 cursor-wait" : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
              } transition-all duration-300`}
          >
            {loading ? <><FiZap className="animate-spin" /> Generating...</> : <><FiZap /> Generate Link</>}
          </button>
        </div>

        {generated && (
          <div className="mt-8 text-center flex flex-col items-center gap-3 animate-fade-in">
            <span className="font-semibold text-blue-200 text-lg">Your Shortened Link:</span>

            <div className="flex flex-wrap justify-center items-center gap-3 bg-white/10 px-5 py-3 rounded-full backdrop-blur-lg border border-blue-500/30">
              <Link href={generated} target="_blank" className="text-cyan-400 hover:text-cyan-300 font-mono break-all transition-colors">
                {generated}
              </Link>

              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${copied ? "bg-green-500 text-white scale-105" : "bg-blue-600 hover:bg-cyan-500 text-white"
                  }`}
              >
                {copied ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Shorten;
