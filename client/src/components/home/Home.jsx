import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Awards from "./awards/Awards";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Price from "./price/Price";
import Team from "./team/Team";
import FAQ from "../FAQ/FAQ";
import HorizontalLogos from "../common/HorizontalLogos/HorizontalLogos";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1.2,
      touchMultiplier: 2.5,
      infinite: false,
      gestureOrientation: "vertical",
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
 
    setTimeout(() => {
      lenis.resize();
    }, 500);

    return () => {
      lenis.destroy();
    };
  }, []);

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
