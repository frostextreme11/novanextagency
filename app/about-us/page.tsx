import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Tentang Kami - NovaNext IT Agency',
    description: 'Kenalan dengan tim NovaNext yang siap mewujudkan website dan aplikasi impian Anda dengan passion dan profesionalitas.',
};

export default function AboutUs() {
    return (
        <main className="relative min-h-screen">
            <Navbar />

            <div className="pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto space-y-16">

                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white">
                            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Kami</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                            Bukan sekadar coding, kami berkarya dengan hati.
                        </p>
                    </div>

                    {/* Main Content Card */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-12 overflow-hidden relative">
                        {/* Ambient Background Glow inside card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-[80px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-[80px]"></div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

                            {/* Image Column */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/our_team/OurTeam.jpeg"
                                        alt="Tim NovaNext"
                                        fill
                                        className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>
                            </div>

                            {/* Text Column */}
                            <div className="space-y-6 md:pl-4">
                                <h2 className="text-3xl font-display font-bold text-white leading-tight">
                                    Partner Digital <br />
                                    <span className="text-primary">Andalan Anda</span>
                                </h2>

                                <div className="space-y-4 text-slate-300 text-lg leading-relaxed font-body">
                                    <p>
                                        Halo! Kami adalah tim yang siap bantuin Anda mewujudkan website atau aplikasi mobile impian. Kami ngerjainnya nggak setengah-setengah, tapi dengan sepenuh hati.
                                    </p>
                                    <p>
                                        Di NovaNext, kami nggak cuma sekadar "menyelesaikan tugas". Kami bekerja dengan <span className="text-white font-semibold">passion</span>. Kepercayaan Anda itu amanah buat kami, jadi kami pastikan hasilnya tetap profesional tapi prosesnya asik dan santai.
                                    </p>
                                    <p>
                                        Kami percaya, teknologi yang keren itu lahir dari kolaborasi yang tulus. Yuk, kita bikin sesuatu yang luar biasa bareng-bareng!
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <a
                                        href="https://wa.me/6281224621353"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/25 transform hover:-translate-y-1"
                                    >
                                        Hubungi Kami
                                        <span className="material-icons text-sm">arrow_forward</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
