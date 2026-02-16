import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import UpgradeReality from "@/components/UpgradeReality";
import EndToEndServices from "@/components/EndToEndServices";
import Partners from "@/components/Partners";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Services />
      <UpgradeReality />
      <EndToEndServices />
      <Partners />
      <Pricing />
      <Footer />
    </main>
  );
}
