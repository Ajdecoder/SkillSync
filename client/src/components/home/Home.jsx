import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis"; // Import Lenis
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
      smooth: true, // Enable smooth scrolling
      lerp: 0.1, // Adjust for more/less smoothness
      duration: 1.2, // Duration of scroll effect
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup Lenis when component unmounts
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
      <HorizontalLogos/>
      <FAQ />
    </>
  );
};

export default Home;
