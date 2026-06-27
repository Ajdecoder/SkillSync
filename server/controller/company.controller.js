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
    desc_Opportunity,
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
      desc_Opportunity,
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

    const page = parseInt(req.query.page) || 1; // Current page, default 1
    const limit = parseInt(req.query.limit) || 10; // Results per page, default 10
    const skip = (page - 1) * limit;

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


    if (req.query.skill) {
      const skillsArr = Array.isArray(req.query.skill)
        ? req.query.skill :
        [req.query.skill]
          .map(s => s.trim())
          .filter(s => s.length > 0);

      query["skills.skillName"] = {
        $in: skillsArr.map(s => new RegExp(`^${s}$`, "i"))
      };
    }



    console.log("Final query for MongoDB:", query);

    let Addedopportunities = await OpportunityCollection.find(query).populate("recruiterDetails").limit(limit).skip(skip).exec();
    const totalCount = await OpportunityCollection.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({ length: Addedopportunities.length, Addedopportunities, page, limit, totalCount, totalPages });
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
    const OpportunityId = req.params.id;


    const getOpportunityFromAddOpportunity =
      await OpportunityCollection.findById(OpportunityId).populate("recruiterDetails");


    if (!getOpportunityFromAddOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    res.status(200).json(getOpportunityFromAddOpportunity);
  } catch (error) {
    console.error("Error fetching Opportunity:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching the Opportunity.",
    });
  }
};


// controllers/opportunityController.js
export const updateOpportunity = async (req, res) => {
  try {
    const OpportunityId = req.query.id;
    const updatedData = req.body;

    const updatedOpportunity = await OpportunityCollection.findByIdAndUpdate(
      OpportunityId,
      updatedData,
      { new: true }
    );

    if (!updatedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found." });
    }

    res.status(200).json(updatedOpportunity);
    console.log("Opportunity updated successfully");
  } catch (error) {
    console.error("Error updating Opportunity:", error);
    res.status(500).json({ message: "Error updating Opportunity." });
  }
};


export const deleteOpportunity = async (req, res) => {
  try {
    const OpportunityId = req.params.id;
    const deletedOpportunity = await OpportunityCollection.findByIdAndDelete(OpportunityId);
    if (!deletedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found." });
    }
    res.status(200).json({ message: "Opportunity deleted successfully." });
  } catch (error) {
    console.error("Error deleting Opportunity:", error);
    res.status(500).json({ message: "Error deleting Opportunity." });
  }
}


export const addManyOpportunities = async (req, res) => {
  try {
    const { payload } = req.body;

    if (!Array.isArray(payload)) {
      return res.status(400).json({
        message: "Payload must be an array of opportunities.",
      });
    }

    if (payload.length === 0) {
      return res.status(400).json({
        message: "Payload cannot be empty.",
      });
    }

    if (payload.length > 1000) {
      return res.status(400).json({
        message: "Maximum 1000 opportunities allowed at once.",
      });
    }

    const allowedRequirementTypes = [
      "Full-Time",
      "Part-Time",
      "Contract",
      "Internship",
    ];

    const cleanText = (value) => {
      if (value === undefined || value === null) return undefined;
      return String(value).trim();
    };

    const cleanPhone = (value) => {
      if (!value) return undefined;
      return String(value).replace(/\D/g, "");
    };

    const cleanSalary = (value) => {
      if (value === undefined || value === null || value === "") return undefined;
      const num = Number(value);
      return Number.isFinite(num) && num >= 0 ? num : undefined;
    };

    const cleanSkills = (skills) => {
      if (!Array.isArray(skills)) return [];

      return skills
        .map((skill) => {
          if (typeof skill === "string") {
            return { skillName: cleanText(skill) };
          }

          return {
            skillName: cleanText(skill?.skillName),
          };
        })
        .filter((skill) => skill.skillName);
    };

    const validDocs = [];
    const rejectedRows = [];

    payload.forEach((item, index) => {
      const title = cleanText(item.title);
      const company_name = cleanText(item.company_name);
      const email = cleanText(item.email)?.toLowerCase();
      const ph_no = cleanPhone(item.ph_no);
      const requirement_type = cleanText(item.requirement_type);
      const location = cleanText(item.location)?.toLowerCase();

      const minSalary = cleanSalary(item.minSalary ?? item.salaryRange?.minSalary);
      const maxSalary = cleanSalary(item.maxSalary ?? item.salaryRange?.maxSalary);

      const errors = [];

      if (!title) errors.push("title is required");
      if (!company_name) errors.push("company_name is required");
      if (!email) errors.push("email is required");
      if (!requirement_type) errors.push("requirement_type is required");
      if (!item.recruiterDetails) errors.push("recruiterDetails is required");

      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("invalid email");
      }

      if (ph_no && !/^[0-9]{10}$/.test(ph_no)) {
        errors.push("invalid phone number");
      }

      if (
        requirement_type &&
        !allowedRequirementTypes.includes(requirement_type)
      ) {
        errors.push(
          "requirement_type must be Full-Time, Part-Time, Contract, or Internship"
        );
      }

      if (
        minSalary !== undefined &&
        maxSalary !== undefined &&
        minSalary > maxSalary
      ) {
        errors.push("minSalary cannot be greater than maxSalary");
      }

      if (errors.length > 0) {
        rejectedRows.push({
          index,
          errors,
          data: item,
        });

        return;
      }

      validDocs.push({
        title,
        desc_requirement: cleanText(item.desc_requirement),
        skills: cleanSkills(item.skills),

        company_name,
        company_website: cleanText(item.company_website),
        email,
        ph_no,

        requirement_type,
        location,

        salaryRange: {
          minSalary,
          maxSalary,
        },

        candidatesApplied: Array.isArray(item.candidatesApplied)
          ? item.candidatesApplied
          : [],

        company_logo: cleanText(item.company_logo),

        recruiterDetails: item.recruiterDetails,

        isActive:
          typeof item.isActive === "boolean"
            ? item.isActive
            : true,
      });
    });

    if (validDocs.length === 0) {
      return res.status(400).json({
        message: "No valid opportunities found.",
        received: payload.length,
        inserted: 0,
        rejected: rejectedRows.length,
        rejectedRows,
      });
    }

    const insertedDocs = await OpportunityCollection.insertMany(validDocs, {
      ordered: false,
      runValidators: true,
    });

    return res.status(201).json({
      message: "Opportunities inserted successfully.",
      received: payload.length,
      inserted: insertedDocs.length,
      rejected: rejectedRows.length,
      rejectedRows,
      ids: insertedDocs.map((doc) => doc._id),
    });
  } catch (err) {
    console.error("Bulk insert opportunity error:", err);

    return res.status(500).json({
      message: "Failed to add opportunities. Please try again later.",
      error: err.message,
    });
  }
};