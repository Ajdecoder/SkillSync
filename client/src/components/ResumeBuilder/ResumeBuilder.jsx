import React, { useState } from "react";
import { motion } from "framer-motion";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume Data:", formData);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12"
    >
      <div className="max-w-3xl mx-auto px-4">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Build Your Professional Resume
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-xl p-8 shadow-lg"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={inputVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+1 234 567 890"
              />
            </motion.div>
          </div>

          <motion.div variants={inputVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="4"
              placeholder="Experienced professional with..."
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills (comma separated)
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="3"
              placeholder="Project Management, Team Leadership, ..."
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="3"
              placeholder="University Name, Degree..."
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Experience
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="3"
              placeholder="Company Name, Position..."
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            className="pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Generate Professional Resume
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;