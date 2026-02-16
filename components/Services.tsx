"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ──────────────────────────────────────────────────────────
   Each service has a mini animated prototype built purely
   from CSS / HTML elements.  Components appear step-by-step.
   ────────────────────────────────────────────────────────── */

interface PrototypeComponent {
    type: "nav" | "hero-text" | "button" | "card" | "grid" | "sidebar" | "chart" | "phone" | "receipt" | "calendar" | "qr" | "image" | "search" | "list-item";
    label?: string;
    color: string;
    width?: string;
    height?: string;
}

interface ServiceData {
    title: string;
    subtitle: string;
    color: string;
    accentFrom: string;
    accentTo: string;
    icon: string;
    components: PrototypeComponent[];
}

const services: ServiceData[] = [
    {
        title: "Landing Page Kilat",
        subtitle: "Konversi tinggi dengan desain memukau",
        color: "blue",
        accentFrom: "from-blue-500",
        accentTo: "to-cyan-400",
        icon: "speed",
        components: [
            { type: "nav", color: "bg-blue-500/30", width: "100%", height: "h-6" },
            { type: "hero-text", label: "Brand Kamu", color: "bg-blue-400/40", width: "70%", height: "h-8" },
            { type: "hero-text", color: "bg-blue-300/20", width: "90%", height: "h-3" },
            { type: "hero-text", color: "bg-blue-300/15", width: "60%", height: "h-3" },
            { type: "button", label: "CTA", color: "bg-blue-500", width: "40%", height: "h-7" },
            { type: "grid", color: "bg-blue-500/10", width: "100%", height: "h-16" },
        ],
    },
    {
        title: "E-Commerce Mewah",
        subtitle: "Toko online premium siap jualan",
        color: "purple",
        accentFrom: "from-purple-500",
        accentTo: "to-fuchsia-400",
        icon: "storefront",
        components: [
            { type: "nav", color: "bg-purple-500/30", width: "100%", height: "h-6" },
            { type: "search", color: "bg-purple-400/20", width: "80%", height: "h-5" },
            { type: "card", color: "bg-purple-500/15", width: "48%", height: "h-20" },
            { type: "card", color: "bg-purple-400/15", width: "48%", height: "h-20" },
            { type: "card", color: "bg-purple-500/10", width: "48%", height: "h-20" },
            { type: "card", color: "bg-purple-400/10", width: "48%", height: "h-20" },
        ],
    },
    {
        title: "Mobile App Commerce",
        subtitle: "Native feel untuk iOS & Android",
        color: "pink",
        accentFrom: "from-pink-500",
        accentTo: "to-rose-400",
        icon: "install_mobile",
        components: [
            { type: "phone", color: "bg-pink-500/20", width: "100%", height: "h-6" },
            { type: "image", color: "bg-pink-400/15", width: "100%", height: "h-16" },
            { type: "hero-text", color: "bg-pink-300/20", width: "60%", height: "h-4" },
            { type: "hero-text", color: "bg-pink-300/10", width: "40%", height: "h-3" },
            { type: "grid", color: "bg-pink-500/10", width: "100%", height: "h-14" },
            { type: "button", label: "Checkout", color: "bg-pink-500", width: "80%", height: "h-7" },
        ],
    },
    {
        title: "Custom Dashboard",
        subtitle: "Pantau bisnis Anda real-time",
        color: "indigo",
        accentFrom: "from-indigo-500",
        accentTo: "to-blue-400",
        icon: "dashboard",
        components: [
            { type: "sidebar", color: "bg-indigo-600/30", width: "25%", height: "h-full" },
            { type: "nav", color: "bg-indigo-500/20", width: "100%", height: "h-6" },
            { type: "card", color: "bg-indigo-500/15", width: "30%", height: "h-12" },
            { type: "card", color: "bg-indigo-400/15", width: "30%", height: "h-12" },
            { type: "card", color: "bg-indigo-500/10", width: "30%", height: "h-12" },
            { type: "chart", color: "bg-indigo-500/10", width: "100%", height: "h-24" },
        ],
    },
    {
        title: "POS Kasir Modern",
        subtitle: "Kelola transaksi lebih mudah & akurat",
        color: "orange",
        accentFrom: "from-orange-500",
        accentTo: "to-amber-400",
        icon: "point_of_sale",
        components: [
            { type: "nav", color: "bg-orange-500/30", width: "100%", height: "h-6" },
            { type: "list-item", color: "bg-orange-500/15", width: "100%", height: "h-6" },
            { type: "list-item", color: "bg-orange-400/10", width: "100%", height: "h-6" },
            { type: "list-item", color: "bg-orange-500/10", width: "100%", height: "h-6" },
            { type: "receipt", color: "bg-orange-500/20", width: "60%", height: "h-16" },
            { type: "button", label: "Bayar", color: "bg-orange-500", width: "50%", height: "h-7" },
        ],
    },
    {
        title: "Sistem Rental",
        subtitle: "Booking engine otomatis",
        color: "teal",
        accentFrom: "from-teal-500",
        accentTo: "to-emerald-400",
        icon: "car_rental",
        components: [
            { type: "nav", color: "bg-teal-500/30", width: "100%", height: "h-6" },
            { type: "calendar", color: "bg-teal-400/15", width: "100%", height: "h-20" },
            { type: "card", color: "bg-teal-500/15", width: "48%", height: "h-14" },
            { type: "card", color: "bg-teal-400/10", width: "48%", height: "h-14" },
            { type: "search", color: "bg-teal-400/20", width: "70%", height: "h-5" },
            { type: "button", label: "Book", color: "bg-teal-500", width: "50%", height: "h-7" },
        ],
    },
    {
        title: "Kafe Digital",
        subtitle: "QR Menu & loyalty system",
        color: "amber",
        accentFrom: "from-amber-500",
        accentTo: "to-yellow-400",
        icon: "coffee",
        components: [
            { type: "nav", color: "bg-amber-500/30", width: "100%", height: "h-6" },
            { type: "qr", color: "bg-amber-400/20", width: "40%", height: "h-16" },
            { type: "list-item", label: "Coffee", color: "bg-amber-500/15", width: "100%", height: "h-6" },
            { type: "list-item", label: "Food", color: "bg-amber-400/10", width: "100%", height: "h-6" },
            { type: "list-item", label: "Dessert", color: "bg-amber-500/10", width: "100%", height: "h-6" },
            { type: "button", label: "Order", color: "bg-amber-500", width: "60%", height: "h-7" },
        ],
    },
];

