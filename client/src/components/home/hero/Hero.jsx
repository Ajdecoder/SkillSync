import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { PORT_CLIENT } from "../../../commonClient";
import Recent from "../recent/Recent";
import { filterData } from "../../data/Data";

const Hero = () => {
  const { loggedInUser } = useAuth();
  const [programmers, setProgramers] = useState([]);

  const programmerDAtafetch = async () => {
    try {
      const response = await axios.get(
        `${PORT_CLIENT}/api/requirements/allData`
      );

      if (response.data && Array.isArray(response.data.data)) {
        setProgramers(response.data.data);
      } else {
        console.error("Unexpected data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching programmer data", error);
    }
  };

  useEffect(() => {
    programmerDAtafetch();
  }, []);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedExpertType, setSelectedExpertType] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const filteredProgrammers = programmers.filter((programmer) => {
    return (
      (selectedCity === "" || programmer.address === selectedCity) &&
      (selectedExpertType === "" ||
        programmer.expertType === selectedExpertType) &&
      (selectedPriceRange === "" ||
        programmer.priceRange === selectedPriceRange)
    );
  });

  return (
    <>
      {loggedInUser ? (
        <section className="hero">
          <div className="hero-image">
            <img src={'../../images/banner.jpg'} alt="Hero" />
          </div>
          <div className="hero-container">
            <Heading
              title="Search Your Way"
              subtitle="Find new & featured programmers located in your local city."
            />

            <form className="hero-form">
              {/* City/Region Dropdown */}
              <div className="box inpbox">
                <span>City/Region</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >{filterData.map((cities)=>{
                  return <option value={cities.city} >{cities.city}</option>
                })}
                </select>
              </div>

              {/* Expert Type Dropdown */}
              <div className="box inpbox">
                <span>Expert Type</span>
                <select
                  value={selectedExpertType}
                  onChange={(e) => setSelectedExpertType(e.target.value)}
                >{filterData.map((expert)=>{
                  return <option value={expert.expert} >{expert.expert}</option>
                })}
                </select>
              </div>

              {/* Price Range Dropdown */}
              <div className="box inpbox">
                <span>Price Range</span>
                <select
                  value={selectedPriceRange} 
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >{filterData.map((salary)=>{
                  return <option value={salary.expected_salary} >{salary.expected_salary}</option>
                })}
                </select>
              </div>

              <button className="btn1" type="button">
                <i className="fa fa-search"></i> Search
              </button>
            </form>
          </div>
        </section>
      ) : (
        <section className="hero h-60">
          <div className="hero-container">
            <Heading
              title="Search Your Way"
              subtitle="Find new & featured programmers located in your local city."
            />
          </div>
        </section>
      )}
      <Recent
        programmers={programmers}
        filteredProgrammers={filteredProgrammers}
      />
    </>
  );
};

export default Hero;
