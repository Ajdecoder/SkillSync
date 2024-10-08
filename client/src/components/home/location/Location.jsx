import React, { useEffect } from "react";
import Heading from "../../common/Heading";
import { location } from "../../data/Data";
import "./style.css";


const Location = () => {

  return (
    <>
      <section className="location padding">
        <div className="container">
          <Heading
            title="Explore By Company and Location"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />

          <div className="content grid3 mtop">
            {location.map((item, index) => (
              <div
                className="box"
                key={index}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-duration="1500"
              >
                <img src={item.cover} alt={item.name} width={"33rem"} height={"4rem"}/>
                <div className="overlay">
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Villas}</label>
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