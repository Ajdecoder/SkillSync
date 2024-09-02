import React from "react";
import { featured } from "../../data/Data";

const FeaturedCard = () => {
  return (
    <>
      <div className="content featured-container grid5 mtop">
        {featured.map((items, index) => (
          <div
            className="box"
            key={index}
            data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}
            data-aos-duraton="2000"
          >
            <img src={items.cover} alt="" />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedCard;
