import RecommendedForYou from "./home/recommended";
import SiteProgress from "./home/siteprogress";
import ContactUs from "./home/contactus";
import HeroSection from "./home/herosection";
import HomeNews from "./home/news";
import TestimonialSection from "./home/testimonialsection";
import Testimonials from "./home/testimonials";
import FrequentlyAskQuestions from "./home/faq";
import CTA from "./home/cta";

export default function Home() {
  return (
    <section className="overflow-x-hidden">
      <HeroSection />
      <div className="px-4 lg:px-24">
        <RecommendedForYou />
        {/* <SiteProgress /> */}
        <HomeNews />
        <FrequentlyAskQuestions />
        <Testimonials />
      </div>
      <CTA />
    </section>
  );
}
