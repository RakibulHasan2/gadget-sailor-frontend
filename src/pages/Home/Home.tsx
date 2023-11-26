import AutoCardCarousel from "../../components/AutoCardCarousel/AutoCardCarousel";
import Banner from "../../components/Banner/Banner";
import RandomProducts from "../../components/RandomProducts/RandomProducts";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AutoCardCarousel />
      <RandomProducts/>
    </div>
  )
}
