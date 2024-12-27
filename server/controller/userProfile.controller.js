import { Candidate, CandidateUserProfile, Recruiter, RecruiterUserProfile } from "../db/database.js";

// Create a new user profile
export const createCandidateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      skills,
      experience,
      education,
      location,
      preferences,
      about,
      socialLinks,
    } = req.body;

    // Create a new user profile
    const userProfile = new CandidateUserProfile({
      name,
      email,
      password, 
      role,
      skills,
      experience,
      education,
      location,
      preferences,
      about,
      socialLinks,
    });

    // Save to database
    await userProfile.save();
    res.status(201).json({ message: "User profile created successfully", userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user profile", error: error.message });
  }
};

// Get a user profile by email
export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ email: req.params.email });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile", error: error.message });
  }
};

// Update a user profile by email
export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const userProfile = await UserProfile.findOneAndUpdate(
      { email: req.params.email },
      { $set: updates, $currentDate: { updatedAt: true } },
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json({ message: "User profile updated successfully", userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user profile", error: error.message });
  }
};

// Delete a user profile by email
export const deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndDelete({ email: req.params.email });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user profile", error: error.message });
  }
};

// Get Candidate Profile by ID
export const getCandidateProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const candidate = await Candidate.findById(userId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      success: true,
      profile: candidate,
    });
  } catch (err) {
    console.error("Error fetching candidate profile:", err);
    res.status(500).json({ message: "Failed to fetch candidate profile" });
  }
};

// Update Candidate Profile
export const updateCandidateProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    name,
    email,
    profilePicture,
    skills,
    experience,
    education,
    location,
    preferences,
    about,
    socialLinks,
    portfolio,
    certifications,
    languages,
    awards,
    availabilityStatus,
    resume,
    volunteerExperience,
    workEnvironment,
  } = req.body;

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        profilePicture,
        skills,
        experience,
        education,
        location,
        preferences,
        about,
        socialLinks,
        portfolio,
        certifications,
        languages,
        awards,
        availabilityStatus,
        resume,
        volunteerExperience,
        workEnvironment,
      },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      success: true,
      message: "Candidate profile updated successfully",
      profile: updatedCandidate,
    });
  } catch (err) {
    console.error("Error updating candidate profile:", err);
    res.status(500).json({ message: "Failed to update candidate profile" });
  }
};

// Controller function to create a new recruiter profile
export const createRecruiterProfile = async (req, res) => {
  try {
    // Create a new recruiter profile from the request body
    const newRecruiterProfile = new RecruiterUserProfile({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profilePicture: req.body.profilePicture,
      companyOverview: req.body.companyOverview,
      jobListings: req.body.jobListings,
      teamMembers: req.body.teamMembers,
      recruitmentProcess: req.body.recruitmentProcess,
      companyLogo: req.body.companyLogo,
      companyLocation: req.body.companyLocation,
      companyBenefits: req.body.companyBenefits,
      pastHires: req.body.pastHires
    });

    // Save the new recruiter profile to the database
    const savedProfile = await newRecruiterProfile.save();

    // Send success response with the saved recruiter profile
    res.status(201).json({
      message: 'Recruiter profile created successfully!',
      recruiterProfile: savedProfile
    });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ message: 'Server error, could not create recruiter profile.' });
  }
};


// Get Recruiter Profile by ID
export const getRecruiterProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const recruiter = await Recruiter.findById(userId);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({
      success: true,
      profile: recruiter,
    });
  } catch (err) {
    console.error("Error fetching recruiter profile:", err);
    res.status(500).json({ message: "Failed to fetch recruiter profile" });
  }
};

// Update Recruiter Profile
export const updateRecruiterProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    name,
    email,
    profilePicture,
    companyOverview,
    jobListings,
    teamMembers,
    recruitmentProcess,
    companyLogo,
    companyLocation,
    companyBenefits,
  } = req.body;

  try {
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        profilePicture,
        companyOverview,
        jobListings,
        teamMembers,
        recruitmentProcess,
        companyLogo,
        companyLocation,
        companyBenefits,
      },
      { new: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recruiter profile updated successfully",
      profile: updatedRecruiter,
    });
  } catch (err) {
    console.error("Error updating recruiter profile:", err);
    res.status(500).json({ message: "Failed to update recruiter profile" });
  }
};
