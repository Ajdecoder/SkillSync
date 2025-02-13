import React from "react";
import { featured } from "../../data/Data";
import { motion } from "framer-motion";

const FeaturedCard = () => {
  return (
    <>
      <motion.div
        className="content featured-container grid3 justify-items-center mtop p-5"
        style={{ padding: "20px" }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }} 
      >
        {featured.map((items, index) => (
          <motion.div
            className="box w-[15rem]"
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: false }}
          >
            <img src={items.cover} alt="" />
            <h4 className="pt-2 text-[#00ffb3]">{items.name}</h4>
            <label className="pt-2 text-[azure]">{items.total}</label>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default FeaturedCard;
