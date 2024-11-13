import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import "./about.css";

const About = () => {
  return (
    <>
      <section className="about">
        <div className="container  mtop">
          <div className="left row">
            <Heading
              title="Our Agency Story"
              subtitle="Check out our company story and work process"
            />

            <p className="text-blue-600" >
              Founded on the belief that innovation and dedication drive
              success, our agency has been empowering clients through tailored
              solutions and creative strategies. From humble beginnings to
              industry recognition, we’ve always stayed true to our core values
              of integrity, collaboration, and excellence.
            </p>
            <p className="text-slate-400" >
              Every project we undertake is fueled by passion and purpose,
              ensuring impactful results that resonate. Join us as we continue
              to push boundaries and make a difference, one success story at a
              time.
            </p>
            <button className="btn2 mt-[10px] mr-`auto ml-auto">Learn More About Us</button>
          </div>
          <div className="right-row">
            <img src="./immio.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
