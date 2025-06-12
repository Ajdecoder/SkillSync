import React from "react";
import { motion } from "framer-motion";

export const WelcomeAddOpportunityPage = ({ nextStep }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen w-full 
                 bg-gray-100  bg-gradient-to-br from-white to-gray-400 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 
                 p-6 transition-colors duration-300"
    >
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
        Welcome to Add Opportunity Page
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Create and manage new opportunities seamlessly.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextStep}
        className="px-6 py-3 bg-blue-500 dark:bg-blue-600 
                   text-white rounded-lg shadow-md 
                   hover:bg-blue-600 dark:hover:bg-blue-700
                   transition-all duration-200"
      >
        Add Opportunity
      </motion.button>
    </motion.div>
  );
};