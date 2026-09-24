"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type PricingTier = {
    name: string;
    tagline: string;
    price: string;
    period: string;
    domainBadge?: string;
    icon: string;
    desc: string;
    cta: string;
    featured: boolean;
    features: { text: string; included: boolean }[];
};

const websiteTiers: PricingTier[] = [
    {
        name: "Starter",
        tagline: "Landing Page / Personal",
        price: "Rp 600.000",
        period: "sekali bayar",
        domainBadge: ".my.id / .web.id (1 Thn)",
        icon: "storefront",
        desc: "Solusi cepat untuk portfolio, jasa freelance, atau promo produk 1 halaman tanpa ribet.",
        cta: "Saya%20tertarik%20dengan%20Paket%20Website%20Starter%20(Rp%20600rb)",
        featured: false,
        features: [
            { text: "1 Halaman (Single Page Landing)", included: true },
            { text: "Free Domain .my.id / .web.id (1 Thn)", included: true },
            { text: "Free Cloud Hosting & SSL", included: true },
            { text: "Mobile Responsive Design", included: true },
            { text: "Tombol Direct WhatsApp", included: true },
            { text: "Basic SEO Setup", included: true },
            { text: "1x Revisi Minor", included: true },
            { text: "Katalog & Form Email", included: false },
            { text: "Source Code Diserahkan", included: false },
        ],
    },
    {
        name: "Bisnis UMKM",
        tagline: "Company Profile Resmi",
        price: "Rp 900.000",
        period: "sekali bayar",
        domainBadge: ".com (1 Thn)",
        icon: "domain",
        desc: "Website resmi untuk UMKM & kantor jasa agar kredibel dan terpercaya di mata calon klien.",
        cta: "Saya%20tertarik%20dengan%20Paket%20Website%20Bisnis%20(Rp%20900rb)",
        featured: false,
        features: [
            { text: "3 – 5 Halaman Lengkap", included: true },
            { text: "Free Domain .com (1 Thn)", included: true },
            { text: "Free Cloud Hosting Cepat & SSL", included: true },
            { text: "Form Kontak & Google Maps", included: true },
            { text: "1 Email Forwarder Bisnis", included: true },
            { text: "SEO Basic + Google Search Console", included: true },
            { text: "2x Revisi Minor", included: true },
            { text: "Sistem Katalog Interaktif", included: false },
            { text: "Source Code Diserahkan", included: false },
        ],
    },
    {
        name: "Pro / Katalog",
        tagline: "Toko Online & Bisnis Maju",
        price: "Rp 1.300.000",
        period: "sekali bayar",
        domainBadge: ".com atau .id Resmi (1 Thn)",
        icon: "shopping_bag",
        desc: "Katalog produk interaktif dengan order langsung via WhatsApp untuk dongkrak omzet penjualan.",
        cta: "Saya%20tertarik%20dengan%20Paket%20Website%20Pro%20(Rp%201.3jt)",
        featured: true,
        features: [
            { text: "5 – 8 Halaman / Katalog Produk", included: true },
            { text: "Free Domain .com atau .id Resmi (1 Thn)", included: true },
            { text: "Fast Cloud SSD Hosting & SSL", included: true },
            { text: "Checkout Order Langsung ke WhatsApp", included: true },
            { text: "2-3 Email Bisnis Profesional", included: true },
            { text: "SEO On-Page + Google Analytics 4", included: true },
            { text: "3x Revisi Desain", included: true },
            { text: "Prioritas Pengerjaan (3-5 Hari)", included: true },
            { text: "Payment Gateway Otomatis", included: false },
        ],
    },
    {
        name: "Custom Web",
        tagline: "Enterprise & Web App",
        price: "Mulai Rp 3.5 Jt",
        period: "custom scope",
        domainBadge: "Bebas (.com / .id / .co.id)",
        icon: "rocket_launch",
        desc: "Sistem website custom sesuai kebutuhan bisnis: portal, member login, atau payment gateway.",
        cta: "Saya%20mau%20konsultasi%20Website%20Custom",
        featured: false,
        features: [
            { text: "Desain & Jumlah Halaman Custom Bebas", included: true },
            { text: "Free Domain .com / .id / .co.id (1 Thn)", included: true },
            { text: "Custom Dashboard Admin / CMS", included: true },
            { text: "Payment Gateway (Midtrans / Xendit)", included: true },
            { text: "Sistem Member / Multi-Role Login", included: true },
            { text: "Full Source Code Handover", included: true },
            { text: "SLA Garansi Bug & Maintenance", included: true },
            { text: "Integrasi API Pihak Ketiga", included: true },
            { text: "Konsultasi Arsitektur 1-on-1", included: true },
        ],
    },
];

