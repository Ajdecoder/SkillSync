import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        className="text-center"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 60, duration: 1.5 }}
      >
        <motion.div
          className="relative m-auto"
          initial={{ scale: 0.7 }}
          animate={{ scale: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Search className="w-24 h-24 mx-auto" color="red" />
        </motion.div>

        <motion.h1
          className="text-9xl font-extrabold text-red-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-2xl text-gray-300 mt-4"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Oops! Looks like you're lost. Let's get you back on track!
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 mt-2"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Click below to head back home and find your way.
        </motion.p>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;