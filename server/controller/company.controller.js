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
  const {
    name,
    email,
    ph_no,
    skills,
    experience,
    location,
    resume,
    portfolio,
    availability,
    about,
    profile_Img,
  } = req.body;

  try {
    const newTalent = new HireTalentCollection({
      name,
      email,
      ph_no,
      skills,
      experience,
      location,
      resume,
      portfolio,
      availability,
      about,
      profile_Img,
    });

    await newTalent.save();
    res
      .status(201)
      .json({ message: "Talent card created successfully", hiring: true });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Failed to create talent card. Please try again later." });
  }
};

// Function to fetch all data (both Add Opportunity and Hire Talent)
export const allData = async (req, res) => {
  try {
    const opportunities = await AddOpportunityCollection.find();
    const talents = await HireTalentCollection.find();

    res.json({ opportunities, talents });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "Failed to fetch data. Please try again later." });
  }
};


