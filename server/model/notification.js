import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"CandidateUserProfile"
      // required: true,
    },
    JobDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddOpportunity",
      // required: true,
    },
    message: {
      type: String,
      required: true, 
    },

    type: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
