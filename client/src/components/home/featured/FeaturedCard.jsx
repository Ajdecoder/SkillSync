import React from "react";
import { motion } from "framer-motion";
import { featured } from "../../common/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const FeaturedCard = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 sm:mb-10 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            Featured opportunities
          </span>

          <h2 className="mt-3 sm:mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
            Explore Popular Categories
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 dark:text-gray-400 px-2 sm:px-0">
            Discover opportunities from popular industries and find the role
            that matches your skills and interests.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((item, index) => (
            <motion.article
              key={item.id || item.name || index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.25,
                },
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img
                  src={item.cover}
                  alt={item.name || "Featured category"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center justify-between gap-3 p-4 sm:gap-4 sm:p-5">
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Available positions
                  </p>

                  <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                    {item.total}
                  </p>
                </div>

                <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 transition-all duration-300 group-hover:bg-green-500 group-hover:text-white dark:bg-green-500/10 dark:text-green-400 dark:group-hover:bg-green-500 dark:group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCard;