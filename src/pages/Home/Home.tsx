import AutoCardCarousel from "../../components/AutoCardCarousel/AutoCardCarousel";
import Banner from "../../components/Banner/Banner";
import Parallax from "../../components/Parallax/Parallax";
import RandomProducts from "../../components/RandomProducts/RandomProducts";
import WhyGadgetSailor from "../../components/WhyGadgetSailor/WhyGadgetSailor";

export default function Home() {
  return (
    <div>
      {/* Fahim has started Fahimming */}
      <Banner></Banner>
      <AutoCardCarousel />
      <RandomProducts />
      <Parallax />
      <WhyGadgetSailor />
    </div>
  )
}
