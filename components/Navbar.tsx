"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 top-0 px-4 ${isScrolled ? "py-2" : "pt-4"
                }`}
        >
            <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-4 flex justify-between items-center relative z-50">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative font-display font-bold text-xl text-white">N</span>
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-white">
                        NovaNext<span className="text-primary">.</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-1 items-center bg-white/5 rounded-full p-1 border border-white/5">
                    {["Layanan", "Harga", "Portofolio"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://wa.me/6281224621353?text=Halo%20NovaNext,%20saya%20tertarik%20konsultasi."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    >
                        <span>Konsultasi Gratis</span>
                        <span className="material-icons text-sm">arrow_forward</span>
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-icons">
                            {isMobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 p-4 z-40"
                    >
                        <div className="glass-panel mx-4 rounded-2xl p-6 flex flex-col gap-4">
                            {["Layanan", "Harga", "Portofolio"].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-slate-300 hover:text-white py-2 border-b border-white/5"
                                >
                                    {item}
                                </Link>
                            ))}
                            <a
                                href="https://wa.me/6281224621353"
                                className="mt-2 bg-primary text-white text-center py-3 rounded-xl font-bold"
                            >
                                Konsultasi Gratis
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
