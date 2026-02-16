"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const companies = [
    { name: "TechFlow", icon: "api" },
    { name: "StackSys", icon: "layers" },
    { name: "Cloudify", icon: "cloud_circle" },
    { name: "VoltEdge", icon: "bolt" },
];

const stats = [
    { value: 1000, suffix: "+", label: "Proyek", gradient: "from-primary to-purple-400" },
    { value: 99, suffix: "%", label: "Kepuasan", gradient: "from-purple-400 to-pink-400" },
    { value: 24, suffix: "/7", label: "Support", gradient: "from-pink-400 to-orange-400" },
    { value: 5, suffix: "th", label: "Tahun", gradient: "from-orange-400 to-yellow-400" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const duration = 2000;
        const stepTime = Math.max(Math.floor(duration / end), 16);

        const timer = setInterval(() => {
            start += Math.ceil(end / (duration / stepTime));
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(start);
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

export default function TrustedBy() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    return (
        <section
            ref={sectionRef}
            className="py-12 border-y border-white/5 bg-black/40 backdrop-blur-sm relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16"
                >
                    <div className="w-full md:w-1/3 text-center md:text-left">
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                            Trusted by Visionaries
                        </h3>
                        <p className="text-sm text-slate-500">
                            Mendukung pertumbuhan bisnis digital 1000+ perusahaan.
                        </p>
                    </div>
                    <div className="w-full md:w-2/3">
                        <div className="flex flex-wrap justify-center md:justify-end gap-6 sm:gap-8 opacity-60">
                            {companies.map((company, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                    className="flex items-center gap-2 text-base sm:text-lg font-bold text-white hover:text-primary transition-colors cursor-default"
                                >
                                    <span className="material-icons">{company.icon}</span>
                                    {company.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                            className="glass-panel p-6 rounded-2xl text-center hover:bg-white/5 transition-colors group"
                        >
                            <h4 className={`text-2xl sm:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} group-hover:scale-110 transition-transform`}>
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </h4>
                            <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
