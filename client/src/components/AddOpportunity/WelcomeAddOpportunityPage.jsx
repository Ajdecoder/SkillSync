import React from "react";
import { motion } from "framer-motion";

export const WelcomeAddOpportunityPage = ({ nextStep }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
    >
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Add Opportunity Page
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Create and manage new opportunities seamlessly.
      </p>
      <button
        onClick={nextStep}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Add Opportunity
      </button>
    </motion.div>
  );
};
