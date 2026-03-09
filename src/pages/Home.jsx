// import HeroSection from "../components/HeroSection";
// import NewlyLaunched from "../components/NewlyLaunched";
// import RentAHome from "../components/RentAHome";
// import PromotionSection from "../components/promotionSection";
// import PostPropertySection from "../components/PostPropertySection";
// import TopCities from "../components/TopCities";
// import BenefitsSection from "../components/BenefitsSection";
// import Footer from "../components/Footer";
// import PropertyList from "../components/PropertyList"; // ✅ Imported correctly

// const Home = () => {
//   return (
//     <>
//       <HeroSection />
//       <PromotionSection />
//       <RentAHome />
//       <NewlyLaunched />

//       {/* ✅ Property data from MySQL will show here */}
//       <PropertyList />

//       <PostPropertySection />
//       <TopCities />
//       <BenefitsSection />
//       <Footer />
//     </>
//   );
// };

// export default Home;

import HeroSection from "../components/HeroSection";
import NewlyLaunched from "../components/NewlyLaunched";
import RentAHome from "../components/RentAHome";
import PromotionSection from "../components/PromotionSection";
import PostPropertySection from "../components/PostPropertySection";
import TopCities from "../components/TopCities";
import BenefitsSection from "../components/BenefitsSection";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <>
      <HeroSection />
      <PromotionSection />
      <RentAHome />
      <NewlyLaunched />

      {/* ✅ Property data from MySQL will show here */}
     

      <PostPropertySection />
      <TopCities />
      <BenefitsSection />
      <Footer />
    </>
  );
};

export default Home;