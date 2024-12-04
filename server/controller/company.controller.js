import {
  AddOpportunityCollection,
  HireTalentCollection,
} from "../db/database.js";

// Function to create a new "Add Opportunity" post (job posting by employers)
export const addOpportunity = async (req, res) => {
  const {
    title,
    company_name,
    company_website,
    email,
    ph_no,
    location,
    type,
    salaryRange,
    desc_requirement,
    address,
    cover_Img,
  } = req.body;

  try {
    const newOpportunity = new AddOpportunityCollection({
      title,
      company_name,
      company_website,
      email,
      ph_no,
      location,
      type,
      salaryRange,
      desc_requirement,
      address,
      cover_Img,
    });

    await newOpportunity.save();
    res
      .status(201)
      .json({ message: "Opportunity added successfully", required: true });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Failed to add opportunity. Please try again later." });
  }
};

// Function to create a new "Hire Talent" card (candidate profile by users)
export const hireTalent = async (req, res) => {
  console.log("req body", req.body);

  const {
    jobType,
    skills,
    availability,
    requirements,
    jobDescription,
    compensation,
    contactInfo,
    status,
  } = req.body;

  try {
    const newTalent = new HireTalentCollection({
      jobType,
      skills,
      availability,
      requirements,
      jobDescription,
      compensation,
      contactInfo,
      status,
    });

    await newTalent.save();
    res
      .status(201)
      .json({ message: "Talent card created successfully", hiring: true });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Failed to create talent card. Please try again later.",
    });
  }
};

// Function to fetch all data (both Add Opportunity and Hire Talent)
export const allTalentsData = async (req, res) => {
  try {
    const talents = await HireTalentCollection.find();

    res.json({ talents });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch talents. Please try again later." });
  }
};

export const allOpportunitiesData = async (req, res) => {
  try {
    const Addedopportunities = await AddOpportunityCollection.find();

    res.json({ Addedopportunities });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({
      message: "Failed to fetch addedopportunities. Please try again later.",
    });
  }
};

export const allRequirementsData = async (req, res) => {
  try {
    const Addedopportunities = await AddOpportunityCollection.find();
    const talents = await HireTalentCollection.find();

    res.status(200).json({
      Addedopportunities,talents
    })

  } catch (error) {}
};
