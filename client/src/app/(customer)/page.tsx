import Hero from "../components/heroCom/hero";
import HeroSlider from "../components/heroCom/heroSlider";
export default function Home(){
  return(
    <>
    <div className="flex max-w-7xl mx-auto gap-4 mt-2 h-[455px]">
      <Hero />
      <div className="flex-1 h-full">
        <HeroSlider />
      </div>
    </div>
    </>
  )
}