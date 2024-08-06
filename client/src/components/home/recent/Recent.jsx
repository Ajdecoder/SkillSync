import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"
import { useAuth } from "../../utils/AuthContext"

const Recent = () => {
  const { loggedInUser } = useAuth();

  return (
          loggedInUser && 
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Company Listed' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />

          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
