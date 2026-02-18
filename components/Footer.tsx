"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logo/nn_logo.png"
                            alt="NovaNext Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-display font-bold text-xl text-white">
                        NovaNext IT Agency
                    </span>
                </div>
                <p className="text-slate-600 text-sm">
                    © 2026 NovaNext IT Solutions. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
