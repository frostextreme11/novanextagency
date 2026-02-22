"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15 + 0.2, // Staggered delay
                duration: 1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Super smooth custom ease
            },
        }),
    };

    return (
        <section className="relative min-h-[100svh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#030308] selection:bg-purple-500/30">
            {/* Elegant Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Interactive Spotlight using mouse position */}
            {typeof window !== 'undefined' && window.innerWidth > 768 && (
                <motion.div
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                    animate={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.06), transparent 40%)`,
                    }}
                />
            )}

            {/* Ambient Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow will-change-transform" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-glow-pulse will-change-transform delay-1000" />
            </div>

            {/* Floating Premium Tech UI Elements (Desktop Only for Performance) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 perspective-[2000px]">
                {/* Floating Lighthouse Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -50, rotateY: -15, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, x: 0, rotateY: -15, rotateX: 10 }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                    className="absolute top-[30%] xl:top-[25%] left-[5%] xl:left-[10%] w-64 rounded-2xl p-5 border border-white/5 bg-white/[0.01] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-float will-change-transform"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                            <span className="material-icons text-white text-base">done</span>
                        </div>
                        <div>
                            <div className="text-white/80 text-sm font-semibold tracking-wide">Lighthouse</div>
                            <div className="text-emerald-400 text-lg font-mono font-bold">100/100</div>
                        </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    </div>
                </motion.div>

                {/* Floating Code UI */}
                <motion.div
                    initial={{ opacity: 0, y: -50, x: 50, rotateY: 15, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, x: 0, rotateY: 15, rotateX: -10 }}
                    transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                    className="absolute top-[40%] xl:top-[35%] right-[5%] xl:right-[10%] w-72 rounded-2xl p-5 border border-white/5 bg-white/[0.01] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-float will-change-transform"
                    style={{ animationDelay: '1s' }}
                >
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        </div>
                        <div className="text-xs text-white/40 font-mono tracking-wider">app.tsx</div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 w-3/4 bg-indigo-500/50 rounded-full" />
                        <div className="h-2 w-1/2 bg-purple-500/50 rounded-full" />
                        <div className="h-2 w-full bg-white/10 rounded-full" />
                        <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                    </div>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center">
                <div className="text-center max-w-5xl mx-auto w-full flex flex-col items-center mt-[-5vh] sm:mt-0">

                    {/* Elite Badge */}
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-3 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 tracking-[0.15em] sm:tracking-[0.2em] relative z-10 uppercase">
                            IT Agency Terbaik di Indonesia
                        </span>
                    </motion.div>

                    {/* Masterpiece Heading */}
                    <motion.h1
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-white leading-[1.05] tracking-tighter mb-8 w-full relative z-10 flex flex-col items-center"
                    >
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/60 drop-shadow-sm pb-2">
                            Transformasi
                        </span>
                        <div className="relative inline-block mt-[-0.5rem] sm:mt-[-1rem]">
                            <span className="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-[60px] rounded-full sm:blur-[80px]" />
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 pb-4">
                                Kelas Dunia.
                            </span>
                        </div>
                    </motion.h1>

                    {/* Elite Subtitle */}
                    <motion.p
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-base sm:text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4"
                    >
                        Kami adalah <strong className="text-white font-medium">NovaNext</strong>. Bukan sekadar pembuat website, kami merancang <span className="text-indigo-300 font-medium">pengalaman digital premium</span> yang tak tertandingi. Performa super cepat, desain mewah yang memukau, dan teknologi paling mutakhir untuk menjadikan bisnis Anda yang terbaik.
                    </motion.p>

                    {/* Ultra Premium CTAs */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full items-center relative z-20"
                    >
                        <Link
                            href="#pricing"
                            className="group relative w-full sm:w-auto flex justify-center"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {/* Animated glowing background */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-500" />

                            <div className="relative w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-[#0a0a16] rounded-2xl leading-none flex items-center justify-center gap-3 border border-white/10 group-hover:border-white/30 transition-all duration-300 overflow-hidden">
                                {/* Shimmer sweep effect */}
                                <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] ${isHovering ? 'animate-[shimmer_1s_ease-out_forwards]' : ''}`} />

                                <span className="font-display font-bold text-white text-base sm:text-xl tracking-wide relative z-10 shadow-black drop-shadow-md">
                                    Mulai Transformasi
                                </span>
                                <span className="material-icons text-white transform group-hover:translate-x-2 transition-transform duration-300 relative z-10 drop-shadow-md">
                                    arrow_forward
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/showcase"
                            className="group relative w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 rounded-2xl text-white font-display font-semibold transition-all duration-300 flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 backdrop-blur-md"
                        >
                            <span className="text-base sm:text-xl tracking-wide text-slate-200 group-hover:text-white transition-colors">Lihat Portofolio</span>
                            <span className="material-icons text-slate-400 group-hover:text-white transition-colors">
                                view_carousel
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none hidden sm:flex"
            >
                <span className="text-xs text-slate-500 tracking-[0.2em] font-display uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent relative overflow-hidden">
                    <motion.div
                        initial={{ top: "-100%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-1/2 bg-white"
                    />
                </div>
            </motion.div>
        </section>
    );
}
