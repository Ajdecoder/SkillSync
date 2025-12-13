import {
  OpportunityCollection,
  Bookmars
} from "../db/database.js";

export const addOpportunity = async (req, res) => {


  const { payload } = req.body;

  const {
    title,
    company_name,
    company_website,
    email,
    ph_no,
    location,
    maxSalary,
    minSalary,
    desc_requirement,
    skills,
    requirement_type,
    recruiterDetails,
  } = payload;



  try {
    const newOpportunity = new OpportunityCollection({
      title,
      company_name,
      company_website,
      email,
      ph_no,
      location,
      salaryRange: {
        minSalary,
        maxSalary
      },
      desc_requirement,
      skills,
      requirement_type,
      recruiterDetails
    });

    await newOpportunity.save();
    res.status(201).json({ message: "Opportunity added successfully.", id: newOpportunity._id });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Failed to add opportunity. Please try again later." });
  }
};

export const allOpportunitiesData = async (req, res) => {

  console.log("Query params:", req.query);

  try {
    // Initialize query object
    const query = {};

    // Handle minSalary filter
    if (req.query.minSalary) {
      query["salaryRange.maxSalary"] = { $gte: Number(req.query.minSalary) };
    }

    // Handle maxSalary filter
    if (req.query.maxSalary) {
      query["salaryRange.minSalary"] = { $lte: Number(req.query.maxSalary) };
    }

    if (req.query.requirement_type) {
      query["requirement_type"] = req.query.requirement_type;
    }

    if (req.query.location) {
      const locations = Array.isArray(req.query.location)
        ? req.query.location
        : [req.query.location];

      query["location"] = {
        $in: locations.map(loc => new RegExp(loc, "i"))
      };
    }


    if (req.query.skills) {
      const skillsArr = Array.isArray(req.query.skills)
        ? req.query.skills :
        [req.query.skills]
          .map(s => s.trim())
          .filter(s => s.length > 0);
      
      query["skills.skillName"] = {
        $in: skillsArr.map(s => new RegExp(`^${s}$`, "i"))
      };
    }



    console.log("Final query for MongoDB:", query);

    let Addedopportunities = await OpportunityCollection.find(query);

    res.json({ length: Addedopportunities.length, Addedopportunities });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({
      message: "Failed to fetch added opportunities. Please try again later.",
    });
  }
};



export const jobListeningsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    console.log("Running jobListeningsByRecruiter, Recruiter ID:", recruiterId);

    if (!recruiterId) {
      res.status(400).json({ message: "Recruiter ID is required" });
    }

    const Addedopportunities = await OpportunityCollection.find({
      recruiterDetails: recruiterId, // Ensure this matches your schema
    })
      .populate("candidatesApplied")
      .populate("recruiterDetails");


    res.status(200).json({ Addedopportunities });
  } catch (error) {
    console.error("Error fetching job listings:", error.message);
    res.status(500).json({
      message: "Failed to fetch job listings. Please try again later.",
    });
  }
};




export const getOpportunitytById = async (req, res) => {


  try {
    const RequirementId = req.params.id;


    const getRequirementFromAddOpportunity =
      await OpportunityCollection.findById(RequirementId).populate("recruiterDetails");;


    if (!getRequirementFromAddOpportunity) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    res.status(200).json(getRequirementFromAddOpportunity);
  } catch (error) {
    console.error("Error fetching requirement:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching the requirement.",
    });
  }
};


// controllers/opportunityController.js
export const updateOpportunity = async (req, res) => {
  try {
    const RequirementId = req.query.id; // 🔁 using query param
    const updatedData = req.body;

    const updatedRequirement = await OpportunityCollection.findByIdAndUpdate(
      RequirementId,
      updatedData,
      { new: true }
    );

    if (!updatedRequirement) {
      return res.status(404).json({ message: "Requirement not found." });
    }

    res.status(200).json(updatedRequirement);
    console.log("Requirement updated successfully");
  } catch (error) {
    console.error("Error updating requirement:", error);
    res.status(500).json({ message: "Error updating requirement." });
  }
};


export const deleteOpportunity = async (req, res) => {
  try {
    const RequirementId = req.params.id;
    const deletedRequirement = await OpportunityCollection.findByIdAndDelete(RequirementId);
    if (!deletedRequirement) {
      return res.status(404).json({ message: "Requirement not found." });
    }
    res.status(200).json({ message: "Requirement deleted successfully." });
  } catch (error) {
    console.error("Error deleting requirement:", error);
    res.status(500).json({ message: "Error deleting requirement." });
  }
}




