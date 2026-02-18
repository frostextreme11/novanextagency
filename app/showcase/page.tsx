"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// --- Interfaces ---
interface WebsiteItem {
    src: string;
    title: string;
    category: string;
    type: 'website';
}

interface MobileAppItem {
    brand: string;
    category: string;
    screens: string[];
    type: 'mobile-app';
}

type ProjectItem = WebsiteItem | MobileAppItem;

// --- Data: Websites ---
const websiteItems: WebsiteItem[] = [
    { src: "/partner/apfiber.jpg", title: "PT Asia Pacific Fibers", category: "Textile Industry", type: "website" },
    { src: "/partner/argopantes.jpg", title: "PT Argo Pantes", category: "Corporate Website", type: "website" },
    { src: "/partner/cfc.jpg", title: "CFC Indonesia", category: "Food & Beverage", type: "website" },
    { src: "/partner/charoen.jpg", title: "Charoen Pokphand", category: "Enterprise Portal", type: "website" },
    { src: "/partner/cottonink.jpg", title: "Cotton Ink", category: "E-Commerce", type: "website" },
    { src: "/partner/duniatext.jpg", title: "PT Duniatex", category: "Manufacturing", type: "website" },
    { src: "/partner/elzata.jpg", title: "Elzatta Hijab", category: "Fashion E-Commerce", type: "website" },
    { src: "/partner/greenlight.jpg", title: "Greenlight", category: "Lifestyle Brand", type: "website" },
    { src: "/partner/hisana.jpg", title: "Hisana Fried Chicken", category: "F&B Franchise", type: "website" },
    { src: "/partner/kopi-soe.jpg", title: "Kopi Soe", category: "Coffee Shop Chain", type: "website" },
    { src: "/partner/lawson.jpg", title: "Lawson Station", category: "Retail & F&B", type: "website" },
    { src: "/partner/layar-seafood.jpg", title: "Layar Seafood", category: "Premium Restaurant", type: "website" },
    { src: "/partner/mamikos.jpg", title: "Mamikos", category: "Property Tech", type: "website" },
    { src: "/partner/outside.jpg", title: "The Outside", category: "Lifestyle & Community", type: "website" },
    { src: "/partner/pan-brother.jpg", title: "PT Pan Brothers", category: "Garment Industry", type: "website" },
    { src: "/partner/pesisir-seafood.jpg", title: "Pesisir Seafood", category: "Seafood Dining", type: "website" },
    { src: "/partner/rocketchicken.jpg", title: "Rocket Chicken", category: "Fast Food Chain", type: "website" },
    { src: "/partner/sabana.jpg", title: "Sabana Fried Chicken", category: "Franchise System", type: "website" },
    { src: "/partner/sentosa-seafod.jpg", title: "Sentosa Seafood", category: "Restaurant Chain", type: "website" },
    { src: "/partner/shafira.jpg", title: "Shafira", category: "Muslim Fashion", type: "website" },
    { src: "/partner/siera.jpg", title: "Sierad Produce", category: "Agribusiness", type: "website" },
    { src: "/partner/ssc.jpg", title: "Sony Sugema College", category: "Education Portal", type: "website" },
    { src: "/partner/tamansafari.jpg", title: "Taman Safari Indonesia", category: "Tourism & Recreation", type: "website" },
    { src: "/partner/theexecutive.jpg", title: "The Executive", category: "Fashion Retail", type: "website" },
    { src: "/partner/titiktemu.jpg", title: "Titik Temu Coffee", category: "Specialty Coffee", type: "website" },
    { src: "/partner/tobby.jpg", title: "Toby's Estate", category: "Global Coffee Brand", type: "website" },
    { src: "/partner/trac-astra.jpg", title: "TRAC Astra", category: "Transportation Services", type: "website" },
    { src: "/partner/widodo-makmur.jpg", title: "Widodo Makmur", category: "Corporate Group", type: "website" },
    { src: "/partner/wirosableng.jpg", title: "Wiro Sableng 212", category: "Legendary Seafood", type: "website" },
    { src: "/partner/zoya.jpg", title: "Zoya Fashion", category: "Muslim Fashion", type: "website" },
];

