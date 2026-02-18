"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const platforms = [
    {
        id: "meta",
        name: "Meta Ads",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
            </svg>
        ),
        gradient: "from-blue-600 to-blue-400",
        shadow: "shadow-blue-500/30",
        borderHover: "hover:border-blue-500/40",
        features: [
            "Facebook & Instagram Ads",
            "Custom & Lookalike Audience",
            "Retargeting Campaigns",
            "Carousel, Reels & Story Ads",
        ],
        description:
            "Jangkau jutaan calon pelanggan di Facebook & Instagram dengan targeting yang presisi. Dari awareness sampai conversion, semua bisa dioptimalkan.",
    },
    {
        id: "google",
        name: "Google Search Ads",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.35 11.1h-9.18v2.73h5.51c-.24 1.28-1.27 3.73-5.51 3.73-3.31 0-6.01-2.75-6.01-6.12s2.7-6.12 6.01-6.12c1.87 0 3.13.8 3.85 1.48l2.84-2.76C16.99 2.34 14.71 1.38 12.17 1.38 6.18 1.38 1.38 6.18 1.38 12.17s4.8 10.79 10.79 10.79c6.23 0 10.36-4.38 10.36-10.55 0-.71-.08-1.25-.18-1.31z" />
            </svg>
        ),
        gradient: "from-emerald-500 to-teal-400",
        shadow: "shadow-emerald-500/30",
        borderHover: "hover:border-emerald-500/40",
        features: [
            "Search & Display Network",
            "Keyword Research & Bidding",
            "Google Shopping Ads",
            "Performance Max Campaigns",
        ],
        description:
            "Tampil di halaman pertama Google saat calon pelanggan mencari produk atau jasa kamu. Bayar hanya saat mereka klik — efisien dan terukur.",
    },
];

const targetMetrics = [
    {
        icon: "trending_up",
        label: "Sales",
        desc: "Naikkan penjualan",
        color: "text-green-400",
    },
    {
        icon: "visibility",
        label: "Awareness",
        desc: "Brand lebih dikenal",
        color: "text-blue-400",
    },
    {
        icon: "people",
        label: "Leads",
        desc: "Data calon customer",
        color: "text-purple-400",
    },
    {
        icon: "storefront",
        label: "Traffic",
        desc: "Kunjungan ke toko",
        color: "text-orange-400",
    },
    {
        icon: "download",
        label: "Install",
        desc: "Download aplikasi",
        color: "text-cyan-400",
    },
    {
        icon: "chat_bubble",
        label: "Engagement",
        desc: "Interaksi & review",
        color: "text-pink-400",
    },
];

const businessTypes = [
    "F&B / Kuliner",
    "Fashion & Beauty",
    "Properti",
    "Otomotif",
    "Kesehatan",
    "Pendidikan",
    "Travel & Wisata",
    "Jasa Profesional",
    "Teknologi",
    "UMKM",
];

