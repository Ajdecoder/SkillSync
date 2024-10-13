import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";
import { PORT_CLIENT } from "../../../commonClient";
import Recent from "../recent/Recent";

const Hero = () => {
  const { loggedInUser } = useAuth();
  const [programmers, setProgramers] = useState([]);

  // Function to fetch programmer data
  const programmerDAtafetch = async () => {
    try {
      const response = await axios.get(
        `${PORT_CLIENT}/api/requirements/allRequirements`
      );

      console.log("Full API Response:", response); // Log the entire response
      if (response.data && Array.isArray(response.data.data)) {
        setProgramers(response.data.data);
      } else {
        console.error("Unexpected data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching programmer data", error);
    }
  };

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    programmerDAtafetch();
  }, []);

  // Log programmers state whenever it updates
  useEffect(() => {
    console.log("programmers print->>>", programmers);
  }, [programmers]);

  // State to hold the selected values for filtering
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedExpertType, setSelectedExpertType] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  // Filter function to filter programmers based on selected values
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
          <div className="container">
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
                >
                  <option value="">Select City/Region</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Noida">Noida</option>
                  <option value="Pune">Pune</option>
                  <option value="Surat">Surat</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
              </div>

              {/* Expert Type Dropdown */}
              <div className="box inpbox">
                <span>Expert Type</span>
                <select
                  value={selectedExpertType}
                  onChange={(e) => setSelectedExpertType(e.target.value)}
                >
                  <option value="">Select Tech Expert Type</option>
                  <option value="full-stack">Full Stack Developer</option>
                  <option value="backend-developer">Backend Developer</option>
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="data-science">Data Scientist</option>
                  <option value="ml-engineer">ML Engineer</option>
                  <option value="ui-ux">UI/UX Designer</option>
                  <option value="devops">DevOps Engineer</option>
                  <option value="mobile-developer">Mobile App Developer</option>
                  <option value="blockchain-developer">
                    Blockchain Developer
                  </option>
                  <option value="cyber-security">
                    Cyber Security Specialist
                  </option>
                  <option value="qa-engineer">QA Engineer</option>
                </select>
              </div>

              {/* Price Range Dropdown */}
              <div className="box inpbox">
                <span>Price Range</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  <option value="">Select Price Range</option>
                  <option value="40000-50000">$40,000 - $50,000</option>
                  <option value="50000-60000">$50,000 - $60,000</option>
                  <option value="60000-70000">$60,000 - $70,000</option>
                  <option value="70000-80000">$70,000 - $80,000</option>
                  <option value="80000-90000">$80,000 - $90,000</option>
                  <option value="90000-100000">$90,000 - $100,000</option>
                  <option value="100000-150000">$100,000 - $150,000</option>
                  <option value="150000-200000">$150,000 - $200,000</option>
                </select>
              </div>

              <button className="btn1" type="button">
                <i className="fa fa-search"></i> Search
              </button>
            </form>
          </div>
        </section>
      ) : (
        <section className="hero">
          <div className="container">
            <Heading
              title="Search Your Way"
              subtitle="Find new & featured programmers located in your local city."
            />
          </div>
        </section>
      )}
      <Recent programmers={programmers} filteredProgrammers={filteredProgrammers} />
    </>
  );
};

export default Hero;
