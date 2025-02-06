import {
  OpportunityCollection,
  Bookmars
} from "../db/database.js";

export const addOpportunity = async (req, res) => {
 
  const {payload} = req.body;
  console.log("payload ==============================>",payload);
  
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
  } = payload;

  try {
    const newOpportunity = new OpportunityCollection({
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
      // recruiterDetails
    });

    await newOpportunity.save();
    res.status(201).json({ message: "Opportunity added successfully." });
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
    console.log("updatedData",updatedData);
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




