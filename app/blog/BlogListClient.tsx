"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogListClientProps {
    posts: BlogPostMeta[];
    tags: string[];
}

export default function BlogListClient({ posts, tags }: BlogListClientProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = posts.filter((post) => {
        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
        const matchesSearch = searchQuery
            ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesTag && matchesSearch;
    });

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <main className="relative min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 relative overflow-hidden">
                {/* Glow effects */}
                <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
                <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] opacity-20" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                            📝 NovaNext Blog
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            Tips & Insight{" "}
                            <span className="text-gradient">Digital</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Pelajari tips terbaru seputar website, digital marketing, SEO, dan
                            teknologi untuk mengembangkan bisnis kamu.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-10 max-w-xl mx-auto"
                    >
                        <div className="relative">
                            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Cari artikel..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tags Filter */}
            <section className="px-4 pb-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-2 justify-center"
                    >
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === null
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
                                }`}
                        >
                            Semua
                        </button>
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() =>
                                    setSelectedTag(selectedTag === tag ? null : tag)
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${selectedTag === tag
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="px-4 pb-24">
                <div className="max-w-6xl mx-auto">
                    {filteredPosts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <span className="material-icons text-6xl text-slate-600 mb-4 block">
                                article
                            </span>
                            <p className="text-slate-500 text-lg">
                                Tidak ada artikel ditemukan.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Link href={`/blog/${post.slug}`} className="group block">
                                        <div className="glass-panel rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                                            {/* Card Header Gradient */}
                                            <div className="h-48 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="material-icons text-6xl text-white/20 group-hover:text-white/40 transition-all group-hover:scale-110 duration-300">
                                                        article
                                                    </span>
                                                </div>
                                                {/* Tag Badge */}
                                                {post.tags[0] && (
                                                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/80 text-white text-xs font-medium backdrop-blur-sm capitalize">
                                                        {post.tags[0]}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <span className="material-icons text-xs">
                                                            calendar_today
                                                        </span>
                                                        {formatDate(post.date)}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="material-icons text-xs">
                                                            schedule
                                                        </span>
                                                        {post.readingTime}
                                                    </span>
                                                </div>

                                                <h2 className="text-lg font-display font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h2>

                                                <p className="text-sm text-slate-400 line-clamp-3 flex-1">
                                                    {post.description}
                                                </p>

                                                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                                                    <span>Baca selengkapnya</span>
                                                    <span className="material-icons text-sm">
                                                        arrow_forward
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 pb-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                                Butuh Website Profesional?
                            </h2>
                            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                Tim NovaNext siap membantu bisnismu go digital dengan website
                                premium dan strategi SEO yang terbukti efektif.
                            </p>
                            <a
                                href="https://wa.me/6281224621353?text=Halo%20NovaNext,%20saya%20tertarik%20konsultasi."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-8 py-3.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                            >
                                Konsultasi Gratis
                                <span className="material-icons text-sm">arrow_forward</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
