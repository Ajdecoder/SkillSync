import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salaryRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],
}, {
  timestamps: true,
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

export default JobListing;
