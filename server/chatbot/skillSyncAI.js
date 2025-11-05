import { getUserProfile } from "./helpers/getUserProfile.js";
import { decideActionWithRole } from "./decisions/decideAction.js";
import { findJobs } from "./actions/findJobs.js";
import { findCandidates } from "./actions/findCandidates.js";
import generateAIResponse from "./actions/generateAIResponse.js";
import { extractSkillsFromMessage } from "./helpers/extractSkills.js";

export const skillSyncAI = async (req, res) => {
  try {
    const userMessage = req.body.text || "Hello!";
    console.log("Enquiry:-",userMessage)
    const userId = req.body.id;

    const userProfile = await getUserProfile(userId);
    // console.log(userProfile)

    const decision = await decideActionWithRole(userMessage, userProfile);

    let responseText = "";
    let skillsToReturn = userProfile?.skills?.map((s) => s.skillName || s) || [];

    if (decision.action === "find_jobs") {
      responseText = userProfile.role === "candidate" ? await findJobs(skillsToReturn) : decision.message;
    } else if (decision.action === "find_candidates") {
      if (userProfile.role === "recruiter") {
        const skills = decision.skills?.length ? decision.skills : await extractSkillsFromMessage(userMessage);
        skillsToReturn = skills;
        responseText = await findCandidates(skills);
      } else {
        responseText = decision.message;
      }
    } else {
      responseText = await generateAIResponse(userMessage);
    }

    console.log(responseText)

    res.status(200).json({ response: responseText, user_skills: skillsToReturn });
  } catch (err) {
    console.error("Agent error:", err);
    res.status(500).json({ error: "Agent failed", details: err.message || err });
  }
};
