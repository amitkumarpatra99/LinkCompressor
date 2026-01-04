"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiInfo, FiZap, FiExternalLink } from "react-icons/fi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/", icon: <FiHome /> },
    { name: "About", path: "/about", icon: <FiInfo /> },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[94%] max-w-6xl z-50 transition-all duration-500 ease-in-out ${scrolled
        ? "bg-blue-950/80 border border-blue-500/40 shadow-xl shadow-blue-900/20 backdrop-blur-2xl"
        : "bg-white/10 border border-blue-400/30 backdrop-blur-lg shadow-lg"
        } rounded-full px-5 py-3 md:px-10 md:py-4`}
    >
      <div className="flex items-center justify-between text-white">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          LINK COMPRESSOR
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl cursor-pointer focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        {/* NAV LINKS */}
        <ul
          className={`absolute md:static top-[70px] left-0 w-full md:w-auto transition-all duration-500 ease-in-out flex flex-col md:flex-row items-center gap-6 md:gap-10 font-medium text-base md:text-lg ${open
            ? "opacity-100 visible translate-y-0 bg-blue-950/90 backdrop-blur-2xl border border-blue-600/20 py-8 rounded-3xl shadow-2xl"
            : "opacity-0 invisible -translate-y-4 md:opacity-100 md:visible md:translate-y-0 md:bg-transparent md:shadow-none"
            }`}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`relative flex items-center gap-2 tracking-wide transition-all duration-300 hover:text-cyan-300 hover:scale-105 ${pathname === link.path ? "text-cyan-400" : "text-white"
                }`}
            >
              {link.icon}
              {link.name}
              {pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
              )}
            </Link>
          ))}

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <Link href="/Shorten">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-cyan-400 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-full text-sm md:text-base shadow-md hover:shadow-cyan-400/40 transition-all duration-300">
                <FiZap /> Try Now
              </button>
            </Link>
            <Link href="https://mrpatra.vercel.app/" target="_blank">
              <button className="flex items-center gap-2 border border-cyan-400 hover:bg-cyan-400 hover:text-black text-white font-semibold px-6 py-2 rounded-full text-sm md:text-base transition-all duration-300">
                <FiExternalLink /> MR PATRA
              </button>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
