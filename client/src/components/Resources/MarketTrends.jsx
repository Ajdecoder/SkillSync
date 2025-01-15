import React from "react";
import { motion } from "framer-motion";
import "../Resources/MarketTrends.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "January", jobPostings: 150, talentSearches: 120, activeUsers: 90 },
  { name: "February", jobPostings: 180, talentSearches: 140, activeUsers: 110 },
  { name: "March", jobPostings: 200, talentSearches: 160, activeUsers: 130 },
  { name: "April", jobPostings: 220, talentSearches: 180, activeUsers: 150 },
  { name: "May", jobPostings: 250, talentSearches: 200, activeUsers: 170 },
  { name: "June", jobPostings: 300, talentSearches: 240, activeUsers: 200 },
  { name: "July", jobPostings: 350, talentSearches: 280, activeUsers: 230 },
  { name: "August", jobPostings: 400, talentSearches: 320, activeUsers: 270 },
  {
    name: "September",
    jobPostings: 450,
    talentSearches: 350,
    activeUsers: 300,
  },
  { name: "October", jobPostings: 500, talentSearches: 380, activeUsers: 320 },
  { name: "November", jobPostings: 550, talentSearches: 420, activeUsers: 350 },
  { name: "December", jobPostings: 600, talentSearches: 460, activeUsers: 380 },
];

const MyChart = () => (
  <div style={{ width: "100%", height: 450 }}>
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
          tick={{ angle: -45, textAnchor: "end" }}
          tickLine={false}
          axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="jobPostings" stroke="#8884d8" />
        <Line type="monotone" dataKey="talentSearches" stroke="#82ca9d" />
        <Line type="monotone" dataKey="activeUsers" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const MarketTrends = () => {
  const trends = [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Discover the latest advancements in AI.",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Remote Work Culture",
      description: "Insights into the evolving work-from-home trends.",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Blockchain Technology",
      description: "Explore the rise of decentralized systems.",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Sustainability",
      description: "Learn about eco-friendly innovations.",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-10">
      {/* Header Section */}
      <header className=" trends-header text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Market Trends</h1>
        <p className="text-gray-600 text-lg ">
          Stay updated with the latest market insights and trends shaping the
          future.
        </p>
      </header>

      {/* Trends Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {trends.map((trend) => (
          <motion.div
            key={trend.id}
            className={`p-6 rounded-lg shadow-lg text-white ${trend.color}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{trend.title}</h3>
            <p>{trend.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Chart Section */}
      <section className="max-w-6xl mt-16 w-full">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Dynamic Market Graph
          </h2>
          <div className=" bg-gray-200 rounded-lg flex items-center justify-center">
            <MyChart />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MarketTrends;
