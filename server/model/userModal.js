import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
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
});

const Company = mongoose.model('Company', companySchema);

export default Company;
