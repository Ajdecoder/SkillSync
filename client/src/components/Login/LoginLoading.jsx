import React from "react";
import { motion } from "framer-motion";

export const LoginLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div 
        className="flex space-x-1 text-4xl font-bold text-white"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {["S", "k", "i", "l", "l", "S", "y", "n", "c"].map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
