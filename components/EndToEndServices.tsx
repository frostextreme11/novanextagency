"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techTags = ["React.js", "Next.js", "Tailwind", "Node.js", "Flutter"];

export default function EndToEndServices() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 relative overflow-hidden bg-black/20">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
                >
                    <div>
                        <span className="text-primary-glow font-bold tracking-widest text-xs uppercase mb-3 block">
                            Full Service
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
                            Semua Kebutuhan Digital, Satu Tempat
                        </h2>
                    </div>
                    <a
                        href="https://wa.me/6281224621353?text=Halo%20saya%20mau%20konsultasi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors text-sm sm:text-base"
                    >
                        Tanya langsung
                        <span className="material-icons transform group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </a>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {/* Web Development - Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start h-full justify-between">
                            <div className="max-w-md">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
                                    <span className="material-icons text-3xl">language</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                                    Web Development
                                </h3>
                                <p className="text-slate-400 mb-8 leading-relaxed text-sm sm:text-base">
                                    Website yang nggak cuma keren dilihat, tapi juga ngebut,
                                    SEO-friendly, dan bisa diakses dari HP manapun. Pakai
                                    teknologi yang sama kayak startup Silicon Valley.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {techTags.map((tag, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                                            className="px-4 py-1.5 rounded-full bg-white/5 text-xs text-white border border-white/10 hover:bg-white/10 transition-colors cursor-default"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                            {/* Mini mockup */}
                            <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                <div className="relative group-hover:scale-[1.02] transition-transform duration-700">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20" />
                                    <div className="relative bg-black/60 rounded-xl border border-white/10 p-4 shadow-2xl">
                                        <div className="flex gap-1 mb-3">
                                            <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                            <div className="w-2 h-2 rounded-full bg-green-500/60" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-blue-500/20 rounded w-3/4" />
                                            <div className="h-2 bg-white/5 rounded w-full" />
                                            <div className="h-2 bg-white/5 rounded w-5/6" />
                                            <div className="flex gap-2 mt-3">
                                                <div className="h-12 bg-blue-500/10 rounded flex-1" />
                                                <div className="h-12 bg-blue-500/10 rounded flex-1" />
                                                <div className="h-12 bg-blue-500/10 rounded flex-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile Apps */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-purple-500/40 transition-all duration-500 flex flex-col justify-between"
                    >
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                                <span className="material-icons text-2xl">smartphone</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                                Mobile Apps
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">
                                Aplikasi native iOS & Android yang smooth banget — bikin
                                pelanggan betah di genggaman mereka.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-slate-500 mt-auto">
                            <span className="material-icons text-2xl hover:text-white transition-colors">
                                apple
                            </span>
                            <span className="material-icons text-2xl hover:text-white transition-colors">
                                android
                            </span>
                            <span className="material-icons text-2xl hover:text-white transition-colors">
                                flutter_dash
                            </span>
                        </div>
                    </motion.div>

                    {/* E-Commerce */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-green-500/40 transition-all duration-500"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/20">
                            <span className="material-icons text-2xl">shopping_cart</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                            E-Commerce
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Toko online yang jalan sendiri — payment otomatis, stok terupdate,
                            dan siap handle ribuan transaksi tiap hari.
                        </p>
                    </motion.div>

                    {/* Custom Solution CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="lg:col-span-8 relative rounded-3xl overflow-hidden group cursor-pointer neon-border"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 z-0" />
                        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 h-full">
                            <div className="text-center sm:text-left">
                                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                                    Punya Ide Lain?
                                </h3>
                                <p className="text-indigo-200 text-sm sm:text-base">
                                    Ceritain aja kebutuhan kamu — kita buatin solusi yang tepat.
                                </p>
                            </div>
                            <a
                                href="https://wa.me/6281224621353?text=Halo%20saya%20butuh%20solusi%20custom"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-indigo-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:bg-indigo-50 transition-all transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
                            >
                                Chat Sekarang
                                <span className="material-icons">arrow_forward</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
