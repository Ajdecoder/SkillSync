import React, { useState, useEffect, useMemo } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { PORT_CLIENT } from "../../../commonClient";
import Recent from "../recent/Recent";
import { filterData } from "../../data/Data";

const Hero = () => {
  const { loggedInUser } = useAuth();
  // const {}
  const [programmers, setProgramers] = useState([]);
  const [filterCategory, setFilterCategory] = useState({
    selectedCity: "",
    selectedExpertType: "",
    selectedPriceRange: "",
  });
  const [error, setError] = useState(null);

  const filteredProgrammers = useMemo(() => {
    const { selectedCity, selectedExpertType, selectedPriceRange } = filterCategory;
    return programmers.filter((programmer) => {
      return (
        (selectedCity === "" || programmer.address === selectedCity) &&
        (selectedExpertType === "" || programmer.expertType === selectedExpertType) &&
        (selectedPriceRange === "" || programmer.priceRange === selectedPriceRange)
      );
    });
  }, [programmers, filterCategory]);

  const handleClick = () => {
    console.log("filterCategory",filterCategory);
  };


  return (
    <>
      {loggedInUser ? (
        <section className="hero">
          <div className="hero-image">
            <img src={"/images/banner.jpg"} alt="Hero" />
          </div>
          <div className="hero-container">
            <Heading
              title="Search Your Way"
              subtitle="Find new & featured programmers located in your local city."
            />

            <form className="hero-form m-auto mt-6">
              {/* City Filter */}
              <div className="box inpbox">
                <span>City/Region</span>
                <select
                  value={filterCategory.selectedCity}
                  onChange={(e) =>
                    setFilterCategory((prev) => ({ ...prev, selectedCity: e.target.value }))
                  }
                >
                  <option value="">Please choose City/Region</option>
                  {[...new Set(filterData.map((item) => item.city))].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expert Type Filter */}
              <div className="box inpbox">
                <span>Expert Type</span>
                <select
                  value={filterCategory.selectedExpertType}
                  onChange={(e) =>
                    setFilterCategory((prev) => ({
                      ...prev,
                      selectedExpertType: e.target.value,
                    }))
                  }
                >
                  <option value="">Please choose Expert Type</option>
                  {[...new Set(filterData.map((item) => item.expert))].map((expert) => (
                    <option key={expert} value={expert}>
                      {expert}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="box inpbox">
                <span>Price Range</span>
                <select
                  value={filterCategory.selectedPriceRange}
                  onChange={(e) =>
                    setFilterCategory((prev) => ({
                      ...prev,
                      selectedPriceRange: e.target.value,
                    }))
                  }
                >
                  <option value="">Please choose expected salary</option>
                  {[...new Set(filterData.map((item) => item.expected_salary))].map((salary) => (
                    <option key={salary} value={salary}>
                      {salary}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn1 bg-[#663399] p-2"
                type="button"
                onClick={handleClick}
              >
                <i className="fa fa-search"></i> Search
              </button>
            </form>
          </div>
        </section>
      ) : (
        <section className="hero-notloggedin h-60">
          <div className="hero-container h-1">
            <Heading
              title="Search Your Way"
              subtitle="Find new & featured programmers located in your local city."
            />
          </div>
        </section>
      )}
      <Recent programmers={programmers} filteredProgrammers={filteredProgrammers} filterCategory={filterCategory} />
    </>
  );
};

export default Hero;
