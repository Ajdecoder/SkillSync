import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const MarketTrends = () => {
  const [trendData, setTrendData] = useState({ labels: [], values: [] });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Fetch market trends
    fetch("/api/market-trends")
      .then((res) => res.json())
      .then((data) => setTrendData(data));
  }, []);

  useEffect(() => {
    fetch("/api/market-trends")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch market trends");
        }
        return res.json();
      })
      .then((data) => setTrendData(data))
      .catch((err) => {
        console.error(err);
        // Provide fallback data or notify the user
        setTrendData({ labels: [], values: [] });
      });
  }, []);
  

  return (
    <div className="market-trends">
      <h2>Market Trends</h2>
      <canvas id="marketTrendsChart" ref={canvasRef}></canvas>
    </div>
  );
};

