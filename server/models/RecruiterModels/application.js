import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CandidateUserProfile',
    required: true,
  },
  jobListing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobListing',
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected'],
    default: 'Applied',
  },
  resume: {
    type: String,  // URL or file path to resume
  },
  coverLetter: {
    type: String,
  },
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
