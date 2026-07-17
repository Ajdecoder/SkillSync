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

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {location.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative overflow-hidden rounded-xl"
              >
                <img
                  src={item.cover}
                  alt={item.name}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover layer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-5 text-center text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <h5 className="mb-3 translate-y-4 text-xl font-semibold transition-transform duration-300 group-hover:translate-y-0">
                    {item.name}
                  </h5>

                  <div className="flex translate-y-4 flex-wrap justify-center gap-2 text-sm transition-transform duration-300 group-hover:translate-y-0">
                    <span className="rounded-md bg-white/20 px-3 py-1 backdrop-blur-sm">
                      {item.Experts}
                    </span>

                    <span className="rounded-md bg-white/20 px-3 py-1 backdrop-blur-sm">
                      {item.Offices}
                    </span>

                    <span className="rounded-md bg-white/20 px-3 py-1 backdrop-blur-sm">
                      {item.Apartments}
                    </span>
                  </div>
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
