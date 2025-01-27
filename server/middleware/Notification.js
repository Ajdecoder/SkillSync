import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";
import Notification from "../model/notification.js";

const notificationMiddleware = async (req, res, next) => {
  console.log("Received request to post job opportunity");

  try {
    
    console.log("printing req body=>",req.body);
    const { action, payload } = req.body;
    console.log("Action:", action);
    console.log("Payload:", payload);
    console.log("------------->",req.body);

    
    if (!payload || !payload.title || !payload.skills) {
      return res.status(400).json({ message: "Missing required fields in payload" });
    }

    
    if (action === "job_posted") {
      await notifyCandidates(payload);
    } else if (action === "job_applied") {
      await notifyRecruiter(payload);
    } else {
      console.log("Unknown action type");
      return res.status(400).json({ message: "Unknown action type" });
    }

    next(); 
  } catch (error) {
    console.error("Notification Middleware Error:", error);
    res.status(500).json({ message: "Error in notification middleware" });
  }
};


const notifyCandidates = async (payload) => {
  try {
    const candidates = await CandidateUserProfile.find({
      skills: { $in: payload.skills },
    });

    if (candidates.length === 0) {
      console.log("No candidates found matching the required skills.");
      return;
    }

    
    for (const candidate of candidates) {
      const message = `New Job Posted: ${payload.title}`;
      await sendNotification(candidate._id, message); 
    }
  } catch (error) {
    console.error("Error notifying candidates:", error);
  }
};


const notifyRecruiter = async (payload) => {
  try {
    const recruiter = await RecruiterUserProfile.findById(payload.recruiterId);
    if (!recruiter) {
      console.log("Recruiter not found.");
      return;
    }

    const message = `New Application for: ${payload.jobTitle}`;
    await sendNotification(recruiter._id, message); 
  } catch (error) {
    console.error("Error notifying recruiter:", error);
  }
};


const sendNotification = async (recipientId, message) => {
  try {
    if (!recipientId || !message) {
      console.log("Invalid recipient or message. Notification not sent.");
      return;
    }

    const notification = new Notification({
      recipient: recipientId,
      message,
    });

    console.log("Saving notification:", notification);

    await notification.save();

    console.log('Notification saved successfully');
  } catch (error) {
    console.error("Error saving notification:", error);
  }
};

export default notificationMiddleware;
