import React from "react";
import Heading from "../../common/Heading";
import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  return (
    <>
      <section className="opacity-100">
        <div className="container">
          <Heading
            title="Our Features"
            subtitle="---> We Do Best Than You Wish <---"
            titleClassName="text-white"
            subtitleClassName="text-white"
          />
          <FeaturedCard />
        </div>
      </section>
    </>
  );
};

export default Featured;
