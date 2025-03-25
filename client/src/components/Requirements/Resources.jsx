import { motion } from "framer-motion";
import {
  FaSearch,
  FaUserCheck,
  FaBell,
  FaFileAlt,
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";
import { BsFillPersonFill, BsBuilding } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Resources = () => {
  const { loggedInUser, google_user } = useAuth();

  const currentUser = loggedInUser || google_user;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const features = [
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "Advanced Job Search",
      description:
        "AI-powered search with salary filters and location matching",
    },
    {
      icon: <FaUserCheck className="w-8 h-8" />,
      title: "Instant Applications",
      description: "One-click apply with auto-filled profile information",
    },
    {
      icon: <FaBell className="w-8 h-8" />,
      title: "Smart Alerts",
      description: "Real-time notifications for new job matches",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
          SkillSync Platform Features
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Connecting talent with opportunities through intelligent job matching
        </p>
      </motion.div>

      {/* Core Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-8 mb-20"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-blue-600 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* User Benefits */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
          Benefits for Everyone
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white rounded-xl shadow-md"
          >
            <div className="flex items-center mb-4">
              <BsFillPersonFill className="w-8 h-8 text-green-600 mr-4" />
              <h3 className="text-xl font-semibold">Job Seekers</h3>
            </div>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Personalized job recommendations</li>
              <li>Salary estimation tools</li>
              <li>Company culture insights</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white rounded-xl shadow-md"
          >
            <div className="flex items-center mb-4">
              <BsBuilding className="w-8 h-8 text-purple-600 mr-4" />
              <h3 className="text-xl font-semibold">Employers</h3>
            </div>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Advanced candidate filtering</li>
              <li>Applicant tracking system</li>
              <li>Diversity analytics</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Experience */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-50 py-16 px-4 rounded-2xl mb-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <FaMobileAlt className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Seamless Mobile Experience
          </h2>
          <p className="text-slate-600 mb-8">
            Apply to jobs and manage applications on the go with our native
            mobile apps
          </p>
          <div className="flex justify-center gap-4">
            <button className="flex items-center bg-slate-800 text-white px-6 py-3 rounded-lg">
              <FaChartLine className="mr-2" /> iOS App
            </button>
            <button className="flex items-center bg-slate-800 text-white px-6 py-3 rounded-lg">
              <FaChartLine className="mr-2" /> Android App
            </button>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Start Your Journey Today
        </h2>
        <div className="flex justify-center gap-4">
          {currentUser?.role === "recruiter" ? (
            <>
              <Link
                to="/requirements/hire-talent"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Hire New Talents
              </Link>
              <Link
                to="/requirements/add-opportunity"
                className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Post Jobs Now
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/requirements/browse-opportunities"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Find Your Dream Job
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
