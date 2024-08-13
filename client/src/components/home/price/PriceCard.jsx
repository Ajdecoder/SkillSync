import React from "react";
import { price } from "../../data/Data";

const PriceCard = () => {
  return (
    <div className='content flex mtop'>
      {price.map((item) => (  
        <div className='box shadow' key={item.id}>
          <div className='topbtn'>
            <button className='btn3'>{item.best}</button>
          </div>
          <h3>{item.plan}</h3>
          <h1>
            <span>$</span>
            {item.price}
          </h1>
          <p>{item.ptext}</p>

          <ul>
            {item.list.map((val, index) => (
              <li key={index}>
                <label
                  style={{
                    background: val.change === "color" ? "#dc35451f" : "#216eb91f",
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
            className='btn5'
            style={{
              background: item.plan === "Standard" ? "#216eb9" : "#fff",
              color: item.plan === "Standard" ? "#fff" : "#216eb9",
            }}
          >
            Start {item.plan}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PriceCard;
