import React from "react";
import { featured } from "../../data/Data";

const FeaturedCard = () => {
  return (
    <>
      <div className="content featured-container grid3 justify-items-center mtop p-5" style={{padding:'20px'}} >
        {featured.map((items, index) => (
          <div
            className="box w-[15rem] "
            key={index}
          >
            <img src={items.cover} alt="" />
            <h4 className="pt-2 text-[#00ffb3]" >{items.name}</h4>
            <label className="pt-2 text-[azure]" >{items.total}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedCard;
