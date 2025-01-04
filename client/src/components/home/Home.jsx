import React, { useEffect, useState } from "react";
import Awards from "./awards/Awards";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Price from "./price/Price";
import Team from "./team/Team";
import { LoginLoading } from "../Login/LoginLoading";
import FAQ from "../FAQ/FAQ";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Awards />
      <Location />
      <Team />
      <Price />
      <FAQ />
    </>
  );
};

export default Home;
