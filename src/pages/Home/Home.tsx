import AutoCardCarousel from "../../components/Home/AutoCardCarousel/AutoCardCarousel";
import Banner from "../../components/Home/Banner/Banner";
import Parallax from "../../components/Home/Parallax/Parallax";
import RandomProducts from "../../components/Home/RandomProducts/RandomProducts";
import WhyGadgetSailor from "../../components/Home/WhyGadgetSailor/WhyGadgetSailor";
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