function PrototypeCard({ service, index }: { service: ServiceData; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const isDashboard = service.title === "Custom Dashboard";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            {/* Glow behind card */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${service.accentFrom} ${service.accentTo} rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

            <div className="relative glass-panel rounded-3xl p-6 hover:bg-white/[0.03] transition-all duration-500 h-full flex flex-col">
                {/* Prototype Screen */}
                <div className="relative bg-black/60 rounded-xl border border-white/5 p-3 mb-5 overflow-hidden min-h-[200px]">
                    {/* Screen dots */}
                    <div className="flex gap-1.5 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-500/60" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                        <div className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>

                    {/* Animated components */}
                    <div className={`flex flex-col gap-2 ${isDashboard ? "relative" : ""}`}>
                        {isDashboard && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="absolute left-0 top-0 bottom-0 w-[25%] bg-indigo-600/20 rounded-lg border border-indigo-500/10"
                            >
                                <div className="flex flex-col gap-2 p-2 mt-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="h-2 bg-indigo-400/20 rounded-full" />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        <div className={isDashboard ? "ml-[30%]" : ""}>
                            {service.components
                                .filter((c) => c.type !== "sidebar")
                                .map((comp, cIndex) => {
                                    const isProductGrid = comp.type === "card";
                                    if (isProductGrid && cIndex > 0 && service.components[cIndex - 1]?.type === "card") {
                                        return null; // paired with previous
                                    }

                                    const nextComp = service.components[cIndex + 1];
                                    const isPair = isProductGrid && nextComp?.type === "card";

                                    return (
                                        <motion.div
                                            key={cIndex}
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.4 + cIndex * 0.12 + index * 0.05,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className={`mb-2 ${isPair ? "flex gap-2" : ""}`}
                                        >
                                            {isPair ? (
                                                <>
                                                    <div
                                                        className={`${comp.color} rounded-lg flex-1 ${comp.height} border border-white/5`}
                                                        style={{ width: comp.width }}
                                                    >
                                                        <div className="p-2">
                                                            <div className="w-full h-[60%] bg-white/5 rounded mb-1" />
                                                            <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${nextComp.color} rounded-lg flex-1 ${nextComp.height} border border-white/5`}
                                                    >
                                                        <div className="p-2">
                                                            <div className="w-full h-[60%] bg-white/5 rounded mb-1" />
                                                            <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : comp.type === "button" ? (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} flex items-center justify-center mx-auto`}
                                                    style={{ width: comp.width }}
                                                >
                                                    <span className="text-[10px] text-white font-bold tracking-wide">
                                                        {comp.label}
                                                    </span>
                                                </div>
                                            ) : comp.type === "qr" ? (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} flex items-center justify-center mx-auto border border-white/10`}
                                                    style={{ width: comp.width }}
                                                >
                                                    <span className="material-icons text-white/30 text-2xl">
                                                        qr_code_2
                                                    </span>
                                                </div>
                                            ) : comp.type === "chart" ? (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} border border-white/5 p-2 flex items-end gap-1`}
                                                    style={{ width: comp.width }}
                                                >
                                                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ scaleY: 0 }}
                                                            animate={isInView ? { scaleY: 1 } : {}}
                                                            transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                                                            className="flex-1 bg-indigo-400/30 rounded-t origin-bottom"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    ))}
                                                </div>
                                            ) : comp.type === "calendar" ? (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} border border-white/5 p-2`}
                                                    style={{ width: comp.width }}
                                                >
                                                    <div className="grid grid-cols-7 gap-1">
                                                        {[...Array(21)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`h-2 rounded-sm ${i === 8 || i === 15 ? "bg-teal-400/40" : "bg-white/5"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : comp.type === "search" ? (
                                                <div
                                                    className={`${comp.color} rounded-full ${comp.height} border border-white/10 flex items-center px-3 gap-2 mx-auto`}
                                                    style={{ width: comp.width }}
                                                >
                                                    <span className="material-icons text-white/20 text-xs">search</span>
                                                    <div className="h-1.5 bg-white/10 rounded-full flex-1" />
                                                </div>
                                            ) : comp.type === "list-item" ? (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} border border-white/5 flex items-center px-3 justify-between`}
                                                    style={{ width: comp.width }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded bg-white/10" />
                                                        <div className="w-12 h-1.5 bg-white/15 rounded-full" />
                                                    </div>
                                                    <div className="w-8 h-1.5 bg-white/10 rounded-full" />
                                                </div>
                                            ) : comp.type === "nav" ? (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} flex items-center px-3 justify-between border border-white/5`}
                                                    style={{ width: comp.width }}
                                                >
                                                    <div className="w-6 h-2 bg-white/20 rounded" />
                                                    <div className="flex gap-2">
                                                        <div className="w-4 h-1.5 bg-white/10 rounded-full" />
                                                        <div className="w-4 h-1.5 bg-white/10 rounded-full" />
                                                        <div className="w-4 h-1.5 bg-white/10 rounded-full" />
                                                    </div>
                                                </div>
                                            ) : comp.type === "hero-text" ? (
                                                <div
                                                    className={`${comp.color} rounded ${comp.height}`}
                                                    style={{ width: comp.width }}
                                                >
                                                    {comp.label && (
                                                        <span className="text-[10px] text-white/60 font-bold flex items-center h-full px-2">
                                                            {comp.label}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : comp.type === "phone" ? (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} flex items-center justify-center border border-white/10`}
                                                    style={{ width: comp.width }}
                                                >
                                                    <div className="w-8 h-1 bg-white/20 rounded-full" />
                                                </div>
                                            ) : (
                                                <div
                                                    className={`${comp.color} rounded-lg ${comp.height} border border-white/5`}
                                                    style={{ width: comp.width }}
                                                />
                                            )}
                                        </motion.div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {/* Category label */}
                <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center shadow-lg`}>
                            <span className="material-icons text-white text-xl">{service.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-bold text-white">{service.title}</h3>
                            <p className="text-xs text-slate-500">{service.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Auto-cycle for mobile
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % services.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="services" className="py-24 relative overflow-hidden" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-glow font-bold tracking-widest text-xs uppercase mb-3 block">
                        Prototype Showcase
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Layanan Digital Lengkap
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Setiap layanan divisualisasikan sebagai prototype interaktif.
                        Lihat bagaimana kami membangun solusi digital Anda.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
                </motion.div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <PrototypeCard key={index} service={service} index={index} />
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <div className="relative overflow-hidden">
                        <motion.div
                            animate={{ x: `-${activeIndex * 100}%` }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex"
                        >
                            {services.map((service, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-2">
                                    <PrototypeCard service={service} index={0} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                                    ? "w-8 bg-primary"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
