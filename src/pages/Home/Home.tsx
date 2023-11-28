import AutoCardCarousel from "../../components/AutoCardCarousel/AutoCardCarousel";
import Banner from "../../components/Banner/Banner";
import Parallax from "../../components/Parallax/Parallax";
import RandomProducts from "../../components/RandomProducts/RandomProducts";
import WhyGadgetSailor from "../../components/WhyGadgetSailor/WhyGadgetSailor";
import Modal from "../../components/Modal";
export default function Home() {
  return (
    <div>
      <Modal />
      <Banner></Banner>
      <AutoCardCarousel />
      <Parallax />
      <RandomProducts />
      <WhyGadgetSailor />
    </div>
  )
}
