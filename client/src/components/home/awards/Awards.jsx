import React from "react";
import Heading from "../../common/Heading";
import { awards } from "../..//common/constants";

const Awards = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-125">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <Heading
            title="Our Awards"
            titleClassName="text-4xl md:text-5xl font-bold text-white mb-4"
            subtitle="Over 1,24,000+ Happy Users Being With Us Still They Love Our Services"
            subtitleClassName="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          />
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((val, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white/10 rounded-full text-3xl text-white">
                {val.icon}
              </div>

              {/* Number */}
              <h2 className="text-4xl font-bold text-white mb-2">
                {val.num}
              </h2>

              {/* Name */}
              <p className="text-lg text-gray-300">
                {val.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;