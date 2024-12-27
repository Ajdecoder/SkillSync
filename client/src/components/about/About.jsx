import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import "./about.css";

const About = () => {
  return (
    <>
      <section className="about bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="left row md:w-1/2">
            <Heading
              title="Our Agency Story"
              subtitle="Check out our company story and work process"
            />
            <main className="mt-4 text-lg leading-relaxed">
              Founded on the belief that innovation and dedication drive
              success, our agency has been empowering clients through tailored
              solutions and creative strategies. From humble beginnings to
              industry recognition, we’ve always stayed true to our core values
              of integrity, collaboration, and excellence.
            </main>
            <main className="text-gray-600 mt-4 text-lg leading-relaxed">
              Every project we undertake is fueled by passion and purpose,
              ensuring impactful results that resonate. Join us as we continue
              to push boundaries and make a difference, one success story at a
              time.
            </main>
            <button className="btn2 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 mt-6">
              Learn More About Us
            </button>
          </div>
          <div className="right row md:w-1/2 h-80">
            <img
              src="./immio.jpg"
              alt="Agency"
              className="rounded-lg shadow-lg w-full h-80  hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
