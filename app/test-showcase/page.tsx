"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
    TEST_SHOWCASES,
    CATEGORIES,
    TestShowcaseItem
} from "@/lib/test-showcases";
import {
    Search,
    Play,
    ExternalLink,
    RotateCw,
    Monitor,
    Tablet,
    Smartphone,
    X,
    CheckCircle2,
    Sparkles,
    SlidersHorizontal,
    ArrowLeft,
    CheckSquare,
    Square
} from "lucide-react";

// ponytail: single client page for test showcase runner & directory.
// Lazy, minimal, zero extraneous dependencies.

function TestShowcaseContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeModalItem, setActiveModalItem] = useState<TestShowcaseItem | null>(null);
    const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [iframeKey, setIframeKey] = useState<number>(0);
    const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
    const [showGuideSidebar, setShowGuideSidebar] = useState<boolean>(true);

    // Sync modal with URL search param "?id=xxx"
    useEffect(() => {
        const idFromUrl = searchParams.get("id");
        if (idFromUrl) {
            const found = TEST_SHOWCASES.find((item) => item.id === idFromUrl);
            if (found) {
                setActiveModalItem(found);
            }
        }
    }, [searchParams]);

    // Handle opening modal
    const openShowcase = (item: TestShowcaseItem) => {
        setActiveModalItem(item);
        setDeviceView("desktop");
        setIframeKey((prev) => prev + 1);
        setCheckedTasks({});
        setShowGuideSidebar(true);
        const url = new URL(window.location.href);
        url.searchParams.set("id", item.id);
        window.history.pushState({}, "", url.toString());
    };

    // Handle closing modal
    const closeModal = () => {
        setActiveModalItem(null);
        const url = new URL(window.location.href);
        url.searchParams.delete("id");
        window.history.pushState({}, "", url.toString());
    };

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && activeModalItem) {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeModalItem]);

    // Filter showcases
    const filteredShowcases = useMemo(() => {
        return TEST_SHOWCASES.filter((item) => {
            const matchesCategory =
                selectedCategory === "Semua" || item.category === selectedCategory;
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !query ||
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.highlights.some((h) => h.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const toggleTask = (taskIndex: number) => {
        setCheckedTasks((prev) => ({
            ...prev,
            [taskIndex]: !prev[taskIndex]
        }));
    };

    return (
        <main className="min-h-screen bg-background-dark text-slate-300 selection:bg-primary selection:text-white pb-24">
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 w-full z-40 p-4 sm:p-6 flex justify-between items-center bg-background-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-3">
                    <Link
                        href="/showcase"
                        className="glass-panel px-3.5 py-2 rounded-xl flex items-center gap-2 text-white hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Kembali ke Showcase</span>
                        <span className="sm:hidden">Showcase</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-xs text-slate-400 hover:text-white transition-colors hidden md:inline"
                    >
                        Home
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                        <Image
                            src="/logo/nn_logo.png"
                            alt="NovaNext"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white">
                        NovaNext <span className="text-primary text-xs sm:text-sm font-mono border border-primary/30 px-2 py-0.5 rounded-full ml-1 bg-primary/10">Lab & Demos</span>
                    </span>
                </div>

                <a
                    href="https://wa.me/6281224621353?text=Halo%20NovaNext,%20saya%20sudah%20mencoba%20test%20showcase%20dan%20tertarik%20konsultasi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary/90 hover:bg-primary text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] flex items-center gap-1.5"
                >
                    <span>Konsultasi</span>
                    <span className="hidden sm:inline">Project</span>
                </a>
            </nav>

            {/* Hero Header */}
            <header className="pt-28 sm:pt-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary-glow text-xs font-semibold uppercase tracking-wider mb-5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span>Interactive Prototype Sandbox</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight mb-5">
                        Test & Uji Coba{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                            Live Showcase
                        </span>
                    </h1>

                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8">
                        Bukan sekadar mockup gambar statis. Ini adalah prototipe aplikasi dan sistem nyata yang siap Anda klik, uji alur pesanannya, dan eksplorasi fiturnya secara langsung.
                    </p>
                </motion.div>

                {/* Search Bar & Filters */}
                <div className="max-w-3xl mx-auto mb-8 space-y-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari showcase (contoh: kasir, checkout, rental, klinik, iot, hr, ai)..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all shadow-inner"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-2 py-1 rounded-md"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                                    selectedCategory === cat
                                        ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                    Menampilkan {filteredShowcases.length} dari {TEST_SHOWCASES.length} interactive showcase
                </div>
            </header>

            {/* Showcase Grid */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 relative z-10">
                {filteredShowcases.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 max-w-md mx-auto">
                        <SlidersHorizontal className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-white mb-1">Showcase Tidak Ditemukan</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Coba ubah kata kunci pencarian atau pilih kategori lain.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory("Semua");
                                setSearchQuery("");
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-xl transition-colors"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredShowcases.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: idx * 0.04 }}
                                className="group rounded-3xl bg-white/[0.04] border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
                            >
                                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                                    {/* Header Meta */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-primary-glow bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                                            {item.category}
                                        </span>
                                        {item.badge && (
                                            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title & Desc */}
                                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-glow transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* What they can test checklist */}
                                    <div className="mt-auto bg-black/30 rounded-2xl p-4 border border-white/5 mb-5">
                                        <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                            <span>Fitur yang Bisa Anda Test:</span>
                                        </div>
                                        <ul className="space-y-1.5 text-xs text-slate-400">
                                            {item.testGuide.slice(0, 3).map((guide, gIdx) => (
                                                <li key={gIdx} className="flex items-start gap-2">
                                                    <span className="text-primary font-bold text-[10px] mt-0.5">●</span>
                                                    <span className="line-clamp-2">{guide}</span>
                                                </li>
                                            ))}
                                            {item.testGuide.length > 3 && (
                                                <li className="text-[11px] text-primary-glow font-medium pl-3">
                                                    +{item.testGuide.length - 3} fitur lainnya di panduan demo
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Highlights Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {item.highlights.map((h, hIdx) => (
                                            <span
                                                key={hIdx}
                                                className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-md border border-white/5"
                                            >
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="p-4 sm:p-5 pt-0 border-t border-white/5 bg-black/20 flex items-center gap-2">
                                    <button
                                        onClick={() => openShowcase(item)}
                                        className="flex-1 bg-white hover:bg-slate-200 text-black font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-black" />
                                        <span>Uji Coba Demo</span>
                                    </button>
                                    <a
                                        href={`/testshowcase/${item.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Buka Langsung di Tab Baru"
                                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Bottom Project CTA */}
            <section className="mt-24 text-center px-4 max-w-3xl mx-auto">
                <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-transparent pointer-events-none" />
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 relative z-10">
                        Ingin Membangun Solusi Seperti Ini?
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 relative z-10">
                        Kami merancang dan mengembangkan sistem kustom dengan arsitektur modern, performa tinggi, dan pengalaman pengguna sat-set untuk bisnis Anda.
                    </p>
                    <a
                        href="https://wa.me/6281224621353?text=Halo%20NovaNext,%20saya%20tertarik%20membangun%20aplikasi%20seperti%20pada%20test%20showcase."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg relative z-10"
                    >
                        <span>Konsultasi Kebutuhan Anda Sekarang</span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                    </a>
                </div>
            </section>

            {/* Fullscreen Interactive Runner Modal */}
            <AnimatePresence>
                {activeModalItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col"
                    >
                        {/* Modal Header Bar */}
                        <div className="h-16 border-b border-white/10 bg-background-dark/90 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
                            {/* Left: Info */}
                            <div className="flex items-center gap-3 overflow-hidden">
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                    title="Tutup Runner"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-display font-bold text-white text-sm sm:text-base truncate">
                                            {activeModalItem.title}
                                        </h3>
                                        <span className="text-[10px] uppercase font-bold text-primary-glow bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 hidden sm:inline">
                                            {activeModalItem.category}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 hidden md:block truncate">
                                        {activeModalItem.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center: Device Switcher */}
                            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
                                <button
                                    onClick={() => setDeviceView("desktop")}
                                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
                                        deviceView === "desktop"
                                            ? "bg-white/20 text-white font-semibold"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                    title="Desktop View (100%)"
                                >
                                    <Monitor className="w-3.5 h-3.5" />
                                    <span className="hidden lg:inline">Desktop</span>
                                </button>
                                <button
                                    onClick={() => setDeviceView("tablet")}
                                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
                                        deviceView === "tablet"
                                            ? "bg-white/20 text-white font-semibold"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                    title="Tablet View (768px)"
                                >
                                    <Tablet className="w-3.5 h-3.5" />
                                    <span className="hidden lg:inline">Tablet</span>
                                </button>
                                <button
                                    onClick={() => setDeviceView("mobile")}
                                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
                                        deviceView === "mobile"
                                            ? "bg-white/20 text-white font-semibold"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                    title="Mobile View (390px)"
                                >
                                    <Smartphone className="w-3.5 h-3.5" />
                                    <span className="hidden lg:inline">Mobile</span>
                                </button>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowGuideSidebar(!showGuideSidebar)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                                        showGuideSidebar
                                            ? "bg-primary/20 border-primary text-primary-glow"
                                            : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
                                    }`}
                                    title="Panduan Apa yang Bisa Dites"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Panduan Test</span>
                                </button>

                                <button
                                    onClick={() => setIframeKey((prev) => prev + 1)}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                    title="Reset / Reload Demo"
                                >
                                    <RotateCw className="w-4 h-4" />
                                </button>

                                <a
                                    href={`/testshowcase/${activeModalItem.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                    title="Buka Layar Penuh di Tab Baru"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>

                                <button
                                    onClick={closeModal}
                                    className="sm:hidden p-2 rounded-xl bg-white/10 text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body: Runner + Test Checklist */}
                        <div className="flex-1 flex overflow-hidden relative bg-[#06080e]">
                            {/* Interactive iFrame Container */}
                            <div className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-auto">
                                <div
                                    className={`h-full transition-all duration-300 flex flex-col bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${
                                        deviceView === "mobile"
                                            ? "w-[390px] max-w-full my-auto"
                                            : deviceView === "tablet"
                                            ? "w-[768px] max-w-full my-auto"
                                            : "w-full"
                                    }`}
                                >
                                    <iframe
                                        key={iframeKey}
                                        src={`/testshowcase/${activeModalItem.file}`}
                                        title={activeModalItem.title}
                                        className="w-full h-full border-0 bg-[#070b14]"
                                        allow="camera; microphone; geolocation; clipboard-write; clipboard-read"
                                    />
                                </div>
                            </div>

                            {/* Floating/Collapsible Test Checklist Drawer */}
                            <AnimatePresence>
                                {showGuideSidebar && (
                                    <motion.aside
                                        initial={{ x: 300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 300, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="w-80 sm:w-88 border-l border-white/10 bg-background-dark/95 backdrop-blur-md p-5 flex flex-col justify-between overflow-y-auto shrink-0 z-20"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                    <h4 className="font-display font-bold text-white text-sm">
                                                        Apa yang Bisa Anda Test?
                                                    </h4>
                                                </div>
                                                <button
                                                    onClick={() => setShowGuideSidebar(false)}
                                                    className="text-slate-400 hover:text-white p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                                Ikuti checklist langkah interaktif di bawah ini untuk mencoba kemampuan prototipe secara penuh:
                                            </p>

                                            <div className="space-y-3">
                                                {activeModalItem.testGuide.map((step, sIdx) => {
                                                    const isChecked = !!checkedTasks[sIdx];
                                                    return (
                                                        <div
                                                            key={sIdx}
                                                            onClick={() => toggleTask(sIdx)}
                                                            className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                                                                isChecked
                                                                    ? "bg-emerald-500/10 border-emerald-500/30 text-slate-300"
                                                                    : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]"
                                                            }`}
                                                        >
                                                            <div className="mt-0.5 text-emerald-400 shrink-0">
                                                                {isChecked ? (
                                                                    <CheckSquare className="w-4 h-4" />
                                                                ) : (
                                                                    <Square className="w-4 h-4 text-slate-500" />
                                                                )}
                                                            </div>
                                                            <span className={isChecked ? "line-through text-slate-400" : ""}>
                                                                {step}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-6 p-3.5 rounded-xl bg-primary/10 border border-primary/20">
                                                <div className="text-[11px] font-bold text-primary-glow mb-1">
                                                    💡 Tips Pengujian:
                                                </div>
                                                <p className="text-[11px] text-slate-300 leading-relaxed">
                                                    Coba ganti ke mode <strong>Mobile</strong> atau <strong>Tablet</strong> di bar atas untuk menguji responsivitas antarmuka di layar sentuh.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-white/10">
                                            <a
                                                href={`https://wa.me/6281224621353?text=Halo%20NovaNext,%20saya%20sudah%20mencoba%20demo%20${encodeURIComponent(
                                                    activeModalItem.title
                                                )}%20dan%20ingin%20tahu%20biaya%20serta%20waktu%20pembuatannya.`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                                            >
                                                <span>Diskusi Demo Ini di WhatsApp</span>
                                            </a>
                                        </div>
                                    </motion.aside>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default function TestShowcasePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050511] flex items-center justify-center text-slate-400 text-sm">Memuat Test Showcase...</div>}>
            <TestShowcaseContent />
        </Suspense>
    );
}