const mobileTiers: PricingTier[] = [
    {
        name: "Webview / PWA",
        tagline: "Instalasi Praktis",
        price: "Rp 1.800.000",
        period: "sekali bayar",
        domainBadge: "Website Source Required",
        icon: "install_mobile",
        desc: "Ubah website Anda yang sudah ada menjadi aplikasi Android APK & PWA siap pakai.",
        cta: "Saya%20tertarik%20dengan%20Paket%20Mobile%20Webview/PWA%20(Rp%201.8jt)",
        featured: false,
        features: [
            { text: "File APK Android Siap Install", included: true },
            { text: "PWA (Progressive Web App)", included: true },
            { text: "Custom App Icon & Splash Screen", included: true },
            { text: "Tampilan Fullscreen Tanpa Bar Browser", included: true },
            { text: "Offline Fallback Screen", included: true },
            { text: "1x Revisi", included: true },
            { text: "Push Notification Firebase", included: false },
            { text: "Bantuan Publish Play Store (Add-on)", included: false },
        ],
    },
    {
        name: "Native Android",
        tagline: "Flutter / React Native",
        price: "Rp 4.500.000",
        period: "mulai dari",
        domainBadge: "Google Play Store Ready",
        icon: "phone_android",
        desc: "Aplikasi mobile responsif & performa tinggi, cocok untuk startup, booking, dan e-commerce.",
        cta: "Saya%20tertarik%20dengan%20Paket%20Mobile%20Native%20Android%20(Rp%204.5jt)",
        featured: true,
        features: [
            { text: "Flutter / React Native Codebase", included: true },
            { text: "4 – 6 Layar Interaktif", included: true },
            { text: "Push Notification (Firebase)", included: true },
            { text: "Autentikasi User & API Backend Sync", included: true },
            { text: "Bantuan Setup & Publish Play Store", included: true },
            { text: "Full Source Code Diserahkan", included: true },
            { text: "3x Revisi", included: true },
            { text: "Garansi Bug 1 Bulan", included: true },
        ],
    },
    {
        name: "Full Ecosystem",
        tagline: "Android + iOS Enterprise",
        price: "Mulai Rp 9.5 Jt",
        period: "custom scope",
        domainBadge: "Play Store & App Store",
        icon: "devices",
        desc: "Aplikasi cross-platform lengkap untuk Android & iOS dengan backend mandiri dan admin panel.",
        cta: "Saya%20mau%20konsultasi%20Aplikasi%20Mobile%20Enterprise",
        featured: false,
        features: [
            { text: "Rilis Android (Play Store) & iOS (App Store)", included: true },
            { text: "Dedicated Backend REST/GraphQL API", included: true },
            { text: "Admin Web Panel & Realtime Analytics", included: true },
            { text: "Integrasi Payment Gateway", included: true },
            { text: "Realtime WebSocket / GPS Tracking", included: true },
            { text: "Full Architecture & Source Code", included: true },
            { text: "Garansi Bug Maintenance 3 Bulan", included: true },
            { text: "Dedicated Technical Support", included: true },
        ],
    },
];

