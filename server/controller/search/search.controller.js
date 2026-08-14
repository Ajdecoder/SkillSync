import { OpportunityCollection, CandidateUserProfile } from "../../db/database.js";

export const searchAll = async (req, res) => {
  try {
    const { q = "" } = req.query;

    if (!q) {
      return res.status(200).json({ 
        success: true, 
        data: { talents: [], opportunities: [] } 
      });
    }

    const searchRegex = new RegExp(q, "i");

    // Search Talents (Candidates)
    const talents = await CandidateUserProfile.find({
      $or: [
        { name: searchRegex },
        { skills: searchRegex },
        { "experience.jobRole": searchRegex },
        { "location.city": searchRegex },
        { "preferences.careerInterests": searchRegex }
      ],
      role: "candidate"
    }).limit(20);

    // Search Opportunities
    const opportunities = await OpportunityCollection.find({
      isActive: true,
      $or: [
        { title: searchRegex },
        { desc_requirement: searchRegex },
        { "skills.skillName": searchRegex },
        { company_name: searchRegex },
        { location: searchRegex },
        { requirement_type: searchRegex }
      ]
    }).limit(20);

    return res.status(200).json({
      success: true,
      data: {
        talents,
        opportunities,
      },
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error during search" 
    });
  }
};
