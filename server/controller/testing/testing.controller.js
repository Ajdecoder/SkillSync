import { CandidateUserProfile, OpportunityCollection } from "../../db/database.js";

// Controller to insert data into Opportunity
export const createOpportunity = async (req, res) => {
    try {
        const newOpportunity = new OpportunityCollection(req.body);
        const savedOpportunity = await newOpportunity.save();
        res.status(201).json(savedOpportunity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to insert data into User Profile
export const createUserProfile = async (req, res) => {
    try {
        const newUserProfile = new CandidateUserProfile(req.body);
        const savedUserProfile = await newUserProfile.save();
        res.status(201).json(savedUserProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};