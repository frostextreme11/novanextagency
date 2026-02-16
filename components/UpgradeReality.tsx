"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const oldMethods = [
    {
        icon: "block",
        title: "Lambat & Berat",
        desc: "Teknologi legacy yang membebani server dan user experience.",
    },
    {
        icon: "running_with_errors",
        title: "Manual Processing",
        desc: "Human error tinggi, menghabiskan sumber daya operasional.",
    },
    {
        icon: "visibility_off",
        title: "Invisible",
        desc: "Sulit ditemukan di search engine, trafik stagnan.",
    },
];

const newMethods = [
    {
        icon: "check",
        title: "Hyper Speed",
        desc: "Optimasi core vitals untuk loading instant di bawah 1 detik.",
        gradient: "from-green-400 to-emerald-600",
        shadow: "shadow-green-500/30",
    },
    {
        icon: "check",
        title: "AI Automation",
        desc: "Sistem cerdas yang bekerja 24/7 mengelola data Anda.",
        gradient: "from-blue-400 to-indigo-600",
        shadow: "shadow-blue-500/30",
    },
    {
        icon: "check",
        title: "Immersive UX",
        desc: "Desain antarmuka kelas dunia yang memikat user seketika.",
        gradient: "from-purple-400 to-fuchsia-600",
        shadow: "shadow-purple-500/30",
    },
];

export default function UpgradeReality() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 sm:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Upgrade Your Reality
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                        Jangan biarkan teknologi usang menahan potensi bisnis Anda. Beralih ke
                        dimensi baru.
                    </p>
                </motion.div>

                {/* Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
                    {/* Center divider (desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center">
                        <div className="w-[2px] h-32 bg-gradient-to-b from-red-500/0 via-white/20 to-green-500/0" />
                        <div className="w-12 h-12 rounded-full glass-panel border border-white/20 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <span className="material-icons text-white/50">sync_alt</span>
                        </div>
                    </div>

                    {/* Old Method */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-red-900/10 rounded-3xl blur-xl group-hover:bg-red-900/20 transition-all duration-500" />
                        <div className="glass-panel border-red-500/20 p-6 sm:p-8 md:p-10 rounded-3xl relative z-10 h-full hover:border-red-500/40 transition-colors">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                    <span className="material-icons text-red-500">close</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-200">
                                    Metode Lama
                                </h3>
                            </div>
                            <ul className="space-y-6">
                                {oldMethods.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                                        className="flex items-start gap-4 opacity-70 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span className="material-icons text-red-500/70 mt-1">
                                            {item.icon}
                                        </span>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Mobile divider */}
                    <div className="lg:hidden flex justify-center py-4">
                        <div className="w-12 h-12 rounded-full glass-panel border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <span className="material-icons text-white/50">arrow_downward</span>
                        </div>
                    </div>

                    {/* NovaNext Future */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl group-hover:bg-primary/30 transition-all duration-500 animate-pulse-slow" />
                        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-primary/50 p-6 sm:p-8 md:p-10 rounded-3xl relative z-10 h-full shadow-[0_0_40px_rgba(79,70,229,0.15)] group-hover:shadow-[0_0_60px_rgba(79,70,229,0.25)] transition-all transform group-hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                    <span className="material-icons text-primary-glow">
                                        auto_awesome
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                                    NovaNext Future
                                </h3>
                            </div>
                            <ul className="space-y-6">
                                {newMethods.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div
                                            className={`bg-gradient-to-br ${item.gradient} rounded-full p-1 mt-1 shadow-lg ${item.shadow}`}
                                        >
                                            <span className="material-icons text-white text-xs font-bold">
                                                {item.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1 text-base sm:text-lg">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-slate-400 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
