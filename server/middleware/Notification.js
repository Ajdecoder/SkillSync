import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";
import Notification from "../model/notification.js";

// ✅ Middleware to handle notifications
const notificationMiddleware = async (req, res, next) => {
  console.log("Received request for notification middleware");

  try {
    console.log("Printing req body =>", req.body);
    const { action, payload } = req.body;

    if (!payload || !payload.title) {
      return res.status(400).json({ message: "Missing required fields in payload" });
    }

    // ✅ Determine action type and trigger appropriate notifications
    if (action === "job_posted") {
      await notifyCandidatesForNewJob(payload);
    } else if (action === "job_applied") {
      await notifyRecruiterForNewApplication(payload);
    } else {
      console.log("Unknown action type");
      return res.status(400).json({ message: "Unknown action type" });
    }

    next(); // Move to the next middleware
  } catch (error) {
    console.error("Notification Middleware Error:", error);
    res.status(500).json({ message: "Error in notification middleware" });
  }
};

// ✅ Notify candidates when a new job is posted
const notifyCandidatesForNewJob = async (payload) => {
  try {
    if (!Array.isArray(payload.skills)) {
      throw new Error("Invalid skills format in payload");
    }

    const skillNames = payload.skills.map(skill => skill.skillName);

    // ✅ Find candidates who have at least one of the required skills
    const candidates = await CandidateUserProfile.find({
      "skills": { $in: skillNames },
    });

    if (candidates.length === 0) {
      console.log("No candidates found matching the required skills.");
      return;
    }

    // ✅ Send notifications to each candidate and store in the database
    for (const candidate of candidates) {
      const message = `New Job Posted: ${payload.title} at ${payload.company_name}.`;

      await sendNotificationToCandidate(candidate._id, message, payload._id);
    }
  } catch (error) {
    console.error("Error notifying candidates:", error);
  }
};

// ✅ Send notification to the candidate and save to the database
const sendNotificationToCandidate = async (candidateId, message, relatedJobId) => {
  try {
    // Create a new notification entry in the database
    await Notification.create({
      recipient: candidateId,
      message: message,
      type: "job_posted",
      relatedJob: relatedJobId,
      relatedApplication: null,
      read: false,
    });

    console.log(`Notification sent to candidate: ${message}`);
  } catch (error) {
    console.error("Error sending notification to candidate:", error);
  }
};

// ✅ Notify recruiter when a candidate applies for a job
const notifyRecruiterForNewApplication = async (payload) => {
  try {
    if (!payload.recruiterId) {
      console.log("Recruiter ID is missing in payload.");
      return;
    }

    const recruiter = await RecruiterUserProfile.findById(payload.recruiterId);
    if (!recruiter) {
      console.log("Recruiter not found.");
      return;
    }

    const message = `New Application for: ${payload.jobTitle}`;

    await sendNotificationToRecruiter(recruiter._id, message, payload._id);
  } catch (error) {
    console.error("Error notifying recruiter:", error);
  }
};

// ✅ Send notification to the recruiter and save to the database
const sendNotificationToRecruiter = async (recruiterId, message, relatedApplicationId) => {
  try {
    // Create a new notification entry in the database
    await Notification.create({
      recipient: recruiterId,
      message: message,
      type: "application_received",
      relatedJob: null,
      relatedApplication: relatedApplicationId,
      read: false,
    });

    console.log(`Notification sent to recruiter: ${message}`);
  } catch (error) {
    console.error("Error sending notification to recruiter:", error);
  }
};

export default notificationMiddleware;
