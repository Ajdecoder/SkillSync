import mongoose from "mongoose";

export const Requirement = new mongoose.Schema({
    company_name: { type: String, required: true },
    company_website: { type: String, required: true },
    email: { type: String, required: true },
    ph_no: { type: String, unique: true },
    available_expert: { type: [String] },
    from: { type: Date },
    to: { type: Date },
    desc_requirement: { type: String },
    address: { type: String },
    documents: { type: String },
    cover_Img: { type: String },
    Status: { type: String},
  });
  