import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./MarketTrends.css";
import { getMarketTrendsData } from "../../services/api";
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

const MyChart = ({ data }) => (
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
        <CartesianGrid strokeDasharray="3 3" stroke="#888888" />
        <XAxis
          dataKey="name"
          interval={0}
          tick={{ angle: -45, textAnchor: "end", fill: "#888888" }}
          tickLine={{ stroke: "#888888" }}
          axisLine={{ stroke: "#888888", strokeWidth: 1 }}
        />
        <YAxis
          tick={{ fill: "#888888" }}
          tickLine={{ stroke: "#888888" }}
          axisLine={{ stroke: "#888888" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.9)',
            borderColor: '#4b5563',
            borderRadius: '0.5rem',
            color: '#ffffff'
          }}
        />
        <Legend
          wrapperStyle={{
            color: '#888888',
            paddingTop: '20px'
          }}
        />
        <Line type="monotone" dataKey="jobPostings" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="talentSearches" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="activeUsers" stroke="#ff7300" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const MarketTrends = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchMarketTrends = async () => {
      try {
        const response = await getMarketTrendsData();
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching market trends:", error);
      }
    };
    fetchMarketTrends();
  }, []);

  const trends = [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Discover the latest advancements in AI.",
      color: "bg-blue-500 dark:bg-blue-700",
    },
    {
      id: 2,
      title: "Remote Work Culture",
      description: "Insights into the evolving work-from-home trends.",
      color: "bg-green-500 dark:bg-green-700",
    },
    {
      id: 3,
      title: "Blockchain Technology",
      description: "Explore the rise of decentralized systems.",
      color: "bg-purple-500 dark:bg-purple-700",
    },
    {
      id: 4,
      title: "Sustainability",
      description: "Learn about eco-friendly innovations.",
      color: "bg-yellow-500 dark:bg-yellow-600",
    },
  ];

  return (
    <div className="min-h-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center px-6 py-10">
      {/* Header Section */}
      <header className="trends-header text-center m-10">
        <div className="min-w-full">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 p-3">
            Market Trends
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Stay updated with the latest market insights and trends shaping the
            future.
          </p>
        </div>
      </header>

      {/* Trends Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {trends.map((trend) => (
          <motion.div
            key={trend.id}
            className={`p-6 rounded-lg shadow-lg text-white ${trend.color} hover:shadow-xl transition-shadow`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{trend.title}</h3>
            <p className="dark:text-gray-100">{trend.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Chart Section */}
      <section className="max-w-6xl mt-16 w-full">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 dynamic-graph"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Dynamic Market Graph
          </h2>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <MyChart data={chartData} />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MarketTrends;