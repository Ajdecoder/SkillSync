import React from "react";
import Heading from "../../common/Heading";
import "./price.css";
import PriceCard from "./PriceCard";

const Price = () => {
  return (
    <>
      <section className="price padding dark:bg-[#0f0f0f] dark:text-white">
        <div className="container">
          <Heading
            title="Select Your Package"
            subtitle="Choose the perfect plan tailored to your needs. Whether you're looking for simplicity or advanced features, we’ve designed our packages to deliver value and flexibility. Explore your options and find the ideal fit for your goals."
            titleClassName="text-3xl font-bold text-center mb-4 dark:text-white"
            subtitleClassName="text-lg text-gray-600 text-center mb-8 dark:text-gray-300"
          />
          <PriceCard />
        </div>
      </section>
    </>
  );
};

export default Price;
