import { motion } from "framer-motion";
import { FaRocket, FaTrophy, FaUsers, FaChartLine, FaLock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export const LoginPromoPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <FaTrophy />, title: "Access Exclusive Opportunities", color: "bg-purple-500" },
    { icon: <FaChartLine />, title: "Track Your Career Growth", color: "bg-blue-500" },
    { icon: <FaUsers />, title: "Connect with Top Recruiters", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white flex flex-col items-center justify-center p-6">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="text-6xl mb-6"><FaLock /></div>
        <h1 className="text-5xl font-bold mb-4">
          You're Missing Out! 🔐
        </h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Log in to unlock powerful features, track your career progress, and connect with top industry professionals.
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-16"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -10 }}
            className={`p-8 rounded-2xl backdrop-blur-lg bg-white/10 hover:bg-white/20 transition-all`}
          >
            <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-blue-200">Sign in to take advantage of this feature.</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full animate-pulse" />
        <button
          onClick={() => navigate("/login")}
          className="relative bg-gradient-to-r from-yellow-400 to-orange-400 px-16 py-5 rounded-full
          text-purple-900 font-bold text-xl hover:scale-105 transition-transform"
        >
          Log in to Unlock
        </button>
      </motion.div>

    </div>
  );
};