export default function Pricing() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [category, setCategory] = useState<"website" | "mobile">("website");

    const currentTiers = category === "website" ? websiteTiers : mobileTiers;

    return (
        <section id="pricing" className="py-24 relative" ref={ref}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark/90 z-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-primary/30 text-xs sm:text-sm font-semibold text-primary-glow mb-4">
                        <span className="material-icons text-sm text-primary">sell</span>
                        Harga Transparan & Masuk Akal
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Pilih Paket, Langsung Jalan
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                        Nggak perlu bingung. Tinggal pilih paket sesuai kebutuhan — paket website sudah termasuk hosting, domain resmi, dan SSL gratis.
                    </p>
                </motion.div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-12 sm:mb-16">
                    <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl gap-2">
                        <button
                            type="button"
                            onClick={() => setCategory("website")}
                            className={`flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                category === "website"
                                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <span className="material-icons text-base">language</span>
                            <span>Website</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setCategory("mobile")}
                            className={`flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                category === "mobile"
                                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <span className="material-icons text-base">smartphone</span>
                            <span>Aplikasi Mobile</span>
                        </button>
                    </div>
                </div>

                {/* Tiers Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className={`grid gap-6 ${
                            category === "website"
                                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
                                : "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
                        }`}
                    >
                        {currentTiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 flex flex-col ${
                                    tier.featured
                                        ? "border-primary/50 shadow-[0_0_40px_rgba(99,102,241,0.18)] ring-1 ring-primary/40"
                                        : ""
                                }`}
                            >
                                {/* Neon border effect */}
                                <div className="absolute inset-0 rounded-3xl neon-border pointer-events-none" />

                                {/* Background icon */}
                                <div className="absolute top-0 right-0 p-4 opacity-30 pointer-events-none">
                                    <span className="material-icons text-5xl sm:text-6xl text-white/5">
                                        {tier.icon}
                                    </span>
                                </div>

                                {/* Featured badge */}
                                {tier.featured && (
                                    <>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold px-4 py-1 rounded-b-lg uppercase tracking-wider shadow-md">
                                                Paling Populer
                                            </span>
                                        </div>
                                    </>
                                )}

                                {/* Header & Tagline */}
                                <div className="mt-2 mb-3">
                                    <div
                                        className={`text-xs ${
                                            tier.featured ? "text-primary-glow" : "text-primary"
                                        } uppercase tracking-wider font-bold mb-1`}
                                    >
                                        {tier.tagline}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                                        {tier.name}
                                    </h3>
                                </div>

                                {/* Price block */}
                                <div className="mb-4 pb-4 border-b border-white/10">
                                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                                        {tier.price}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        {tier.period}
                                    </div>

                                    {/* Domain / Tech Badge */}
                                    {tier.domainBadge && (
                                        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
                                            <span className="material-icons text-xs text-primary-glow">
                                                {category === "website" ? "public" : "verified"}
                                            </span>
                                            <span>{tier.domainBadge}</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                                    {tier.desc}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2.5 mb-8 flex-grow">
                                    {tier.features.map((feature, fIndex) => (
                                        <li
                                            key={fIndex}
                                            className="flex items-start gap-2.5"
                                        >
                                            <span
                                                className={`material-icons text-sm mt-0.5 shrink-0 ${
                                                    feature.included
                                                        ? "text-emerald-400"
                                                        : "text-slate-600"
                                                }`}
                                            >
                                                {feature.included ? "check_circle" : "remove_circle_outline"}
                                            </span>
                                            <span
                                                className={`text-xs sm:text-sm ${
                                                    feature.included
                                                        ? "text-slate-300"
                                                        : "text-slate-600 line-through"
                                                }`}
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <a
                                    href={`https://wa.me/6281224621353?text=${tier.cta}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full block text-center font-bold py-3 sm:py-3.5 rounded-xl transition-all relative overflow-hidden mt-auto text-sm ${
                                        tier.featured
                                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
                                            : "bg-white/5 hover:bg-white/15 border border-white/10 text-white"
                                    }`}
                                >
                                    <span className="relative z-10">Pilih Paket — Chat WA</span>
                                    {tier.featured && (
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    )}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
