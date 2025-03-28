import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";
import Notification from "../model/notification.js";
import mongoose from "mongoose";

const notificationMiddleware = async (req, res, next) => {
  try {
    const { action, payload } = req.body;

    if (!payload || !action) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    if (action === "job_posted") {
      await notifyCandidatesForNewJob(payload);
    } else if (action === "job_applied") {
      await notifyRecruiterForNewApplication(payload);
    } else {
      console.error("Unknown action type:", action);
      return res.status(400).json({ message: "Unknown action type" });
    }

    next();
  } catch (error) {
    console.error("Notification Middleware Error:", error);
    res.status(500).json({ message: "Error in notification middleware" });
  }
};

// Notify candidates when a new job is posted
const notifyCandidatesForNewJob = async (payload) => {
  try {
    const skillNames = payload.skills.map((skill) => skill.skillName);
    const candidates = await CandidateUserProfile.find({
      skills: { $in: skillNames },
    });

    if (candidates.length === 0) {
      console.log("No candidates found matching the required skills.");
      return;
    }

    for (const candidate of candidates) {
      const message = `New Job Posted: ${payload.title} at ${payload.company_name}.`;
      await sendNotificationToCandidate(payload.jobId, payload.recruiterDetails, message);
    }
  } catch (error) {
    console.error("Error notifying candidates:", error);
  }
};

// Send notification to candidates (update if exists, create if not)
const sendNotificationToCandidate = async (jobId, recruiterDetails, message) => {
  try {
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      console.error("Invalid job ID for notification:", jobId);
      return;
    }

    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    // Check if a notification already exists for this job and recipient
    const existingNotification = await Notification.findOne({
      recipient: recruiterDetails,
      JobDetails: jobObjectId,
      type: "job_posted",
    });

    if (existingNotification) {
      // Update the existing notification
      existingNotification.message = message;
      existingNotification.read = false; // Reset read status if needed
      await existingNotification.save();
      console.log("Notification updated for candidate.");
    } else {
      // Create a new notification
      await Notification.create({
        recipient: recruiterDetails,
        message,
        type: "job_posted",
        JobDetails: jobObjectId,
        read: false,
      });
      console.log("Notification successfully created for candidate with jobId", jobObjectId);
    }
  } catch (error) {
    console.error("Error sending notification to candidate:", error);
  }
};

// Notify recruiter when a candidate applies for a job
const notifyRecruiterForNewApplication = async (payload) => {
  try {
    if (!payload.recruiterId || !mongoose.Types.ObjectId.isValid(payload.recruiterId)) {
      console.error("Invalid recruiter ID in payload:", payload.recruiterId);
      return;
    }

    const recruiter = await RecruiterUserProfile.findById(payload.recruiterId);
    if (!recruiter) {
      console.error("Recruiter not found for ID:", payload.recruiterId);
      return;
    }

    const message = `New Application for: ${payload.jobTitle}`;
    await sendNotificationToRecruiter(recruiter._id, message, payload._id);
  } catch (error) {
    console.error("Error notifying recruiter:", error);
  }
};

// Send notification to recruiter
const sendNotificationToRecruiter = async (recruiterId, message, relatedApplicationId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(relatedApplicationId)) {
      console.error("Invalid application ID for notification:", relatedApplicationId);
      return;
    }

    await Notification.create({
      recipient: recruiterId,
      message,
      type: "application_received",
      relatedJob: null,
      relatedApplication: new mongoose.Types.ObjectId(relatedApplicationId),
      read: false,
    });

    console.log("Notification successfully created for recruiter.");
  } catch (error) {
    console.error("Error sending notification to recruiter:", error);
  }
};

export default notificationMiddleware;