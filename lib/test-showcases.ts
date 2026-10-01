// ponytail: single registry array for all test showcases.
// To add a new showcase in the future: simply drop your index.html into public/testshowcase/
// and add one object to the TEST_SHOWCASES array below.

export type ShowcaseCategory =
    | "Kasir & Resto"
    | "E-Commerce"
    | "Healthcare"
    | "Rental & Transportasi"
    | "Property & Kost"
    | "IoT & Logistik"
    | "HR & Enterprise"
    | "AI & Workflow"
    | "Arsitektur & Interior"
    | "Company Profile"
    | "Creative Agency";

export interface TestShowcaseItem {
    id: string;
    title: string;
    category: ShowcaseCategory;
    file: string; // File name inside /public/testshowcase/
    description: string;
    testGuide: string[]; // Specific interactive features visitors can test
    highlights: string[];
    badge?: string;
    version?: string;
}

export const TEST_SHOWCASES: TestShowcaseItem[] = [
    {
        id: "pos-system-1",
        title: "NovaPOS Kasir Resto & Retail",
        category: "Kasir & Resto",
        file: "pos-system-1-index.html",
        badge: "Paling Populer",
        version: "v1.2",
        description: "Sistem Point of Sale kasir modern dengan antarmuka cepat sat-set, pemilihan menu per kategori, manajemen meja, dan simulasi struk belanja.",
        testGuide: [
            "Pilih kategori menu (Makanan, Minuman, Dessert) lalu klik item untuk masuk ke keranjang pesanan.",
            "Ubah kuantitas order, atur nomor meja / opsi Dine-in vs Takeaway, dan terapkan kupon diskon.",
            "Klik tombol Bayar dan pilih metode pembayaran (QRIS, Tunai, atau Kartu Debit).",
            "Lihat preview struk transaksi pembayaran dan simulasi cetak / kirim bukti bayar."
        ],
        highlights: ["Katalog Menu Realtime", "Keranjang Belanja Cepat", "Simulasi QRIS & Tunai", "Generator Struk"]
    },
    {
        id: "pos-system-history",
        title: "NovaPOS Manager & Riwayat Transaksi",
        category: "Kasir & Resto",
        file: "post-system-index.html",
        version: "v2.0",
        description: "Panel kasir & manajer untuk memantau tiket dapur, status proses pesanan masuk, riwayat transaksi harian, dan analitik kasir.",
        testGuide: [
            "Gunakan filter rentang waktu dan status transaksi untuk mencari riwayat order.",
            "Klik kartu order untuk memeriksa detail item pesanan dan rincian pembayaran.",
            "Uji coba fitur status tiket dapur (Pending, Preparing, Ready to Serve).",
            "Simulasikan cetak ulang nota dan pembatalan transaksi dengan konfirmasi kasir."
        ],
        highlights: ["Tiket Antrean Dapur", "Log Transaksi Harian", "Cetak Ulang Nota", "Filter Status Order"]
    },
    {
        id: "kala-fast-checkout",
        title: "KALA. D2C Fast Checkout (<60s)",
        category: "E-Commerce",
        file: "kala-fast-checkout-index.html",
        badge: "Konversi Tinggi",
        version: "v1.0",
        description: "Toko online brand D2C lifestyle dengan fokus kecepatan konversi checkout di bawah 60 detik tanpa login yang rumit.",
        testGuide: [
            "Pilih varian ukuran dan palet warna produk dengan perubahan gambar real-time.",
            "Klik tombol 'Beli Cepat' untuk memunculkan laci one-page checkout instan.",
            "Pilih opsi ekspedisi kurir (Instant, Sameday, Reguler) dan amati kalkulasi ongkir live.",
            "Uji coba simulasi pembayaran instan via QRIS dinamis atau Virtual Account."
        ],
        highlights: ["Checkout Sat-set <60 Detik", "Pilihan Varian Live", "Kalkulator Kurir", "Simulator QRIS"]
    },
    {
        id: "clinic-booking-portal",
        title: "MediConnect Telemedicine & Klinik",
        category: "Healthcare",
        file: "clinic-booking-system-index.html",
        badge: "Enterprise MedTech",
        version: "v1.4",
        description: "Portal reservasi klinik & konsultasi kesehatan dengan pencarian dokter spesialis, jadwal konsultasi interaktif, dan e-ticket kunjungan.",
        testGuide: [
            "Cari dan filter dokter berdasarkan spesialisasi (Umum, Anak, Gigi, Penyakit Dalam) & rating.",
            "Pilih tanggal kunjungan pada kalender dan tentukan slot jam konsultasi yang masih buka.",
            "Isi formulir pasien singkat dan ringkasan keluhan medis.",
            "Selesaikan booking untuk mendapatkan kode QR e-ticket konfirmasi pendaftaran klinik."
        ],
        highlights: ["Filter Spesialis", "Live Slot Jam", "Form Keluhan Medis", "QR E-Ticket Pasien"]
    },
    {
        id: "car-rental-novarent",
        title: "NovaRent Fleet Booking System",
        category: "Rental & Transportasi",
        file: "car-rental-system-1-index.html",
        badge: "Lengkap",
        version: "v2.1",
        description: "Sistem reservasi armada rental mobil lengkap dengan kalender durasi sewa, opsi dengan driver / lepas kunci, dan rincian tarif transparan.",
        testGuide: [
            "Filter armada berdasarkan kategori kendaraan (City Car, SUV, MPV Keluarga, Mobil Mewah).",
            "Tentukan tanggal & jam mulai serta pengembalian pada pemilih rentang tanggal.",
            "Pilih opsi tambahan (Lepas Kunci / Dengan Sopir, Asuransi Perjalanan, Antar ke Bandara).",
            "Periksa rincian kalkulasi total biaya dan simulasikan konfirmasi reservasi unit."
        ],
        highlights: ["Katalog Armada", "Date Range Picker", "Opsi Sopir & Add-on", "Kalkulasi Total Otomatis"]
    },
    {
        id: "car-rental-express",
        title: "NOVA RIDE Express Booking",
        category: "Rental & Transportasi",
        file: "car-rental-system-index.html",
        version: "v1.0",
        description: "Antarmuka booking transportasi & armada modern dengan tampilan minimalis, spesifikasi teknis mobil terperinci, dan konfirmasi kilat.",
        testGuide: [
            "Bandingkan kapasitas kursi, jenis transmisi (Matic/Manual), dan jenis bahan bakar pada tiap mobil.",
            "Pilih armada yang diinginkan dan masukkan rute lokasi penjemputan.",
            "Uji coba form pemesanan ekspres untuk melihat ringkasan pesanan armada."
        ],
        highlights: ["Spesifikasi Unit Jelas", "Filter Transmisi", "Pemesanan Minimalis", "Mobile Responsive"]
    },
    {
        id: "rental-management-kostify",
        title: "Kostify Pro Property Management",
        category: "Property & Kost",
        file: "rental-management-system-index.html",
        badge: "SaaS Properti",
        version: "v1.5",
        description: "Platform SaaS manajemen sewa kosan & kontrakan: denah visual kamar, status hunian, invoice tagihan listrik/air, dan pengingat jatuh tempo.",
        testGuide: [
            "Lihat denah visual kamar kos (kamar terisi hijau, kosong abu-abu, butuh perbaikan kuning).",
            "Klik salah satu kamar untuk melihat profil penyewa, tanggal masuk, dan status pembayaran.",
            "Buat simulasi invoice tagihan sewa bulanan beserta rincian biaya utilitas tambahan.",
            "Coba fitur pencatatan pembayaran lunas dan perhatikan update otomatis status kamar."
        ],
        highlights: ["Denah Kamar Visual", "Okupansi Real-time", "Invoice Tagihan", "Manajemen Penghuni"]
    },
    {
        id: "iot-fleetpulse",
        title: "FleetPulse IoT Fleet & Warehouse",
        category: "IoT & Logistik",
        file: "iot-fleet-tracking-1-index.html",
        badge: "Real-time Telemetry",
        version: "v2.0",
        description: "Dashboard pemantauan armada logistik real-time berbasis IoT dengan peta pelacakan GPS, telemetri kargo suhu dingin, dan deteksi anomali.",
        testGuide: [
            "Pantau posisi truk pada peta GPS interaktif beserta indikator rute tempuh.",
            "Klik armada untuk memantau metrik sensor: kecepatan, odometer, sisa bensin, dan suhu boks.",
            "Filter status kendaraan (Sedang Berjalan, Berhenti/Idle, Bongkar Muat, Masuk Bengkel).",
            "Cek panel notifikasi darurat (Peringatan melebihi batas kecepatan & deviasi rute)."
        ],
        highlights: ["GPS Map Interaktif", "Telemetri Sensor Kargo", "Status Armada", "Alert Peringatan"]
    },
    {
        id: "iot-novatrack",
        title: "NovaTrack IoT & Sensor Gudang",
        category: "IoT & Logistik",
        file: "iot-fleet-tracking-index.html",
        version: "v1.2",
        description: "Sistem pelacakan armada terintegrasi dengan pemantauan suhu, kelembapan, dan utilisasi kapasitas rak gudang penyimpanan.",
        testGuide: [
            "Pindah antar tab monitoring: Unit Kendaraan dan Status Sensor Gudang.",
            "Amati grafik telemetri suhu & kelembapan ruangan gudang penyimpanan dingin.",
            "Tinjau log aktivitas supir pengiriman dan status ketepatan waktu pengantaran barang."
        ],
        highlights: ["Sensor Suhu Gudang", "Pelacakan Unit", "Grafik Metrik", "Log Perjalanan"]
    },
    {
        id: "hr-talentflow",
        title: "TalentFlow Enterprise HR & ATS",
        category: "HR & Enterprise",
        file: "hr-management-1-index.html",
        badge: "Kanban ATS",
        version: "v2.3",
        description: "Sistem pelacak pelamar kerja (ATS) modern dengan papan Kanban drag & drop, evaluasi skor kompetensi, dan manajemen tahapan wawancara.",
        testGuide: [
            "Lakukan drag and drop kartu kandidat dari tahap 'Screening' ke 'Interview' atau 'Final Offer'.",
            "Klik kartu kandidat untuk membaca ringkasan resume, skor kecocokan, dan catatan reviewer.",
            "Filter daftar pelamar berdasarkan divisi lowongan kerja dan tingkat pengalaman.",
            "Uji coba jadwal interview baru untuk mengirimkan pengingat kalender seleksi."
        ],
        highlights: ["Kanban Drag & Drop", "Skor Kompetensi", "Detail Resume Modal", "Manajemen Interview"]
    },
    {
        id: "hr-recruitment-pipeline",
        title: "NovaNext HR & Analitik Talenta",
        category: "HR & Enterprise",
        file: "hr-management-index.html",
        version: "v1.0",
        description: "Dashboard HR perusahaan untuk pemantauan funnel rekrutmen talenta, efisiensi waktu hiring, dan basis data bank talenta siap kerja.",
        testGuide: [
            "Eksplorasi tabel database kandidat dengan pencarian instan berdasarkan skill dan kota.",
            "Tinjau metrik analitik HR seperti Time-to-Hire dan rasio lolos tahapan seleksi.",
            "Perbarui status seleksi kandidat dan periksa perubahan log audit rekrutmen."
        ],
        highlights: ["Database Kandidat", "Metrik Time-to-Hire", "Audit Log", "Filter Keahlian"]
    },
    {
        id: "ai-content-studio",
        title: "NovaNext AI Content Studio",
        category: "AI & Workflow",
        file: "ai-workflow-studio-1-index.html",
        badge: "AI Powered",
        version: "v1.5",
        description: "Studio pembuatan konten berbasis kecerdasan buatan dengan preset prompt bisnis, pengaturan gaya bahasa, dan teks editor interaktif.",
        testGuide: [
            "Pilih jenis konten yang ingin dibuat (Artikel Blog, Caption Instagram, Email Penawaran, Copy Iklan).",
            "Sesuaikan parameter AI: Gaya Bahasa (Formal, Kasual, Persuasif) dan target audiens.",
            "Klik tombol 'Generate Draft' untuk melihat simulasi hasil penulisan AI secara instan.",
            "Lakukan editing langsung di area teks dan uji coba tombol salin / export hasil."
        ],
        highlights: ["Template Prompt AI", "Tone of Voice Control", "Editor Konten Live", "Export Instan"]
    },
    {
        id: "ai-workflow-engine",
        title: "NovaNext AI Workflow Engine",
        category: "AI & Workflow",
        file: "ai-workflow-studio-index.html",
        version: "v2.0",
        description: "Visual builder untuk mendesain alur kerja otomasi AI: memetakan trigger data masuk, instruksi pemrosesan model LLM, hingga aksi output bisnis.",
        testGuide: [
            "Pelajari blok rantai alur kerja (Data Trigger -> AI Classifier -> Notification Dispatcher).",
            "Jalankan simulasi 'Test Run Workflow' untuk mengamati proses data mengalir antar node.",
            "Uji kalkulator estimasi konsumsi token AI dan periksa rincian efisiensi waktu automasi."
        ],
        highlights: ["Visual Flow Nodes", "Simulasi Run Alur", "Estimasi Token", "Automasi Bisnis"]
    },
    {
        id: "arden-architecture",
        title: "ARDEN Atelier Architecture & Interior",
        category: "Arsitektur & Interior",
        file: "arden-architecture-index.html",
        badge: "Luxury Studio",
        version: "v1.0",
        description: "Studio arsitektur & interior mewah untuk residensial, komersial, dan hospitality dengan kurasi portofolio proyek dan kalkulator estimasi biaya.",
        testGuide: [
            "Eksplorasi portofolio proyek arsitektur dengan filter kategori (Residential, Commercial, Hospitality).",
            "Klik kartu proyek untuk melihat konsep denah, filosofi desain, dan spesifikasi material.",
            "Uji coba kalkulator estimasi budget rancang bangun per meter persegi.",
            "Coba formulir inquiry konsultasi arsitek terintegrasi."
        ],
        highlights: ["Filter Kategori Proyek", "Detail Konsep Desain", "Kalkulator Estimasi Biaya", "Konsultasi Studio"]
    },
    {
        id: "bestabites-bakery",
        title: "Bestabites Artisanal Bakery & Pre-Order",
        category: "Kasir & Resto",
        file: "bestabites-bakery-index.html",
        badge: "Pre-Order F&B",
        version: "v1.0",
        description: "Toko roti artisan & sourdough dengan sistem slot pre-order jadwal baking, pemilihan batch pickup/pengiriman, dan keranjang belanja instan.",
        testGuide: [
            "Pilih tanggal batch baking dan tentukan opsi pickup di gerai atau delivery kurir.",
            "Tambah menu sourdough bread, pastry, dan seasonal bundle ke keranjang belanja.",
            "Ubah kuantitas pesanan dan amati slot kuota kapasitas baking live.",
            "Lakukan simulasi checkout pemesanan dengan konfirmasi pesanan."
        ],
        highlights: ["Slot Baking Pre-Order", "Keranjang Belanja Realtime", "Batch Kuota Live", "Opsi Pickup/Delivery"]
    },
    {
        id: "digitalagency-company-profile",
        title: "NovaNext Studio Company Profile",
        category: "Company Profile",
        file: "digitalagency-company-profile-index.html",
        badge: "Studio Profile",
        version: "v2.0",
        description: "Company profile modern IT studio dengan showcase kapabilitas layanan, kalkulator estimasi budget software, dan stack teknologi interaktif.",
        testGuide: [
            "Eksplorasi layanan digital (SaaS, Mobile App, Web Enterprise, E-Commerce).",
            "Uji coba kalkulator estimasi kebutuhan budget dan durasi pengerjaan proyek digital.",
            "Tinjau tab stack teknologi (Next.js, Flutter, React Native, Supabase, Cloud).",
            "Isi form brief proyek interaktif dan amati respon estimasi tim."
        ],
        highlights: ["Kalkulator Budget Proyek", "Showcase Stack Teknologi", "Form Brief Klien", "Desain Futuristik"]
    },
    {
        id: "kinetik-creative",
        title: "KINETIK Experiential Creative Agency",
        category: "Creative Agency",
        file: "kinetik-index.html",
        badge: "Experiential",
        version: "v1.0",
        description: "Creative production & experiential agency portfolio dengan interaksi kinetik, pameran instalasi event, visual sensorik, dan showcase karya audio-visual.",
        testGuide: [
            "Eksplorasi micro-interactions dan efek hover dinamis pada grid karya kreatif.",
            "Filter portofolio berdasarkan instalasi (Experiential, Stage Production, Brand Activation).",
            "Klik kartu showcase untuk melihat foto stage, video preview, dan spesifikasi produksi.",
            "Coba tombol request pitch deck atau kontak kolaborasi event."
        ],
        highlights: ["Animasi Kinetik Halus", "Showcase Stage & Event", "Audio-Visual Focus", "Katalog Brand Activation"]
    },
    {
        id: "meridian-fast-checkout",
        title: "MERIDIAN° Supply Fast-Checkout",
        category: "E-Commerce",
        file: "meridian-fast-checkout-index.html",
        badge: "Checkout <20s",
        version: "v1.0",
        description: "Storefront D2C lifestyle dengan alur belanja ultra cepat: quick-view produk, cart drawer melayang, estimasi ongkir otomatis, dan checkout 19 detik.",
        testGuide: [
            "Klik 'Quick View' pada item katalog untuk memilih varian tanpa berpindah halaman.",
            "Buka cart drawer melayang, ubah kuantitas barang, dan masukkan voucher diskon.",
            "Pilih opsi pengiriman reguler/express dan amati kalkulasi total belanja otomatis.",
            "Simulasikan checkout cepat via QRIS instan atau Virtual Account."
        ],
        highlights: ["Checkout 19 Detik", "Quick View Modal", "Cart Drawer", "Kalkulasi Ongkir & Diskon"]
    },
    {
        id: "nara-architecture",
        title: "NARA Atelier Architecture & Interior",
        category: "Arsitektur & Interior",
        file: "nara-architecture-index.html",
        badge: "Warm Minimalist",
        version: "v1.0",
        description: "Studio arsitektur & interior berkarakter tenang dan hangat: eksplorasi hunian tropis modern, ruang komersial, galeri material, dan janji konsultasi.",
        testGuide: [
            "Filter karya antara kategori Rumah Tinggal, Villa & Resort, dan Ruang Komersial.",
            "Lihat rincian proyek: foto arsitektur resolusi tinggi, konsep pencahayaan alami, dan denah zonasi.",
            "Pelajari tahapan alur kerja arsitek (Konsep -> Desain Teknis -> Pengawasan).",
            "Gunakan formulir penjadwalan konsultasi privat dengan arsitek utama."
        ],
        highlights: ["Filter Kategori Hunian", "Tahapan Alur Desain", "Galeri Arsitektur Minimalis", "Booking Konsultasi Arsitek"]
    },
    {
        id: "next-contractor",
        title: "NextContractor General Contracting",
        category: "Arsitektur & Interior",
        file: "next-contractor-index.html",
        badge: "Estimasi RAB",
        version: "v1.0",
        description: "Platform kontraktor konstruksi & renovasi untuk rumah, kosan, kantor, dan properti komersial lengkap dengan kalkulator RAB estimasi biaya proyek.",
        testGuide: [
            "Gunakan kalkulator estimasi biaya bangun/renovasi berdasarkan luas tanah dan tipe bangunan.",
            "Jelajahi portofolio proyek konstruksi sipil yang telah selesai dikerjakan.",
            "Cek alur transparan tahapan pekerjaan: Survey, RAB, Kontrak, dan Monitoring Mingguan.",
            "Kirimkan permintaan survey lokasi gratis dengan form estimasi proyek."
        ],
        highlights: ["Kalkulator Estimasi RAB", "Portofolio Bangun/Renovasi", "Tahapan Kerja Transparan", "Permintaan Survey Lokasi"]
    }
];

export const CATEGORIES = [
    "Semua",
    "Kasir & Resto",
    "E-Commerce",
    "Healthcare",
    "Rental & Transportasi",
    "Property & Kost",
    "IoT & Logistik",
    "HR & Enterprise",
    "AI & Workflow",
    "Arsitektur & Interior",
    "Company Profile",
    "Creative Agency",
] as const;
