import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Live Interactive Test Showcase - NovaNext IT Agency",
    description:
        "Uji coba langsung 20+ live prototype dan sistem aplikasi buatan NovaNext: sistem kasir POS, checkout cepat D2C, telemedicine klinik, pelacakan armada IoT, platform HR, dan studio arsitektur.",
    keywords: [
        "Test showcase",
        "demo website interaktif",
        "demo aplikasi kasir pos",
        "demo checkout e-commerce",
        "demo telemedicine klinik",
        "demo iot tracking",
        "prototipe aplikasi",
        "novanext agency"
    ],
    openGraph: {
        title: "Live Interactive Test Showcase - NovaNext Agency",
        description:
            "Uji coba langsung 20+ demo sistem interaktif dan prototipe aplikasi nyata buatan NovaNext langsung di browser Anda.",
        url: "https://novanext.id/test-showcase",
        siteName: "NovaNext IT Agency",
        locale: "id_ID",
        type: "website"
    }
};

export default function TestShowcaseLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return children;
}
