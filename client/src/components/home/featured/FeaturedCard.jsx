import React from "react";
import { featured } from "../..//common/constants";
import { motion } from "framer-motion";

const FeaturedCard = () => {
  // 1. Define Variants: Isse animation clean rehta hai
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2, // Ek ke baad ek card aayega (Stagger effect)
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="overflow-hidden"> {/* Horizontal scroll avoid karne ke liye */}
      <motion.div
        className="content featured-container grid grid-cols-1 md:grid-cols-3 justify-items-center mtop p-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Ek hi baar trigger hoga smooth feel ke liye
      >
        {featured.map((items, index) => (
          <motion.div
            className="box w-[15rem] p-4 bg-gray-900 rounded-lg m-2"
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }} // Hover effect wapas de diya
          >
            <img src={items.cover} alt={items.name} className="w-full h-auto" />
            <h4 className="pt-2 text-[#00ffb3] font-bold">{items.name}</h4>
            <label className="pt-2 text-[azure]">{items.total}</label>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedCard;