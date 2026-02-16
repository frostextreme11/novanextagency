"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tiers = [
    {
        name: "Website UMKM",
        tagline: "Starter Pack",
        icon: "store",
        desc: "Solusi tepat untuk bisnis yang baru merambah dunia digital. Cepat, Murah, Keren.",
        cta: "Saya%20mau%20bikin%20website%20untuk%20umkm%20saya",
        featured: false,
        features: [
            { text: "Free Hosting 1 Tahun", included: true },
            { text: "Free Domain .com", included: true },
            { text: "SSL Certificate", included: true },
            { text: "Responsive Design", included: true },
            { text: "SEO Basic", included: true },
            { text: "3x Revisi", included: true },
            { text: "Source Code", included: false },
            { text: "Custom Dashboard", included: false },
        ],
    },
    {
        name: "Website Corporate",
        tagline: "Business Growth",
        icon: "business",
        desc: "Upgrade kredibilitas perusahaan dengan website company profile yang profesional dan elegan.",
        cta: "Saya%20tertarik%20bikin%20website%20corporate",
        featured: true,
        features: [
            { text: "Free Hosting 1 Tahun", included: true },
            { text: "Free Domain .com", included: true },
            { text: "SSL Certificate", included: true },
            { text: "Responsive Design", included: true },
            { text: "SEO Optimization Pro", included: true },
            { text: "Unlimited Revisi", included: true },
            { text: "Source Code", included: true },
            { text: "Custom Dashboard", included: true },
            { text: "Analytics Integration", included: true },
            { text: "24/7 Priority Support", included: true },
        ],
    },
    {
        name: "Aplikasi Mobile",
        tagline: "Enterprise Scale",
        icon: "smartphone",
        desc: "Jangkau pelanggan di genggaman mereka dengan aplikasi Android & iOS native.",
        cta: "Saya%20mau%20bikin%20aplikasi%20mobile%20untuk%20brand%20saya",
        featured: false,
        features: [
            { text: "Android & iOS Native", included: true },
            { text: "Backend + API", included: true },
            { text: "Push Notification", included: true },
            { text: "Cloud Hosting", included: true },
            { text: "Play Store & App Store", included: true },
            { text: "Unlimited Revisi", included: true },
            { text: "Source Code", included: true },
            { text: "Admin Dashboard", included: true },
        ],
    },
];

export default function Pricing() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="pricing" className="py-24 relative" ref={ref}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark/90 z-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Investasi Terbaik
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Pilih paket yang sesuai dengan skala bisnis Anda. Semua paket sudah
                        termasuk hosting & domain.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 flex flex-col ${tier.featured
                                ? "border-primary/50 shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                                : ""
                                }`}
                        >
                            {/* Neon border effect */}
                            <div className="absolute inset-0 rounded-3xl neon-border pointer-events-none" />

                            {/* Background icon */}
                            <div className="absolute top-0 right-0 p-4 opacity-50">
                                <span className="material-icons text-5xl sm:text-6xl text-white/5">
                                    {tier.icon}
                                </span>
                            </div>

                            {/* Featured bar */}
                            {tier.featured && (
                                <>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold px-4 py-1 rounded-b-lg uppercase tracking-wider">
                                            Popular
                                        </span>
                                    </div>
                                </>
                            )}

                            {/* Tier Info */}
                            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 mt-2">
                                {tier.name}
                            </h3>
                            <div
                                className={`text-sm ${tier.featured ? "text-primary-glow" : "text-primary"
                                    } mb-4 uppercase tracking-wider font-bold`}
                            >
                                {tier.tagline}
                            </div>
                            <p className="text-slate-400 text-sm mb-6 border-b border-white/10 pb-6">
                                {tier.desc}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-grow">
                                {tier.features.map((feature, fIndex) => (
                                    <motion.li
                                        key={fIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{
                                            delay: 0.3 + index * 0.1 + fIndex * 0.05,
                                            duration: 0.3,
                                        }}
                                        className="flex items-center gap-3"
                                    >
                                        <span
                                            className={`material-icons text-sm ${feature.included
                                                ? "text-green-400"
                                                : "text-slate-600"
                                                }`}
                                        >
                                            {feature.included ? "check_circle" : "remove_circle_outline"}
                                        </span>
                                        <span
                                            className={`text-sm ${feature.included
                                                ? "text-slate-300"
                                                : "text-slate-600 line-through"
                                                }`}
                                        >
                                            {feature.text}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href={`https://wa.me/6281224621353?text=${tier.cta}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full block text-center font-bold py-3 sm:py-4 rounded-xl transition-all relative overflow-hidden mt-auto ${tier.featured
                                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
                                    : "bg-white/5 hover:bg-white/20 border border-white/10 text-white"
                                    }`}
                            >
                                <span className="relative z-10">Gratis Konsultasi</span>
                                {tier.featured && (
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                )}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
