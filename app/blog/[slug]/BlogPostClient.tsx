"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { BlogPost } from "@/lib/blog";

interface BlogPostClientProps {
    post: BlogPost;
    children: React.ReactNode;
}

export default function BlogPostClient({ post, children }: BlogPostClientProps) {
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

            {/* Hero */}
            <section className="pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
                <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] opacity-20" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                            <Link
                                href="/"
                                className="hover:text-white transition-colors"
                            >
                                Home
                            </Link>
                            <span className="material-icons text-xs">chevron_right</span>
                            <Link
                                href="/blog"
                                className="hover:text-white transition-colors"
                            >
                                Blog
                            </Link>
                            <span className="material-icons text-xs">chevron_right</span>
                            <span className="text-slate-400 truncate max-w-[200px]">
                                {post.title}
                            </span>
                        </nav>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium capitalize"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-8 border-b border-white/10">
                            <span className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-icons text-primary text-sm">
                                        person
                                    </span>
                                </span>
                                {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-icons text-xs">calendar_today</span>
                                {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-icons text-xs">schedule</span>
                                {post.readingTime}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="px-4 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <article className="prose-custom">
                        {children}
                    </article>
                </motion.div>
            </section>

            {/* Share & Back */}
            <section className="px-4 pb-16">
                <div className="max-w-3xl mx-auto">
                    <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-slate-400 text-sm">Bagikan artikel ini:</span>
                            <div className="flex gap-2">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://novanext.id/blog/${post.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-all"
                                    aria-label="Share on Twitter"
                                >
                                    <span className="text-slate-400 hover:text-primary text-sm font-bold">𝕏</span>
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://novanext.id/blog/${post.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-all"
                                    aria-label="Share on Facebook"
                                >
                                    <span className="text-slate-400 hover:text-primary text-sm font-bold">f</span>
                                </a>
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(post.title + " - https://novanext.id/blog/" + post.slug)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-all"
                                    aria-label="Share on WhatsApp"
                                >
                                    <span className="material-icons text-slate-400 hover:text-primary text-sm">chat</span>
                                </a>
                            </div>
                        </div>

                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-primary hover:text-primary-glow text-sm font-medium transition-all"
                        >
                            <span className="material-icons text-sm">arrow_back</span>
                            Kembali ke Blog
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-24">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                                Tertarik Membangun Website Profesional?
                            </h2>
                            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                NovaNext bisa bantu kamu mulai dari desain, development, hingga
                                optimasi SEO. Konsultasi gratis, tanpa komitmen!
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
