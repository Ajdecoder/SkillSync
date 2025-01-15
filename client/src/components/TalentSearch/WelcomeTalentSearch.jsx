import React from 'react';
import { motion } from 'framer-motion';

export const WelcomeTalentPage = ({nextStep}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://www.pageexecutive.com/sites/pageexecutive.com/files/legacy/20-3-Crucial-Trends-That-Smart-HR.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen flex items-center justify-center text-center p-6">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-lg w-full text-white"
        >
          <h1 className="text-4xl font-semibold mb-4">Welcome to the Talent Hub</h1>
          <p className="text-xl mb-6">Discover exciting opportunities and connect with top professionals!</p>
          
          {/* Call to Action Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#4CAF50' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-xl"
            onClick={nextStep}
          >
            Explore Talent Opportunities
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
