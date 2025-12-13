import Awards from "./awards/Awards";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Price from "./price/Price";
import Team from "./team/Team";
import FAQ from "../FAQ/FAQ";
import HorizontalLogos from "../common/HorizontalComponents/HorizontalLogos";

const Home = () => {


  return (
    <>
      <Hero />
      <Featured />
      <Awards />
      <Location />
      <Team />
      <Price />
      <HorizontalLogos />
      <FAQ />
    </>
  );
};

export default Home;
