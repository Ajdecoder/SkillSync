import React from "react";
import { dummyRecentCards } from "./data/Data";
import { motion } from "framer-motion";
import { FiArrowRight, FiGlobe, FiMail, FiPhone, FiDollarSign, FiUsers, FiCalendar, FiMapPin } from "react-icons/fi";

export const SampleRecentCard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className=" p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {dummyRecentCards.map((card, index) => {
        const {
          company_name,
          company_website,
          email,
          ph_no,
          available_expert,
          from,
          to,
          desc_requirement,
          address,
          cover_Img,
          Status,
        } = card;

        return (
          <motion.div
            key={index}
            className="group relative bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -2 }}
          >
            <div className="relative space-y-4">
              {/* Company Header */}
              <div className="flex items-center gap-4">
                <img 
                  src={cover_Img} 
                  alt={company_name} 
                  className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {company_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FiGlobe className="text-gray-500" />
                    <a
                      href={`http://${company_website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {company_website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FiUsers className="text-gray-600" />
                  <span className="text-gray-700">
                    {available_expert.join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-gray-600" />
                  <span className="text-gray-700">{address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-gray-600" />
                  <span className="text-gray-700">
                    {new Date(from.date).toLocaleDateString('en-GB')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-gray-600" />
                  <span className="text-gray-700">{Status}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {desc_requirement.substring(0,100)}
              </p>

              {/* Timeline and Status */}
              <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md">
                <div className="text-sm text-gray-600">
                  {new Date(from.date).toLocaleDateString('en-GB')} - {new Date(to.date).toLocaleDateString('en-GB')}
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FiMail className="text-gray-600" />
                  <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800">
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiPhone className="text-gray-600" />
                  <span className="text-gray-700">{ph_no}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium">
                View Position Details
                <FiArrowRight className="inline-block" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};