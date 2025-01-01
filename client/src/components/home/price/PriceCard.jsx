import React from "react";
import { price } from "../../data/Data";

const PriceCard = () => {
  return (
    <div className="content flex mtop">
      {price.map((item, index) => (
        <div
          className="box shadow bg-black text-white opacity-25"
          key={item.id}
          data-aos={index % 2 === 0 ? "zoom-in-down" : "zoom-in-up"}
          data-aos-duration="1000"
        >
          <div className="topbtn">
            <button className="btn3 p-2">{item.best}</button>
          </div>
          <h3>{item.plan}</h3>
          <h1 className="text-white">${item.package_price}</h1>
          <p className="text-white">{item.ptext}</p>

          <ul>
            {item.list.map((val, index) => (
              <li key={index}>
                <label
                  style={{
                    background:
                      val.change === "color" ? "#dc35451f" : "#216eb91f",
                    color: val.change === "color" ? "#dc3848" : "#216eb9",
                  }}
                >
                  {val.icon}
                </label>
                <p>{val.text}</p>
              </li>
            ))}
          </ul>
          <button
            className="btn5  hover:bg-sky-600 hover:text-white hover:scale-105 duration-300 ease-in-out"
            style={
              {
                background: item.plan === "Standard" ? "#216eb9" : "#fff",
                color: item.plan === "Standard" ? "#fff" : "#216eb9",
              }
            }
          >
            Start {item.plan}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PriceCard;
