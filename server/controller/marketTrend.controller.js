import { MarketTrends } from "../db/database.js";

const initialData = [
  { name: "January", jobPostings: 150, talentSearches: 120, activeUsers: 90 },
  { name: "February", jobPostings: 180, talentSearches: 140, activeUsers: 110 },
  { name: "March", jobPostings: 200, talentSearches: 160, activeUsers: 130 },
  { name: "April", jobPostings: 220, talentSearches: 180, activeUsers: 150 },
  { name: "May", jobPostings: 250, talentSearches: 200, activeUsers: 170 },
  { name: "June", jobPostings: 300, talentSearches: 240, activeUsers: 200 },
  { name: "July", jobPostings: 350, talentSearches: 280, activeUsers: 230 },
  { name: "August", jobPostings: 400, talentSearches: 320, activeUsers: 270 },
  { name: "September", jobPostings: 450, talentSearches: 350, activeUsers: 300 },
  { name: "October", jobPostings: 500, talentSearches: 380, activeUsers: 320 },
  { name: "November", jobPostings: 550, talentSearches: 420, activeUsers: 350 },
  { name: "December", jobPostings: 600, talentSearches: 460, activeUsers: 380 },
];

export const getMarketTrends = async (req, res) => {
  try {
    let trends = await MarketTrends.find({});

    if (trends.length === 0) {
      // Seed data if empty
      await MarketTrends.insertMany(initialData);
      trends = await MarketTrends.find({});
    }

    res.status(200).json(trends);
  } catch (error) {
    console.error("Error fetching market trends:", error);
    res.status(500).json({ error: "Failed to fetch market trends data" });
  }
};
