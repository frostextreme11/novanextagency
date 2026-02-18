"use client";

const row1 = [
    "☕ Fore Coffee",
    "🦀 Layar Seafood",
    "🧕 Elzatta",
    "👕 Greenlight",
    "🍔 CFC",
    "🏭 PT Pan Brothers",
    "🍰 Toby's Estate",
    "🐄 Charoen Pokphand",
    "🏫 Al-Azhar",
    "📚 Inten",
];

const row2 = [
    "☕ Kopi Soe",
    "🦀 Sentosa Seafood",
    "🧕 Zoya",
    "👕 Cotton Ink",
    "🍔 Sabana Fried Chicken",
    "🏭 PT Duniatex",
    "🍰 Common Grounds",
    "🐄 PT Widodo Makmur",
    "🏫 BPK Penabur",
    "📚 Nurul Fikri",
];

const row3 = [
    "☕ Point Coffee",
    "🦀 Seafood 212 Wiro Sableng",
    "🧕 Dian Pelangi",
    "👕 The Executive",
    "🍔 Hisana Fried Chicken",
    "🏭 PT Argo Pantes",
    "🍰 Titik Temu",
    "🐄 Sierad Produce",
    "🏫 Global Jaya School",
    "📚 Sony Sugema College",
];

const row4 = [
    "☕ Tomoro Coffee",
    "🦀 Pesisir Seafood",
    "🧕 Shafira",
    "👕 Eiger",
    "🍔 Rocket Chicken",
    "🏭 PT Asia Pacific Fibers",
    "🍰 One Fifteenth Coffee",
    "🐄 Greenfield Indonesia",
    "🏫 HighScope Indonesia",
    "📚 Ruangguru",
];

const row5 = [
    "☕ Kopi Tuku",
    "🦀 Saung Grenvil",
    "🧕 Vanilla Hijab",
    "👕 Consina",
    "🍔 Burger Bangor",
    "🏭 PT Mayer Indah",
    "🍰 St. Ali",
    "🐄 PT Malindo Feedmill",
    "🏫 Labschool",
    "📚 Zenius",
];

function ScrollRow({ items, reverse = false, speed = "15s" }: { items: string[]; reverse?: boolean; speed?: string }) {
    const doubled = [...items, ...items];
    return (
        <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
            <div
                className={`whitespace-nowrap flex gap-8 items-center px-4 ${reverse ? "animate-scroll-reverse" : "animate-scroll"}`}
                style={{ animationDuration: speed }}
            >
                {doubled.map((name, i) => (
                    <span
                        key={i}
                        className="text-sm sm:text-base font-semibold text-white/30 hover:text-white/70 transition-colors cursor-default select-none"
                    >
                        {name}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function Partners() {
    return (
        <section id="portfolio" className="py-12 sm:py-16 border-y border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
            <div className="mb-6 text-center">
                <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest">
                    Dipercaya oleh berbagai industri di Indonesia
                </p>
            </div>
            <div className="space-y-3">
                <ScrollRow items={row1} speed="18s" />
                <ScrollRow items={row2} speed="22s" reverse />
                <ScrollRow items={row3} speed="16s" />
                <ScrollRow items={row4} speed="20s" reverse />
                <ScrollRow items={row5} speed="17s" />
            </div>
        </section>
    );
}