export default function DigitalAds() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activePlatform, setActivePlatform] = useState("meta");

    const currentPlatform = platforms.find((p) => p.id === activePlatform)!;

    return (
        <section ref={ref} className="py-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary-glow/30 rounded-full"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 text-primary-glow font-bold tracking-widest text-xs uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="material-icons text-sm">
                            campaign
                        </span>
                        Ads & Promotion Strategy
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                        Iklankan Produkmu,{" "}
                        <br className="hidden sm:block" />
                        <span className="text-gradient">
                            Jangkau Lebih Banyak
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        NovaNext bantu semua lini bisnis merancang strategi
                        beriklan dan promosi produk apapun di{" "}
                        <span className="text-blue-400 font-semibold">
                            Meta Ads
                        </span>{" "}
                        dan{" "}
                        <span className="text-emerald-400 font-semibold">
                            Google Search
                        </span>
                        . Apapun target kamu, kita optimalkan sampai tercapai.
                    </p>
                </motion.div>

                {/* Platform Tabs + Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-16"
                >
                    {/* Platform Switcher */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            {platforms.map((platform) => (
                                <button
                                    key={platform.id}
                                    onClick={() =>
                                        setActivePlatform(platform.id)
                                    }
                                    className={`flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activePlatform === platform.id
                                            ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg ${platform.shadow}`
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {platform.icon}
                                    <span className="hidden sm:inline">
                                        {platform.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Platform Content Card */}
                    <motion.div
                        key={activePlatform}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group ${currentPlatform.borderHover} transition-all duration-500`}
                    >
                        {/* Glow */}
                        <div
                            className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${currentPlatform.gradient} opacity-10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3`}
                        />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Left - Info */}
                            <div>
                                <div
                                    className={`w-14 h-14 bg-gradient-to-br ${currentPlatform.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${currentPlatform.shadow}`}
                                >
                                    {currentPlatform.icon}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                                    {currentPlatform.name}
                                </h3>
                                <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
                                    {currentPlatform.description}
                                </p>

                                {/* Features list */}
                                <div className="space-y-3">
                                    {currentPlatform.features.map(
                                        (feature, i) => (
                                            <motion.div
                                                key={feature}
                                                initial={{
                                                    opacity: 0,
                                                    x: -20,
                                                }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 0.1 + i * 0.08,
                                                    duration: 0.3,
                                                }}
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className={`w-6 h-6 rounded-lg bg-gradient-to-br ${currentPlatform.gradient} flex items-center justify-center flex-shrink-0`}
                                                >
                                                    <span className="material-icons text-white text-sm">
                                                        check
                                                    </span>
                                                </div>
                                                <span className="text-white/80 text-sm">
                                                    {feature}
                                                </span>
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Right - Visual Mockup */}
                            <div className="relative">
                                <div
                                    className={`absolute -inset-2 bg-gradient-to-r ${currentPlatform.gradient} rounded-2xl blur opacity-15 group-hover:opacity-25 transition-opacity`}
                                />
                                <div className="relative bg-black/60 rounded-2xl border border-white/10 p-5 shadow-2xl">
                                    {/* Fake ads dashboard mockup */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentPlatform.gradient} flex items-center justify-center`}
                                            >
                                                {currentPlatform.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs text-white/70 font-medium">
                                                    Campaign Dashboard
                                                </div>
                                                <div className="text-[10px] text-slate-500">
                                                    Last 30 days
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-semibold">
                                            ● Active
                                        </div>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        {[
                                            {
                                                label: "Impressions",
                                                value: "1.2M",
                                                trend: "+24%",
                                            },
                                            {
                                                label: "Clicks",
                                                value: "45.2K",
                                                trend: "+18%",
                                            },
                                            {
                                                label: "Conv.",
                                                value: "3.8K",
                                                trend: "+31%",
                                            },
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: 0.3 + i * 0.1,
                                                    duration: 0.3,
                                                }}
                                                className="bg-white/5 rounded-xl p-3 text-center"
                                            >
                                                <div className="text-lg font-bold text-white">
                                                    {stat.value}
                                                </div>
                                                <div className="text-[10px] text-slate-500">
                                                    {stat.label}
                                                </div>
                                                <div className="text-[10px] text-green-400 font-semibold mt-1">
                                                    {stat.trend}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Fake chart bars */}
                                    <div className="flex items-end gap-1.5 h-20">
                                        {[
                                            40, 65, 45, 80, 55, 90, 70, 85, 60,
                                            95, 75, 88,
                                        ].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{
                                                    height: `${h}%`,
                                                }}
                                                transition={{
                                                    delay: 0.5 + i * 0.05,
                                                    duration: 0.5,
                                                    ease: "easeOut",
                                                }}
                                                className={`flex-1 bg-gradient-to-t ${currentPlatform.gradient} rounded-t-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Target Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-16"
                >
                    <h3 className="text-center text-xl sm:text-2xl font-display font-bold text-white mb-2">
                        Apapun Targetmu, Kita Bantu Capai
                    </h3>
                    <p className="text-center text-slate-500 text-sm mb-8">
                        Setiap bisnis punya goal yang berbeda — dan kita siap
                        optimalkan semuanya.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {targetMetrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    isInView ? { opacity: 1, y: 0 } : {}
                                }
                                transition={{
                                    delay: 0.4 + i * 0.06,
                                    duration: 0.4,
                                }}
                                className="glass-panel rounded-2xl p-4 text-center group hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-default"
                            >
                                <div
                                    className={`material-icons text-3xl ${metric.color} mb-2 group-hover:scale-110 transition-transform`}
                                >
                                    {metric.icon}
                                </div>
                                <div className="text-white font-semibold text-sm mb-1">
                                    {metric.label}
                                </div>
                                <div className="text-slate-500 text-xs">
                                    {metric.desc}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Business Types Scrolling */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mb-12"
                >
                    <p className="text-center text-slate-500 text-sm mb-6">
                        Cocok untuk semua lini bisnis
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {businessTypes.map((type, i) => (
                            <motion.span
                                key={type}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                    isInView ? { opacity: 1, scale: 1 } : {}
                                }
                                transition={{
                                    delay: 0.6 + i * 0.05,
                                    duration: 0.3,
                                }}
                                className="px-4 py-2 rounded-full bg-white/5 text-sm text-white/70 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default"
                            >
                                {type}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden neon-border"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-900 z-0" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none z-[1]" />

                    <div className="relative z-10 p-8 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <span className="material-icons text-white text-xl">
                                        rocket_launch
                                    </span>
                                </div>
                                <span className="text-white/60 text-sm font-medium">
                                    Mulai Beriklan Sekarang
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                                Siap Scale Up Bisnis Kamu?
                            </h3>
                            <p className="text-indigo-200/80 text-sm sm:text-base max-w-lg">
                                Konsultasi gratis strategi iklan yang tepat untuk
                                bisnis kamu. Tim NovaNext siap bantu dari riset,
                                setup, sampai optimasi campaign.
                            </p>
                        </div>
                        <a
                            href="https://wa.me/6281224621353?text=Halo%20saya%20mau%20konsultasi%20tentang%20strategi%20iklan%20digital"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-indigo-900 px-8 py-4 rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-white/10 hover:bg-indigo-50 transition-all transform hover:scale-105 flex items-center gap-2 whitespace-nowrap group"
                        >
                            Konsultasi Gratis
                            <span className="material-icons transform group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
