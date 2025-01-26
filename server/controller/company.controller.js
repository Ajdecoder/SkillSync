import {
  OpportunityCollection,
  
} from "../db/database.js";

export const addOpportunity = async (req, res) => {
  const {
    title,
    company_name,
    company_website,
    email,
    address,
    ph_no,
    location,
    maxSalary,
    minSalary,
    desc_requirement,
    skills,
    requirement_type
  } = req.body;

  try {
    const newOpportunity = new OpportunityCollection({
      title,
      company_name,
      company_website,
      email,
      address,
      ph_no,
      location,
      maxSalary,
      minSalary,
      desc_requirement,
      address,
      skills,
      requirement_type
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
    );
    res.json({ Addedopportunities });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({
      message: "Failed to fetch addedopportunities. Please try again later.",
    });
  }
};



export const getRequirementById = async (req, res) => {
  try {
    const RequirementId = req.params.id;

    
    const getRequirementFromAddOpportunity =
      await OpportunityCollection.findById(RequirementId);


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

