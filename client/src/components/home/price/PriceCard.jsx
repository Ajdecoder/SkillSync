import React from "react";
import { motion } from "framer-motion";

const PriceCard = ({ best, plan, list, package_price, ptext }) => {
  return (
    <div className="content justify-center flex-wrap mtop gap-4">
      <motion.div
        className="box shadow bg-black text-white opacity-25"
      >
        <div className="topbtn">
          <button className="rounded-[50%] bg-orange-600 p-2">
            {best}
          </button>
        </div>
        <h3>{plan}</h3>
        <h1 className="text-white">${package_price}</h1>
        <p className="text-white">{ptext}</p>

        <ul>
          {list.map((val, index) => (
            <motion.li
              key={index}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2"
            >
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
            </motion.li>
          ))}
        </ul>
        <button
          className="btn5  hover:bg-sky-600 hover:text-white hover:scale-105 duration-300 ease-in-out"
          style={{
            background: plan === "Standard" ? "#216eb9" : "#fff",
            color: plan === "Standard" ? "#fff" : "#216eb9",
          }}
        >
          Start {plan}
        </button>
      </motion.div>
    </div>
  );
};

export default PriceCard;
