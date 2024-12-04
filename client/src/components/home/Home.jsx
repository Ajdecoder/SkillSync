import React, { useEffect } from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Team from "./team/Team"
import { LoginLoading } from "../Login/LoginLoading"

const Home = () => {

  useEffect(()=>{
   setTimeout(() => {
    return <LoginLoading/>
   }, 2000); 
  })

  return (
    <>
    <div>
      <Hero />
      <Featured />
      <Awards />
      <Location />
      <Team />
      <Price />
    </div>
    </>
  )
}

export default Home
