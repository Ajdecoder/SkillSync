import React from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useAuth } from "../../utils/AuthContext";

const Hero = () => {
  const { loggedInUser } = useAuth();
  return (
    <>
      {
        loggedInUser?(
        <section className="hero">
          <div className="container">
            <Heading
              title="Search Your Way "
              subtitle="Find new & featured porgrammer located in your local city."
            />

            <form className="hero-form">
              <div className="box inpbox">
                <span>City/Region</span>
                <select>
                  <option value="">Select City/Region</option>
                  <option>Delhi</option>
                  <option>Gurugram</option>
                  <option>Noida</option>
                  <option>Pune</option>
                  <option>Surat</option>
                  {/* Add more city options here */}
                </select>
              </div>
              <div className="box inpbox">
                <span>Expert Type</span>
                <select>
                  <option value="">Select Tech Expert Type</option>
                  <option value="full-stack">Full Stack Developer</option>
                  <option value="backend-developer">Backend developer</option>
                  <option value="frontend">Frontend developer</option>
                  <option value="data-science">Data Science</option>
                  <option value="ml-engineering">ML ENGINEER</option>

                  {/* Add more property type options here */}
                </select>
              </div>
              <div className="box inpbox">
                <span>Price Range</span>
                <select>
                  <option value="">Select Price nge</option>
                  <option value="400000-500000">$400,000 - $500,000</option>
                  <option value="500000-600000">$500,000 - $600,000</option>
                  <option value="600000-700000">$600,000 - $700,000</option>
                  <option value="700000-800000">$700,000 - $800,000</option>
                  <option value="800000-900000">$800,000 - $900,000</option>
                  <option value="900000-1000000">$900,000 - $1,000,000</option>

                  {/* Add more price range options here */}
                </select>
              </div>
              <button className="btn1">
                <i className="fa fa-search"></i> Search
              </button>
            </form>
          </div>
        </section>
        ) : (
          <section className="hero">
          <div className="container">
            <Heading
              title="Search Your Way "
              subtitle="Find new & featured porgrammer located in your local city."
            />
          </div>
        </section>
        )
      }
    </>
  );
};

export default Hero;
