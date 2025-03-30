import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";
import Notification from "../model/notification.js";
import mongoose from "mongoose";

const notificationMiddleware = async (req, res, next) => {
  try {
    const { action, payload } = req.body;

    if (!payload || !action) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    switch (action) {
      case "job_posted":
        await notifyCandidatesForNewJob(payload);
        break;
      case "application_received":
        await notifyRecruiterForNewApplication(payload);
        break;
      default:
        console.error("Unknown action type:", action);
        return res.status(400).json({ message: "Unknown action type" });
    }

    next();
  } catch (error) {
    console.error("Notification Middleware Error:", error);
    res.status(500).json({ message: "Error in notification middleware" });
  }
};

const notifyCandidatesForNewJob = async (payload) => {
  try {
    const skillNames = payload.skills.map(skill => skill.skillName);
    const candidates = await CandidateUserProfile.find({
      skills: { $in: skillNames },
    });

    if (candidates.length === 0) {
      console.log("No matching candidates found.");
      return;
    }

    for (const candidate of candidates) {
      const message = `New Job Posted: ${payload.title} at ${payload.company_name}.`;
      await sendNotification(candidate._id, message, "job_posted", payload.jobId);
    }
  } catch (error) {
    console.error("Error notifying candidates:", error);
  }
};

const notifyRecruiterForNewApplication = async (payload) => {
  console.log(payload);
  try {
    if (!mongoose.Types.ObjectId.isValid(payload.recruiterId)) {
      console.error("Invalid recruiter ID:", payload.recruiterId);
      return;
    }
  
    const message = `New Application for: ${payload.jobTitle} by ${payload.candidateName}`;
    await sendNotification(payload.userId, message, "application_received", payload.recruiterId);
  } catch (error) {
    console.error("Error notifying recruiter:", error);
  }
};

const sendNotification = async (applicantId, message, type, relatedId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(relatedId)) {
      console.error("Invalid related ID for notification:", relatedId);
      return;
    }

    await Notification.create({
      applicant: applicantId,
      message,
      type,
      relatedId: new mongoose.Types.ObjectId(relatedId),
      read: false,
    });

    console.log(`Notification sent: ${type} to ${applicantId}`);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

export default notificationMiddleware;
