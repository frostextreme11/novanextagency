"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ================================================================
   SERVICE DATA — 8 categories, each with prototype components
   and feature list for the spotlight view
   ================================================================ */

interface Feature {
    icon: string;
    label: string;
}

interface ServiceData {
    title: string;
    subtitle: string;
    icon: string;
    accentFrom: string;
    accentTo: string;
    accentColor: string; // single tailwind color token for misc usage
    features: Feature[];
}

const services: ServiceData[] = [
    {
        title: "Landing Page Kilat",
        subtitle: "Halaman yang bikin pengunjung langsung action",
        icon: "speed",
        accentFrom: "from-blue-500",
        accentTo: "to-cyan-400",
        accentColor: "blue",
        features: [
            { icon: "bolt", label: "Loading Super Cepat" },
            { icon: "auto_awesome", label: "Animasi Premium" },
            { icon: "analytics", label: "Tracking Konversi" },
            { icon: "devices", label: "Responsif Semua Device" },
            { icon: "palette", label: "Branding Custom" },
            { icon: "search", label: "SEO Siap Ranking" },
        ],
    },
    {
        title: "E-Commerce Keren",
        subtitle: "Toko online yang jualan sendiri",
        icon: "storefront",
        accentFrom: "from-purple-500",
        accentTo: "to-fuchsia-400",
        accentColor: "purple",
        features: [
            { icon: "shopping_cart", label: "Keranjang Pintar" },
            { icon: "payment", label: "Multi Pembayaran" },
            { icon: "inventory", label: "Stok Real-time" },
            { icon: "local_shipping", label: "Ongkir Otomatis" },
            { icon: "loyalty", label: "Program Loyalti" },
            { icon: "bar_chart", label: "Laporan Penjualan" },
        ],
    },
    {
        title: "Mobile App Commerce",
        subtitle: "Toko di genggaman — iOS & Android",
        icon: "install_mobile",
        accentFrom: "from-pink-500",
        accentTo: "to-rose-400",
        accentColor: "pink",
        features: [
            { icon: "notifications_active", label: "Notif Pesanan" },
            { icon: "fingerprint", label: "Login Sidik Jari" },
            { icon: "offline_bolt", label: "Mode Offline" },
            { icon: "speed", label: "Performa Native" },
            { icon: "cloud_sync", label: "Sinkron Real-time" },
            { icon: "security", label: "Enkripsi Data" },
        ],
    },
    {
        title: "Custom Dashboard",
        subtitle: "Pantau semua data bisnis dari satu layar",
        icon: "dashboard",
        accentFrom: "from-indigo-500",
        accentTo: "to-blue-400",
        accentColor: "indigo",
        features: [
            { icon: "insights", label: "Monitor Real-time" },
            { icon: "pivot_table_chart", label: "Visualisasi Data" },
            { icon: "manage_accounts", label: "Kelola Tim & Role" },
            { icon: "download", label: "Export Laporan" },
            { icon: "api", label: "Integrasi API" },
            { icon: "dark_mode", label: "Dark / Light Mode" },
        ],
    },
    {
        title: "POS Kasir Modern",
        subtitle: "Kasir digital anti ribet",
        icon: "point_of_sale",
        accentFrom: "from-orange-500",
        accentTo: "to-amber-400",
        accentColor: "orange",
        features: [
            { icon: "receipt_long", label: "Struk Digital" },
            { icon: "qr_code_scanner", label: "Scan Barcode" },
            { icon: "account_balance_wallet", label: "Multi Pembayaran" },
            { icon: "assessment", label: "Laporan Harian" },
            { icon: "group", label: "Multi Kasir" },
            { icon: "inventory_2", label: "Alert Stok Habis" },
        ],
    },
    {
        title: "Sistem Rental",
        subtitle: "Booking & manajemen armada otomatis",
        icon: "car_rental",
        accentFrom: "from-teal-500",
        accentTo: "to-emerald-400",
        accentColor: "teal",
        features: [
            { icon: "calendar_month", label: "Kalender Pintar" },
            { icon: "event_available", label: "Booking Otomatis" },
            { icon: "directions_car", label: "Kelola Armada" },
            { icon: "credit_card", label: "Bayar Online" },
            { icon: "sms", label: "Pengingat Otomatis" },
            { icon: "star", label: "Rating & Review" },
        ],
    },
    {
        title: "Kafe Digital",
        subtitle: "Pesan via QR, bayar, selesai",
        icon: "coffee",
        accentFrom: "from-amber-500",
        accentTo: "to-yellow-400",
        accentColor: "amber",
        features: [
            { icon: "qr_code_2", label: "Scan QR Menu" },
            { icon: "restaurant_menu", label: "Menu Digital" },
            { icon: "delivery_dining", label: "Order Online" },
            { icon: "loyalty", label: "Poin Loyalti" },
            { icon: "table_restaurant", label: "Booking Meja" },
            { icon: "kitchen", label: "Layar Dapur" },
        ],
    },
    {
        title: "Portal Akademis Online",
        subtitle: "Belajar, ujian & absensi — semua online",
        icon: "school",
        accentFrom: "from-emerald-500",
        accentTo: "to-green-400",
        accentColor: "emerald",
        features: [
            { icon: "menu_book", label: "E-Learning LMS" },
            { icon: "assignment", label: "Tugas & Ujian Online" },
            { icon: "grade", label: "Rapor Digital" },
            { icon: "video_camera_front", label: "Kelas Video" },
            { icon: "co_present", label: "Absensi Online" },
            { icon: "forum", label: "Forum Diskusi" },
        ],
    },
];

