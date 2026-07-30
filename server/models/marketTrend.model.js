import mongoose from "mongoose";

export const marketTrendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  jobPostings: {
    type: Number,
    required: true,
  },
  talentSearches: {
    type: Number,
    required: true,
  },
  activeUsers: {
    type: Number,
    required: true,
  },
});
