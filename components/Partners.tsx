"use client";

const partners = [
    { name: "FashionBrand ID", icon: "checkroom" },
    { name: "KopiSenja", icon: "coffee" },
    { name: "MegaCorp Indo", icon: "business" },
    { name: "RestoNusantara", icon: "restaurant" },
    { name: "LogistikCepat", icon: "local_shipping" },
    { name: "EduTech Jaya", icon: "school" },
];

export default function Partners() {
    return (
        <section id="portfolio" className="py-16 border-y border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="mb-8 text-center">
                <p className="text-sm text-slate-500 uppercase tracking-widest">
                    Dipercaya oleh berbagai industri di Indonesia
                </p>
            </div>
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-scroll whitespace-nowrap flex gap-16 items-center px-16">
                    {[...partners, ...partners].map((partner, index) => (
                        <span
                            key={index}
                            className="text-2xl font-bold text-white/40 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <span className="material-icons">{partner.icon}</span> {partner.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