/* ================================================================
   PROTOTYPE RENDERER — each service gets a unique animated mockup
   ================================================================ */

function PrototypeMockup({ service, isActive }: { service: ServiceData; isActive: boolean }) {
    const key = service.title;

    const stagger = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    };
    const scaleIn = {
        hidden: { opacity: 0, scale: 0.85 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
    };

    const barColors: Record<string, string> = {
        blue: "bg-blue-400/50",
        purple: "bg-purple-400/50",
        pink: "bg-pink-400/50",
        indigo: "bg-indigo-400/50",
        orange: "bg-orange-400/50",
        teal: "bg-teal-400/50",
        amber: "bg-amber-400/50",
        emerald: "bg-emerald-400/50",
    };
    const bar = barColors[service.accentColor] || "bg-white/20";

    const barLightColors: Record<string, string> = {
        blue: "bg-blue-400/20",
        purple: "bg-purple-400/20",
        pink: "bg-pink-400/20",
        indigo: "bg-indigo-400/20",
        orange: "bg-orange-400/20",
        teal: "bg-teal-400/20",
        amber: "bg-amber-400/20",
        emerald: "bg-emerald-400/20",
    };
    const barLight = barLightColors[service.accentColor] || "bg-white/10";

    /* ---- Landing Page prototype ---- */
    if (key === "Landing Page Kilat") {
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="space-y-3">
                <motion.div variants={fadeUp} className={`${bar} h-7 rounded-lg flex items-center px-3 justify-between`}>
                    <div className="w-10 h-3 bg-white/20 rounded" />
                    <div className="flex gap-2">{[1, 2, 3].map(i => <div key={i} className="w-6 h-2 bg-white/15 rounded-full" />)}</div>
                </motion.div>
                <motion.div variants={fadeUp} className="py-4 text-center">
                    <div className={`${bar} h-6 rounded mx-auto w-3/4 mb-2`} />
                    <div className="text-[11px] text-white/50 font-display font-bold tracking-wider">BRAND KAMU</div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex gap-2">
                    <div className={`${barLight} h-3 rounded-full flex-1`} />
                    <div className={`${barLight} h-3 rounded-full w-2/5`} />
                </motion.div>
                <motion.div variants={fadeUp} className={`${bar} h-8 rounded-lg w-2/5 mx-auto flex items-center justify-center`}>
                    <span className="text-[10px] text-white font-bold">Get Started</span>
                </motion.div>
                <motion.div variants={fadeUp} className="flex gap-2 pt-2">
                    {[1, 2, 3].map(i => (
                        <motion.div key={i} variants={scaleIn} className={`${barLight} rounded-lg flex-1 h-16 p-2 border border-white/5`}>
                            <div className="w-full h-[55%] bg-white/5 rounded mb-1" />
                            <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        );
    }

    /* ---- E-Commerce prototype ---- */
    if (key === "E-Commerce Keren") {
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="space-y-3">
                <motion.div variants={fadeUp} className={`${bar} h-7 rounded-lg flex items-center px-3 justify-between`}>
                    <div className="w-10 h-3 bg-white/20 rounded" />
                    <div className="flex gap-3 items-center">
                        <span className="material-icons text-white/30 text-xs">search</span>
                        <span className="material-icons text-white/30 text-xs">shopping_cart</span>
                    </div>
                </motion.div>
                <motion.div variants={fadeUp} className={`${barLight} h-5 rounded-full flex items-center px-3 gap-2 w-4/5`}>
                    <span className="material-icons text-white/20 text-[10px]">search</span>
                    <div className="h-1.5 bg-white/10 rounded-full flex-1" />
                </motion.div>
                <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map(i => (
                        <motion.div key={i} variants={scaleIn} className={`${barLight} rounded-lg h-20 p-2 border border-white/5`}>
                            <div className="w-full h-[55%] bg-white/5 rounded mb-1" />
                            <div className="w-3/4 h-1.5 bg-white/10 rounded-full mb-1" />
                            <div className="w-1/2 h-1.5 bg-white/15 rounded-full" />
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div variants={fadeUp} className={`${bar} h-8 rounded-lg w-3/5 mx-auto flex items-center justify-center gap-1`}>
                    <span className="material-icons text-white text-xs">shopping_bag</span>
                    <span className="text-[10px] text-white font-bold">Checkout</span>
                </motion.div>
            </motion.div>
        );
    }

    /* ---- Mobile App prototype — 3 phones: Home, Cart, Checkout ---- */
    if (key === "Mobile App Commerce") {
        const phoneFrame = "border-2 border-white/10 rounded-[18px] p-1.5 bg-black/40";
        const notch = (
            <motion.div variants={fadeUp} className="h-3 flex items-center justify-center mb-1">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
            </motion.div>
        );
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="flex justify-center gap-2 sm:gap-3 items-end">
                {/* Phone 1: Home E-Commerce */}
                <motion.div variants={scaleIn} className={`w-[110px] sm:w-[130px] ${phoneFrame}`}>
                    {notch}
                    <motion.div variants={fadeUp} className={`${barLight} h-5 rounded-md flex items-center px-2 justify-between mb-1.5`}>
                        <div className="w-8 h-2 bg-white/15 rounded" />
                        <div className="flex gap-1">
                            <span className="material-icons text-white/20" style={{ fontSize: '8px' }}>search</span>
                            <span className="material-icons text-white/20" style={{ fontSize: '8px' }}>shopping_cart</span>
                        </div>
                    </motion.div>
                    {/* Banner */}
                    <motion.div variants={fadeUp} className={`${bar} h-10 rounded-md mb-1.5 flex items-center justify-center`}>
                        <span className="text-[7px] text-white/70 font-bold">🔥 SALE 50% OFF</span>
                    </motion.div>
                    {/* Product grid */}
                    <motion.div variants={fadeUp} className="grid grid-cols-2 gap-1 mb-1">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`${barLight} rounded-md p-1 border border-white/5`}>
                                <div className="w-full h-5 bg-white/5 rounded mb-0.5" />
                                <div className="w-3/4 h-1 bg-white/10 rounded-full mb-0.5" />
                                <div className="w-1/2 h-1 bg-white/15 rounded-full" />
                            </div>
                        ))}
                    </motion.div>
                    {/* Bottom nav */}
                    <motion.div variants={fadeUp} className={`${barLight} h-4 rounded-md flex items-center justify-around`}>
                        {['home', 'search', 'favorite', 'person'].map((ic, i) => (
                            <span key={i} className={`material-icons ${i === 0 ? 'text-white/50' : 'text-white/15'}`} style={{ fontSize: '7px' }}>{ic}</span>
                        ))}
                    </motion.div>
                    <div className="text-center mt-1">
                        <span className="text-[7px] text-white/30 font-bold">HOME</span>
                    </div>
                </motion.div>

                {/* Phone 2: Cart — slightly taller / raised */}
                <motion.div variants={scaleIn} className={`w-[120px] sm:w-[140px] ${phoneFrame} ring-1 ring-white/5`}>
                    {notch}
                    <motion.div variants={fadeUp} className={`${bar} h-5 rounded-md flex items-center px-2 mb-1.5`}>
                        <span className="text-[8px] text-white/80 font-bold">Keranjang (3)</span>
                    </motion.div>
                    {/* Cart items */}
                    {['Sepatu Sport', 'Kaos Premium', 'Topi Snapback'].map((item, i) => (
                        <motion.div key={i} variants={fadeUp} className={`${barLight} h-7 rounded-md flex items-center px-2 justify-between border border-white/5 mb-1`}>
                            <div className="flex items-center gap-1">
                                <div className="w-4 h-4 bg-white/10 rounded" />
                                <div>
                                    <div className="text-[7px] text-white/50 leading-tight">{item}</div>
                                    <div className="text-[6px] text-white/30">Rp 199k</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <div className="w-3 h-3 bg-white/10 rounded text-[6px] text-white/40 flex items-center justify-center">-</div>
                                <div className="text-[7px] text-white/50 w-3 text-center">1</div>
                                <div className="w-3 h-3 bg-white/10 rounded text-[6px] text-white/40 flex items-center justify-center">+</div>
                            </div>
                        </motion.div>
                    ))}
                    {/* Total */}
                    <motion.div variants={fadeUp} className={`${barLight} h-5 rounded-md flex items-center px-2 justify-between border border-white/5 mb-1`}>
                        <span className="text-[7px] text-white/40">Total</span>
                        <span className="text-[8px] text-white/70 font-bold">Rp 597k</span>
                    </motion.div>
                    <motion.div variants={fadeUp} className={`${bar} h-6 rounded-md flex items-center justify-center`}>
                        <span className="text-[8px] text-white font-bold">Checkout →</span>
                    </motion.div>
                    <div className="text-center mt-1">
                        <span className="text-[7px] text-white/30 font-bold">CART</span>
                    </div>
                </motion.div>

                {/* Phone 3: Checkout */}
                <motion.div variants={scaleIn} className={`w-[110px] sm:w-[130px] ${phoneFrame}`}>
                    {notch}
                    <motion.div variants={fadeUp} className={`${bar} h-5 rounded-md flex items-center px-2 mb-1.5`}>
                        <span className="text-[8px] text-white/80 font-bold">Checkout</span>
                    </motion.div>
                    {/* Address */}
                    <motion.div variants={fadeUp} className={`${barLight} rounded-md p-1.5 border border-white/5 mb-1`}>
                        <div className="flex items-center gap-1 mb-0.5">
                            <span className="material-icons text-white/20" style={{ fontSize: '7px' }}>location_on</span>
                            <span className="text-[7px] text-white/50 font-bold">Alamat</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full mb-0.5" />
                        <div className="w-3/4 h-1 bg-white/10 rounded-full" />
                    </motion.div>
                    {/* Payment */}
                    <motion.div variants={fadeUp} className={`${barLight} rounded-md p-1.5 border border-white/5 mb-1`}>
                        <div className="flex items-center gap-1 mb-0.5">
                            <span className="material-icons text-white/20" style={{ fontSize: '7px' }}>credit_card</span>
                            <span className="text-[7px] text-white/50 font-bold">Pembayaran</span>
                        </div>
                        <div className="flex gap-1">
                            {['💳', '🏦', '📱'].map((e, i) => (
                                <div key={i} className={`flex-1 h-4 ${i === 0 ? bar : barLight} rounded text-[7px] flex items-center justify-center border border-white/5`}>{e}</div>
                            ))}
                        </div>
                    </motion.div>
                    {/* Summary */}
                    <motion.div variants={fadeUp} className={`${barLight} rounded-md p-1.5 border border-white/5 mb-1`}>
                        <div className="text-[7px] text-white/50 font-bold mb-0.5">Ringkasan</div>
                        {[['Subtotal', 'Rp 597k'], ['Ongkir', 'Rp 15k'], ['Total', 'Rp 612k']].map(([l, v], i) => (
                            <div key={i} className={`flex justify-between ${i === 2 ? 'border-t border-white/10 pt-0.5 mt-0.5' : ''}`}>
                                <span className="text-[6px] text-white/30">{l}</span>
                                <span className={`text-[6px] ${i === 2 ? 'text-white/70 font-bold' : 'text-white/40'}`}>{v}</span>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div variants={fadeUp} className={`${bar} h-6 rounded-md flex items-center justify-center gap-0.5`}>
                        <span className="material-icons text-white" style={{ fontSize: '8px' }}>lock</span>
                        <span className="text-[8px] text-white font-bold">Bayar</span>
                    </motion.div>
                    <div className="text-center mt-1">
                        <span className="text-[7px] text-white/30 font-bold">CHECKOUT</span>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    /* ---- Dashboard prototype ---- */
    if (key === "Custom Dashboard") {
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="flex gap-2">
                <motion.div variants={fadeUp} className={`${barLight} w-[60px] rounded-lg p-2 space-y-2 border border-white/5`}>
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-2 bg-white/10 rounded-full" />)}
                </motion.div>
                <div className="flex-1 space-y-2">
                    <motion.div variants={fadeUp} className={`${bar} h-6 rounded-lg flex items-center px-3 justify-between`}>
                        <div className="w-12 h-2 bg-white/20 rounded" />
                        <div className="w-5 h-5 bg-white/10 rounded-full" />
                    </motion.div>
                    <motion.div variants={fadeUp} className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <motion.div key={i} variants={scaleIn} className={`${barLight} rounded-lg flex-1 h-14 p-2 border border-white/5`}>
                                <div className="w-1/2 h-1.5 bg-white/10 rounded-full mb-1" />
                                <div className="w-3/4 h-3 bg-white/15 rounded font-bold" />
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div variants={fadeUp} className={`${barLight} rounded-lg h-24 p-2 border border-white/5 flex items-end gap-1`}>
                        {[35, 55, 40, 70, 50, 65, 80, 45, 60, 75, 55, 68].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ scaleY: 0 }}
                                animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                                className={`flex-1 ${bar} rounded-t origin-bottom`}
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    /* ---- POS Kasir prototype ---- */
    if (key === "POS Kasir Modern") {
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="flex gap-3">
                <div className="flex-1 space-y-2">
                    <motion.div variants={fadeUp} className={`${bar} h-6 rounded-lg flex items-center px-2`}>
                        <span className="text-[9px] text-white/70 font-bold">KASIR #1</span>
                    </motion.div>
                    {["Kopi Latte", "Croissant", "Matcha Ice"].map((item, i) => (
                        <motion.div key={i} variants={fadeUp} className={`${barLight} h-7 rounded-lg flex items-center px-3 justify-between border border-white/5`}>
                            <span className="text-[9px] text-white/50">{item}</span>
                            <span className="text-[9px] text-white/30">x1</span>
                        </motion.div>
                    ))}
                    <motion.div variants={fadeUp} className={`${bar} h-8 rounded-lg flex items-center justify-center`}>
                        <span className="text-[10px] text-white font-bold">Bayar — Rp 85k</span>
                    </motion.div>
                </div>
                <motion.div variants={scaleIn} className={`${barLight} w-[100px] rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center gap-1`}>
                    <span className="material-icons text-white/20 text-lg">receipt_long</span>
                    <div className="w-3/4 h-1 bg-white/10 rounded-full" />
                    <div className="w-1/2 h-1 bg-white/10 rounded-full" />
                    <div className="w-2/3 h-1 bg-white/10 rounded-full" />
                    <div className="w-full h-[1px] border-t border-dashed border-white/10 my-1" />
                    <div className="w-3/4 h-1.5 bg-white/15 rounded-full" />
                </motion.div>
            </motion.div>
        );
    }

    /* ---- Rental prototype ---- */
    if (key === "Sistem Rental") {
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="space-y-3">
                <motion.div variants={fadeUp} className={`${bar} h-7 rounded-lg flex items-center px-3 justify-between`}>
                    <span className="text-[9px] text-white/70 font-bold">MyRental</span>
                    <span className="material-icons text-white/30 text-xs">person</span>
                </motion.div>
                <motion.div variants={fadeUp} className={`${barLight} rounded-lg p-2 border border-white/5`}>
                    <div className="text-[8px] text-white/40 mb-1 font-bold">FEBRUARI 2026</div>
                    <div className="grid grid-cols-7 gap-1">
                        {[...Array(28)].map((_, i) => (
                            <div key={i} className={`h-3 rounded-sm text-center text-[6px] flex items-center justify-center ${i === 12 || i === 13 || i === 14 ? `${bar}` : "bg-white/5"} ${i === 12 ? "text-white/70" : "text-white/20"}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex gap-2">
                    {["Avanza", "Innova"].map((car, i) => (
                        <motion.div key={i} variants={scaleIn} className={`${barLight} rounded-lg flex-1 p-2 border border-white/5`}>
                            <span className="material-icons text-white/20 text-lg">directions_car</span>
                            <div className="text-[9px] text-white/50 mt-1">{car}</div>
                            <div className="text-[8px] text-white/30">Available</div>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div variants={fadeUp} className={`${bar} h-8 rounded-lg flex items-center justify-center gap-1`}>
                    <span className="text-[10px] text-white font-bold">Book Now</span>
                </motion.div>
            </motion.div>
        );
    }

    /* ---- Kafe Digital prototype ---- */
    if (key === "Kafe Digital") {
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="space-y-3">
                <motion.div variants={fadeUp} className="flex items-center justify-center py-2">
                    <div className={`${barLight} w-16 h-16 rounded-xl flex items-center justify-center border border-white/10`}>
                        <span className="material-icons text-white/30 text-2xl">qr_code_2</span>
                    </div>
                </motion.div>
                <motion.div variants={fadeUp} className="text-center text-[9px] text-white/40 font-bold">SCAN TO ORDER</motion.div>
                {["Espresso", "Matcha Latte", "Red Velvet"].map((item, i) => (
                    <motion.div key={i} variants={fadeUp} className={`${barLight} h-8 rounded-lg flex items-center px-3 justify-between border border-white/5`}>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-white/10 rounded" />
                            <span className="text-[9px] text-white/50">{item}</span>
                        </div>
                        <span className="text-[9px] text-white/30">+</span>
                    </motion.div>
                ))}
                <motion.div variants={fadeUp} className={`${bar} h-8 rounded-lg flex items-center justify-center gap-1`}>
                    <span className="material-icons text-white text-xs">delivery_dining</span>
                    <span className="text-[10px] text-white font-bold">Order</span>
                </motion.div>
            </motion.div>
        );
    }

    /* ---- Portal Akademis prototype ---- */
    if (key === "Portal Akademis Online") {
        return (
            <motion.div key={key} variants={stagger} initial="hidden" animate={isActive ? "show" : "hidden"} className="space-y-3">
                <motion.div variants={fadeUp} className={`${bar} h-7 rounded-lg flex items-center px-3 justify-between`}>
                    <span className="text-[9px] text-white/70 font-bold">EduPortal</span>
                    <div className="flex gap-1">
                        <span className="material-icons text-white/30 text-xs">notifications</span>
                        <span className="material-icons text-white/30 text-xs">person</span>
                    </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex gap-2">
                    {[{ icon: "menu_book", label: "Courses", val: "12" }, { icon: "assignment", label: "Tasks", val: "5" }, { icon: "grade", label: "GPA", val: "3.8" }].map((c, i) => (
                        <motion.div key={i} variants={scaleIn} className={`${barLight} rounded-lg flex-1 p-2 text-center border border-white/5`}>
                            <span className="material-icons text-white/25 text-sm">{c.icon}</span>
                            <div className="text-[10px] text-white/60 font-bold">{c.val}</div>
                            <div className="text-[7px] text-white/30">{c.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
                {["Matematika Diskrit", "Basis Data", "Pemrograman Web"].map((item, i) => (
                    <motion.div key={i} variants={fadeUp} className={`${barLight} h-7 rounded-lg flex items-center px-3 justify-between border border-white/5`}>
                        <span className="text-[9px] text-white/50">{item}</span>
                        <div className={`w-10 h-3 ${bar} rounded-full`}>
                            <div className="h-full bg-white/20 rounded-full" style={{ width: `${70 + i * 10}%` }} />
                        </div>
                    </motion.div>
                ))}
                <motion.div variants={fadeUp} className={`${bar} h-8 rounded-lg flex items-center justify-center gap-1`}>
                    <span className="material-icons text-white text-xs">video_camera_front</span>
                    <span className="text-[10px] text-white font-bold">Join Class</span>
                </motion.div>
            </motion.div>
        );
    }

    /* Fallback */
    return null;
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const CYCLE_MS = 5000;

    const resetInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % services.length);
        }, CYCLE_MS);
    }, []);

    useEffect(() => {
        resetInterval();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [resetInterval]);

    const handleSelect = (i: number) => {
        setActiveIndex(i);
        resetInterval();
    };

    const active = services[activeIndex];

    return (
        <section id="services" className="py-20 sm:py-24 relative overflow-hidden" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="text-primary-glow font-bold tracking-widest text-xs uppercase mb-3 block">
                        Prototype Showcase
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Apa yang Bisa Kami Buatkan?
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                        Klik salah satu layanan — lihat langsung preview prototype-nya.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
                </motion.div>

                {/* ===== SPOTLIGHT AREA ===== */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Left: highlighted prototype (large) */}
                    <motion.div
                        layout
                        className="lg:w-[55%] xl:w-[58%] flex-shrink-0"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="glass-panel rounded-3xl p-5 sm:p-7 border border-white/10 relative overflow-hidden"
                            >
                                {/* Glow */}
                                <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${active.accentFrom} ${active.accentTo} rounded-full blur-[100px] opacity-20 pointer-events-none`} />

                                {/* Title bar */}
                                <div className="flex items-center gap-3 mb-5 relative z-10">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${active.accentFrom} ${active.accentTo} flex items-center justify-center shadow-lg`}>
                                        <span className="material-icons text-white text-xl">{active.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-display font-bold text-white">{active.title}</h3>
                                        <p className="text-xs text-slate-500">{active.subtitle}</p>
                                    </div>
                                </div>

                                {/* Prototype screen */}
                                <div className="bg-black/50 rounded-xl border border-white/5 p-4 mb-5 relative z-10 min-h-[220px] sm:min-h-[260px]">
                                    <div className="flex gap-1.5 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/60" />
                                    </div>
                                    <PrototypeMockup service={active} isActive={true} />
                                </div>

                                {/* Features grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 relative z-10">
                                    {active.features.map((feat, fi) => (
                                        <motion.div
                                            key={`${activeIndex}-${fi}`}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + fi * 0.07, duration: 0.4, ease: EASE }}
                                            className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2 border border-white/5"
                                        >
                                            <span className="material-icons text-primary-glow text-sm">{feat.icon}</span>
                                            <span className="text-[11px] text-slate-300 font-medium">{feat.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Right: thumbnail list */}
                    <div className="lg:flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                        {services.map((service, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    layout
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`relative text-left rounded-2xl p-3 sm:p-4 transition-all duration-300 border ${isActive
                                        ? `bg-gradient-to-br ${service.accentFrom}/10 ${service.accentTo}/5 border-white/20 shadow-lg`
                                        : "glass-panel border-white/5 hover:bg-white/[0.04]"
                                        }`}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${service.accentFrom} ${service.accentTo} rounded-t-2xl`}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive
                                            ? `bg-gradient-to-br ${service.accentFrom} ${service.accentTo}`
                                            : "bg-white/5"
                                            }`}>
                                            <span className={`material-icons text-base ${isActive ? "text-white" : "text-white/40"}`}>{service.icon}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <div className={`text-xs sm:text-sm font-display font-bold truncate ${isActive ? "text-white" : "text-slate-400"}`}>
                                                {service.title}
                                            </div>
                                            <div className="text-[10px] text-slate-600 truncate hidden sm:block">
                                                {service.subtitle}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress bar for active */}
                                    {isActive && (
                                        <div className="mt-2 h-0.5 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                                                className={`h-full bg-gradient-to-r ${service.accentFrom} ${service.accentTo} rounded-full`}
                                            />
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Showcase Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mt-20 flex justify-center pb-8"
                >
                    <Link href="/showcase">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group cursor-pointer"
                        >
                            {/* Glowing Background */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                            {/* Button Content */}
                            <button className="relative px-8 py-4 bg-black rounded-full leading-none flex items-center gap-4 border border-white/10 group-hover:border-white/30 transition-colors">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg text-white">
                                    <span className="material-icons text-sm">auto_awesome</span>
                                </span>
                                <span className="font-display font-bold text-lg text-slate-100 group-hover:text-white transition-colors tracking-wide">
                                    Lihat Showcase Karya Kami
                                </span>
                                <span className="material-icons text-white group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
