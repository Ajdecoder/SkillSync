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
  try {
    const Addedopportunities = await OpportunityCollection.find().populate(
      "candidatesApplied"
    ).populate("recruiterDetails");
    res.json({ Addedopportunities });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({
      message: "Failed to fetch addedopportunities. Please try again later.",
    });
  }
};

export const jobListeningsByRecruiter = async (req, res) => {
  try {
    const {recruiterId} = req.params;
    console.log("Running jobListeningsByRecruiter, Recruiter ID:", recruiterId);

    if (!recruiterId) {
      res.status(400).json({ message: "Recruiter ID is required" });
    }

    const Addedopportunities = await OpportunityCollection.find({
      recruiterDetails: recruiterId, // Ensure this matches your schema
    })
      .populate("candidatesApplied")
      .populate("recruiterDetails");

    console.log(Addedopportunities)

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


export const updateOpportunity = async (req, res) => {
  try {
    const RequirementId = req.params.id;
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
}

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




