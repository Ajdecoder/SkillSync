import React from "react";
import Heading from "../../common/Heading";
import { location } from "../..//common/constants";
import "./style.css";

const Location = () => {
  return (
    <>
      <section className="location padding dark:bg-[#0f0f0f] dark:text-white">
        <div className="container">
          <Heading
            title="Explore By Company and Location"
          />

          <div className="content grid3 mtop">
            {location.map((item, index) => (
              <div
                className="box"
                key={index}
              >
                <img
                  src={item.cover}
                  alt={item.name}
                  width="100%" // Make image width responsive
                  height="auto" // Maintain image aspect ratio
                />
                <div className="overlay">
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Experts}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
