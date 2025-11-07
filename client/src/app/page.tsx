import HeroSection from "@/ui/hero-section";
import AboutSection from "@/ui/about-section";
import ContactSection from "@/ui/contact-section";
import FeaturedProductsSection from "@/ui/featured-products-section";
import BannerSection from "@/ui/banner-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProductsSection />
      <BannerSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
