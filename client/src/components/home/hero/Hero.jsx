import React, { useState, useEffect, useMemo } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { PORT_CLIENT } from "../../../commonClient";
import Recent from "../recent/Recent";
import { filterData } from "../../data/Data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CandidatesFilters } from "../../common/Filters/TalentsFilter";
import { OpportunitiesFilter } from "../../common/Filters/OpportunitiesFilter";

const Hero = () => {
  const { loggedInUser, googleUser } = useAuth();

  const [programmers, setProgrammers] = useState([]);
  const [filterCategory, setFilterCategory] = useState({
    selectedCity: "",
    selectedExpertType: "",
    selectedPriceRange: "",
  });
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const filteredProgrammers = useMemo(() => {
    const { selectedCity, selectedExpertType, selectedPriceRange } =
      filterCategory;
    return programmers.filter((programmer) => {
      return (
        (selectedCity === "" || programmer?.address === selectedCity) &&
        (selectedExpertType === "" ||
          programmer?.expertType === selectedExpertType) &&
        (selectedPriceRange === "" ||
          programmer?.priceRange === selectedPriceRange)
      );
    });
  }, [programmers, filterCategory]);

  const handleClick = () => {
    setIsSearching(true);
    setTimeout(() => {
      console.log("filterCategory", filterCategory);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <>
      {loggedInUser || googleUser ? (
        <section className="hero">
          <div className="hero-image">
            <img
              className="opacity-[0.0]"
              src="/images/banner.jpg"
              alt="Hero"
            />
          </div>
          <div className="hero-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Heading
                title="Search Your Way"
                subtitle="Find new & featured programmers located in your local city."
              />
            </motion.div>

            <motion.form
              className="hero-form m-auto mt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {loggedInUser?.role === "recruiter" ||
              googleUser?.role === "recruiter" ? (
                <CandidatesFilters
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  filterData={filterData}
                  setError={setError}
                  programmers={programmers}
                  setProgrammers={setProgrammers}
                />
              ) : (
                <OpportunitiesFilter
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  filterData={filterData}
                  setError={setError}
                  programmers={programmers}
                  setProgrammers={setProgrammers}
                />
              )}

              <motion.button
                className={`btn1 bg-[#663399] p-[1rem] mb-0 hover:bg-black text-white ${
                  isSearching ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="button"
                onClick={handleClick}
                disabled={isSearching}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {isSearching ? (
                  "Searching..."
                ) : (
                  <>
                    <i className="fa fa-search"></i> Search
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </section>
      ) : (
        <section className="hero-LoginPromoPage bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-16">
          <motion.div
            className="hero-container mx-auto max-w-4xl text-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Heading
              title="Search Your Way"
              subtitle="Whether you're looking to hire top talent or find your next job, we have the right tools to connect you with opportunities."
            />
            <p className="text-lg md:text-xl font-light">
              Discover skilled professionals or explore job opportunities that
              align with your expertise. Start your journey today!
            </p>

            <motion.div
              className="mt-8 flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <Link
                to="/requirements/search"
                className="bg-white text-indigo-600 hover:text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              >
                Start Your Search
              </Link>
              <Link
                to="/requirements/add-opportunity"
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Post a Job
              </Link>
            </motion.div>
          </motion.div>
        </section>
      )}
      <Recent
        programmers={programmers}
        filteredProgrammers={filteredProgrammers}
        filterCategory={filterCategory}
      />
    </>
  );
};

export default Hero;