// --- Data: Mobile Apps ---
const mobileAppItems: MobileAppItem[] = [
    {
        brand: "Alodokter",
        category: "Health & Telemedicine",
        type: "mobile-app",
        screens: ["alodokter_health_feed", "alodokter_symptom_checker_chatbot", "alodokter_teleconsultation_doctor_chat"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Bibit",
        category: "Investment & Mutual Funds",
        type: "mobile-app",
        screens: ["bibit_goal_setting_tabungan_nikah", "bibit_portfolio_dashboard", "bibit_robo-advisor_recommendation"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Bluebird",
        category: "Transportation",
        type: "mobile-app",
        screens: ["bluebird_map_pickup_screen", "bluebird_trip_en_route_screen", "bluebird_vehicle_type_selection"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Buttonscarves",
        category: "Fashion & Lifestyle",
        type: "mobile-app",
        screens: ["buttonscarves_editorial_homepage", "buttonscarves_exclusive_membership_black_card", "buttonscarves_product_detail_texture_zoom"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Carsome",
        category: "Automotive Trading",
        type: "mobile-app",
        screens: ["carsome_inspection_schedule_picker", "carsome_offer_dashboard", "carsome_sell_car_form"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Erigo",
        category: "Streetwear Fashion",
        type: "mobile-app",
        screens: ["erigo_home_feed_new_drop", "erigo_product_detail_page", "erigo_shopping_cart_checkout"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Flip",
        category: "Fintech & Payments",
        type: "mobile-app",
        screens: ["flip_amount_input_page", "flip_bank_selection_screen", "flip_transaction_verification_screen"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Gramedia",
        category: "Books & Digital Library",
        type: "mobile-app",
        screens: ["gramedia_e-book_reading_interface", "gramedia_my_library_grid", "gramedia_storefront_home"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Halodoc",
        category: "Healthcare Platform",
        type: "mobile-app",
        screens: ["halodoc_konsultasi_chat_halodoc", "halodoc_pilih_kategori_dokter_halodoc", "halodoc_ringkasan_pesanan_obat_halodoc"].map(s => `/mobile_app/${s}/screen.png`)
    },

    {
        brand: "Jobstreet",
        category: "Job Portal",
        type: "mobile-app",
        screens: ["jobstreet_description_detail_page", "jobstreet_recommended_feed", "jobstreet_user_cv_profile"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Kitabisa",
        category: "Donation & Fundraising",
        type: "mobile-app",
        screens: ["kitabisa_campaign_list_home", "kitabisa_donation_input_screen", "kitabisa_impact_story_update_screen"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Klik Indomaret",
        category: "Retail Grocery",
        type: "mobile-app",
        screens: ["klikindomaret_delivery_selection", "klikindomaret_flash_sale_home", "klikindomaret_fresh_fruit_&_veg_listing"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Kopi Soe",
        category: "F&B Branding",
        type: "mobile-app",
        screens: ["kopi_soe_checkout_summary", "kopi_soe_customization_detail", "kopi_soe_retro_menu_list"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Kopi Kenangan",
        category: "Coffee Chain App",
        type: "mobile-app",
        screens: ["kopikenangan_customization_menu_screen", "kopikenangan_home_dashboard", "kopikenangan_pickup_order_status_screen"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Lemonilo",
        category: "Healthy E-Commerce",
        type: "mobile-app",
        screens: ["lemonilo_cart_and_checkout_status", "lemonilo_healthy_cooking_recipes", "lemonilo_product_listing_healthy_choice"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "M-Tix (XXI)",
        category: "Cinema Assistant",
        type: "mobile-app",
        screens: ["mtix_cinema_seat_selection_layout", "mtix_e-ticket_detail", "mtix_now_showing_movie_grid"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "MyPertamina",
        category: "Energy & Loyalty",
        type: "mobile-app",
        screens: ["mypertamina_home_dashboard", "mypertamina_pay_at_pump_qr", "mypertamina_pertamina_merchandise_rewards"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Pizza Hut",
        category: "Food Customization", // Merged
        type: "mobile-app",
        screens: ["interactive_pizza_builder_screen", "pizza_hut_delivery_tracker", "pizza_hut_side_dish_menu"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Sayurbox",
        category: "Fresh Grocery",
        type: "mobile-app",
        screens: ["sayurbox_delivery_slot_selection", "sayurbox_harvest_schedule", "sayurbox_product_detail_screen"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Sociolla",
        category: "Beauty E-Commerce",
        type: "mobile-app",
        screens: ["sociolla_beauty_feed_home", "sociolla_product_detail_page", "sociolla_user_profile_screen"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Supermarket App",
        category: "Grocery Concept",
        type: "mobile-app",
        screens: ["supermarket_grocery_aisle_category_view", "supermarket_personal_shopper_chat_interface", "supermarket_selection_screen"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Travelio",
        category: "Property Rental",
        type: "mobile-app",
        screens: ["travelio_apartment_search_map_screen", "travelio_check-in_access_and_instructions", "travelio_unit_detail_and_amenities_page"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Traveloka",
        category: "Travel Superapp",
        type: "mobile-app",
        screens: ["traveloka_e-ticket_detail", "traveloka_flight_results", "traveloka_home_search"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Zalora",
        category: "Fashion Retail",
        type: "mobile-app",
        screens: ["zalora_brand_directory_a-z", "zalora_item_detail_screen", "zalora_wishlist_grid_urgency"].map(s => `/mobile_app/${s}/screen.png`)
    },
    {
        brand: "Zenius",
        category: "EdTech Platform",
        type: "mobile-app",
        screens: ["zenius_interactive_video_lesson_screen", "zenius_learning_journey_map_screen", "zenius_quiz_result_and_xp_rewards_screen"].map(s => `/mobile_app/${s}/screen.png`)
    },
];


export default function Showcase() {
    const [activeTab, setActiveTab] = useState<'all' | 'website' | 'mobile'>('all');
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-background-dark text-slate-300 selection:bg-primary selection:text-white pb-20">
            {/* Fixed Background Noise */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

            {/* Navbar Placeholder/Back Button */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/" className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2 text-white hover:bg-white/10 transition-colors">
                        <span className="material-icons text-sm">arrow_back</span>
                        <span className="font-display font-medium text-sm">Back to Home</span>
                    </Link>
                </div>
                <div className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logo/nn_logo.png"
                            alt="NovaNext"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="hidden sm:inline">NovaNext</span>
                </div>
            </nav>

            <section className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12"
                >
                    <span className="text-primary-glow font-bold tracking-widest text-xs uppercase mb-4 block">
                        Our Masterpieces
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white mb-6">
                        Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Showcase</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Koleksi karya digital terbaik website & mobile app yang telah mentransformasi bisnis partner kami.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-12">
                    {[
                        { id: 'all', label: 'All Projects' },
                        { id: 'website', label: 'Websites' },
                        { id: 'mobile', label: 'Mobile Apps' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="space-y-16">

                    {/* Website Grid */}
                    {(activeTab === 'all' || activeTab === 'website') && (
                        <div>
                            {activeTab === 'all' && (
                                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="material-icons text-primary text-xl">web</span> Websites ({websiteItems.length})
                                </h2>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {websiteItems.map((item, index) => (
                                    <motion.div
                                        key={`web-${index}`}
                                        initial={{ opacity: 0, x: -50 }} // Horizontal reveal
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="" // Removed break-inside-avoid
                                        onMouseEnter={() => setHoveredIndex(`web-${index}`)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <div className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-primary/50 transition-all duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10" />
                                            <div className="relative aspect-[4/3] w-full bg-white/5">
                                                <Image
                                                    src={item.src}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                                <p className="text-primary-glow text-xs font-bold uppercase tracking-wider mb-1">{item.category}</p>
                                                <h3 className="text-xl font-display font-bold text-white group-hover:translate-x-1 transition-transform">{item.title}</h3>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mobile App Grid */}
                    {(activeTab === 'all' || activeTab === 'mobile') && (
                        <div>
                            {activeTab === 'all' && (
                                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3 mt-12">
                                    <span className="material-icons text-primary text-xl">smartphone</span> Mobile Apps ({mobileAppItems.length})
                                </h2>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mobileAppItems.map((item, index) => (
                                    <motion.div
                                        key={`app-${index}`}
                                        initial={{ opacity: 0, x: -30 }} // Horizontal reveal, from left
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }} // Trigger earlier
                                        transition={{ duration: 0.4, delay: index * 0.05 }} // Faster
                                        className="rounded-3xl border border-white/5 bg-white/5 overflow-hidden hover:border-white/20 transition-all group"
                                    >
                                        <div className="p-6 pb-2 border-b border-white/5 flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-white">{item.brand}</h3>
                                                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">{item.category}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <span className="material-icons text-xs text-white/50">apps</span>
                                            </div>
                                        </div>

                                        {/* Horizontal Scroll Container */}
                                        <div className="flex gap-4 p-6 overflow-x-auto pb-6 scrollbar-hide snap-x justify-center"> {/* Centered content if fits */}
                                            {item.screens.map((screen, i) => (
                                                <div key={i} className="flex-none w-[140px] aspect-[9/18] relative rounded-xl overflow-hidden border border-white/10 shadow-lg snap-center transform hover:scale-105 transition-transform duration-300">
                                                    <Image
                                                        src={screen}
                                                        alt={`${item.brand} distinct screen ${i + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="140px"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div className="mt-20 text-center">
                    <p className="text-slate-500 mb-6">Tertarik membuat project seperti ini?</p>
                    <Link href="/#pricing" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                        Mulai Project Sekarang
                        <span className="material-icons">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}
