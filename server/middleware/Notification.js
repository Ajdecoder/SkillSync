import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";
import Notification from "../model/notification.js";

const notificationMiddleware = async (req, res, next) => {
  try {
    const { action, payload } = req.body;

    if (action === "job_posted") {
      await notifyCandidatesForNewJob(payload);
    } else if (action === "job_applied") {
      await notifyRecruiterForNewApplication(payload);
    } else {
      console.log("Unknown action type");
      return res.status(400).json({ message: "Unknown action type" });
    }
    next()
  } catch (error) {
    console.error("Notification Middleware Error:", error);
    res.status(500).json({ message: "Error in notification middleware" });
  }
};


const notifyCandidatesForNewJob = async (payload) => {
  
  console.log("payload ==============================>",payload);
  try {
    if (!Array.isArray(payload.skills)) {
      throw new Error("Invalid skills format in payload");
    }

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

      await sendNotificationToCandidate(candidate._id, message, payload._id);
    }
  } catch (error) {
    console.error("Error notifying candidates:", error);
  }
};


const sendNotificationToCandidate = async (
  candidateId,
  message,
  relatedJobId
) => {
  try {
    console.log("sssssssssssssss>>>>>>>>>>",candidateId, message,relatedJobId);
    await Notification.create({
      recipient: candidateId,
      message: message,
      type: "job_posted",
      relatedJob: relatedJobId,
      relatedApplication: null,
      read: false,
    });
  } catch (error) {
    console.error("Error sending notification to candidate:", error);
  }
};

const notifyRecruiterForNewApplication = async (payload) => {
  try {
    if (!payload.recruiterId) {
      console.log("Recruiter ID is missing in payload.");
      return;
    }

    const recruiter = await RecruiterUserProfile.findById(payload.recruiterId);
    console.log("printing value of id ", recruiter);
    console.log("printing value of payload ", payload);
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

const sendNotificationToRecruiter = async (
  recruiterId,
  message,
  relatedApplicationId
) => {
  try {
    await Notification.create({
      recipient: recruiterId,
      message: message,
      type: "application_received",
      relatedJob: null,
      relatedApplication: relatedApplicationId,
      read: false,
    });
  } catch (error) {
    console.error("Error sending notification to recruiter:", error);
  }
};

export default notificationMiddleware;
