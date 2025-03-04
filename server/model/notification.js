import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"RecruiterUserProfile"
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
    relatedJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobListing",
    },
    relatedApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
