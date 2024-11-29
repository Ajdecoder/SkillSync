import React from "react";
import Heading from "../../common/Heading";
import "./price.css";
import PriceCard from "./PriceCard";

const Price = () => {
  return (
    <>
      <section className="price padding">
        <div className="container">
          <Heading
            title="Select Your Package"
            subtitle="Choose the perfect plan tailored to your needs. Whether you're looking for simplicity or advanced features, we’ve designed our packages to deliver value and flexibility. Explore your options and find the ideal fit for your goals."
          />
          <PriceCard />
        </div>
      </section>
    </>
  );
};

export default Price;
