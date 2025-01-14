import React, { useState, useEffect, useMemo } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { PORT_CLIENT } from "../../../commonClient";
import Recent from "../recent/Recent";
import { filterData } from "../../data/Data";
import { motion } from "framer-motion";  // Import Framer Motion

const Hero = () => {
  const { loggedInUser } = useAuth();

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
    console.log("filterCategory", filterCategory);
  };

  return (
    <>
      {loggedInUser ? (
        <section className="hero ">
          <div className="hero-image">
            <img className="opacity-[0.0] " src={"/images/banner.jpg"} alt="Hero" />
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
              {/* City Filter */}
              <motion.div
                className="box inpbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                <span>City/Region</span>
                <select
                  value={filterCategory.selectedCity}
                  onChange={(e) =>
                    setFilterCategory((prev) => ({
                      ...prev,
                      selectedCity: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Please choose City/Region</option>
                  {[...new Set(filterData.map((item) => item.city))].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Expert Type Filter */}
              <motion.div
                className="box inpbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                <span>Expert Type</span>
                <select
                  value={filterCategory.selectedExpertType}
                  onChange={(e) =>
                    setFilterCategory((prev) => ({
                      ...prev,
                      selectedExpertType: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Please choose Expert Type</option>
                  {[...new Set(filterData.map((item) => item.expert))].map((expert) => (
                    <option key={expert} value={expert}>
                      {expert}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Price Range Filter */}
              <motion.div
                className="box inpbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <span>Price Range</span>
                <select
                  value={filterCategory.selectedPriceRange}
                  onChange={(e) =>
                    setFilterCategory((prev) => ({
                      ...prev,
                      selectedPriceRange: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Please choose expected salary</option>
                  {[...new Set(filterData.map((item) => item.expected_salary))].map((salary) => (
                    <option key={salary} value={salary}>
                      {salary}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.button
                className="btn1 bg-[#663399] p-[1rem] mb-0 hover:bg-black text-white"
                type="button"
                onClick={handleClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <i className="fa fa-search"></i> Search
              </motion.button>
            </motion.form>
          </div>
        </section>
      ) : (
        <section className="hero-notloggedin bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-16">
          <motion.div
            className="hero-container mx-auto max-w-4xl text-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Heading
              title="Search Your Way"
              subtitle="Discover talented programmers and developers in your city, and take your projects to the next level."
            />
            <p className="text-lg md:text-xl font-light">
              Explore a diverse pool of skilled professionals and connect with the right talent for your needs.
            </p>
            <motion.div className="mt-8 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              <button className="bg-white text-indigo-600 hover:text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
                Start Your Search
              </button>
              <button className="ml-4 bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
                Post a Job
              </button>
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
