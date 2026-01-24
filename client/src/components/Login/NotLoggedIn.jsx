import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaUsers, FaChartLine, FaLock, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Heading from "../common/Heading";

export const LoginPromoPage = () => {
  const navigate = useNavigate();

  const features = [
    { 
      icon: <FaTrophy className="text-purple-600" />, 
      title: "Exclusive Access", 
      desc: "Get early access to premium job listings before they go public.",
      borderColor: "border-purple-200 dark:border-purple-900" 
    },
    { 
      icon: <FaChartLine className="text-blue-600" />, 
      title: "Career Tracking", 
      desc: "Visualize your application progress and skill growth analytics.",
      borderColor: "border-blue-200 dark:border-blue-900" 
    },
    { 
      icon: <FaUsers className="text-green-600" />, 
      title: "Direct Networking", 
      desc: "Message recruiters directly and skip the long application queues.",
      borderColor: "border-green-200 dark:border-green-900" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center my-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 mb-6">
          <FaLock size={28} />
        </div>
        
        <Heading 
          title="Unlock the Full Experience" 
          subtitle="You're seeing a limited view. Join thousands of professionals and take the next big step in your career journey."
        />
      </motion.div>

      {/* Features Grid - More Precise & Card-based */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl mt-12 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-8 bg-white dark:bg-gray-900 border ${feature.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Action Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-4 mb-8"
      >
        <button
          onClick={() => navigate("/login")}
          className="group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl"
        >
          Sign In to Unlock
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Don't have an account? <span className="text-purple-600 font-medium cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Create one for free</span>
        </p>
      </motion.div>

    </div>
  );
};