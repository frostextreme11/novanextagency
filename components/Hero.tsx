"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Animated Glowing Orbs Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[120px] animate-glow-move will-change-transform" />
                <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-purple-500/25 rounded-full blur-[100px] animate-glow-move-reverse will-change-transform" />
                <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[110px] animate-glow-pulse will-change-transform" />
                <div className="absolute top-1/2 right-1/3 w-[250px] h-[250px] bg-cyan-500/15 rounded-full blur-[90px] animate-glow-move animation-delay-2000 will-change-transform" />
                <div className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] bg-violet-500/20 rounded-full blur-[80px] animate-glow-move-reverse animation-delay-4000 will-change-transform" />
            </div>

            {/* Frosted Glass Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="frosted-hero rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-primary/30 mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-display font-medium text-white uppercase tracking-[0.2em]">
                            Siap Menerima Project Baru
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tight"
                    >
                        <span className="block mb-2 drop-shadow-2xl">Bikin Bisnis Kamu</span>
                        <span className="text-video-mask block pb-2">
                            Go Digital
                        </span>
                        <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-slate-400 font-bold mt-4">
                            Cepat, Keren & Profesional
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Nggak perlu ribet ngurusin website & aplikasi sendiri.{" "}
                        <span className="text-white font-medium">NovaNext</span> bantu kamu punya website dan aplikasi mobile yang
                        bukan cuma jalan — tapi bikin pelanggan langsung wow.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full"
                    >
                        <Link href="#pricing" className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300" />
                            <div className="relative px-8 py-4 bg-black rounded-xl leading-none flex items-center justify-center gap-3 border border-white/10 group-hover:border-transparent transition-all">
                                <span className="font-display font-bold text-white">
                                    Mulai Sekarang
                                </span>
                                <span className="material-icons text-white transform group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </div>
                        </Link>
                        <Link
                            href="#services"
                            className="glass-panel px-8 py-4 rounded-xl text-white font-display font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <span>Lihat Layanan</span>
                            <span className="material-icons text-sm">expand_more</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
