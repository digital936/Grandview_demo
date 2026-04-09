import HeroSection from "../components/HeroSection";
import NewlyLaunched from "../components/NewlyLaunched";
import RentAHome from "../components/RentAHome";
// import PromotionSection from "../components/promotionSection";
import PostPropertySection from "../pages/PostPropertySection";
import TopCities from "../components/TopCities";
import BenefitsSection from "../components/BenefitsSection";
import Footer from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "../styles/animations.css";


const Home = () => {
  useScrollAnimation();
  return (
    <>
      <HeroSection />
      {/* <PromotionSection /> */}
      <RentAHome />
      {/* <NewlyLaunched /> */}

      
      
      
      <PostPropertySection />
      <TopCities />
      <BenefitsSection />
      <Footer />
    </>
  );
};

export default Home;

