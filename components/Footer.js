import React from "react";
import Link from "next/link";
import { FiGithub, FiTwitter, FiGlobe } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="w-full bg-blue-950/90 py-6 border-t border-blue-800/50 backdrop-blur-md mt-auto relative z-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                {/* Branding & Copyright */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold text-white tracking-wide">
                        Link Compressor
                    </h2>
                    <p className="text-sm text-blue-200/80">
                        © {new Date().getFullYear()} Amit Kumar Patra. All rights reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <Link
                        href="https://github.com/amitkumarpatra99"
                        target="_blank"
                        className="text-white hover:text-cyan-400 transition-colors text-xl"
                        aria-label="GitHub"
                    >
                        <FiGithub />
                    </Link>
                    <Link
                        href="https://mrpatra.vercel.app/"
                        target="_blank"
                        className="text-white hover:text-cyan-400 transition-colors text-xl"
                        aria-label="Portfolio"
                    >
                        <FiGlobe />
                    </Link>
                    {/* Add more social icons here if needed */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
