import React from "react";
import Heading from "../../common/Heading";
import "./price.css";
import PriceCard from "./PriceCard";
import { price } from "../../common/constants";

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 p-3">            {price?.map((item, index) => {
            return (
              <PriceCard
                key={index}
                best={item.best}
                plan={item.plan}
                list={item.list}
                package_price={item.package_price}
                ptext={item.ptext}
              />
            );
          })}
          </div>

        </div>
      </section>
    </>
  );
};

export default Price;
