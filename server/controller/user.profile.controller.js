import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Get All Candidates
 */

export const getAllCandidateProfiles = async (req, res) => {
  try {
    const users = await CandidateUserProfile.find();
    res.status(200).json({ candidates: users });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get All Recruiters
 */

export const getAllRecruiterProfiles = async (req, res) => {
  try {
    const users = await RecruiterUserProfile.find();
    res.status(200).json({ recruiters: users });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get User Profile by Id
 */
export const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check candidate profile
    const candidateProfile = await CandidateUserProfile.findById(id).populate([
      "candidateInfo",
    ]);
    if (candidateProfile) {
      return res.status(200).json({ profile: candidateProfile });
    }

    // Check recruiter profile
    const recruiterProfile = await RecruiterUserProfile.findById(id).populate([
      "recruiterInfo",
    ]);
    if (recruiterProfile) {
      return res.status(200).json({ profile: recruiterProfile });
    }

    // User profile not found
    return res.status(404).json({ message: "User profile not found" });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

/**
 * Get User Profile by Email
 */
export const getUserProfileByEmail = async (req, res) => {
  
  try {
    const { email } = req.params;

    // Check both candidate and recruiter profiles
    const candidateProfile = await CandidateUserProfile.findOne({
      email,
    }).populate(["candidateInfo", "OpportunityBookmarks"]);
    if (candidateProfile) {
      return res.status(200).json({ candidateProfile });
    }

    const recruiterProfile = await RecruiterUserProfile.findOne({
      email,
    }).populate(["recruiterInfo", "bookmarkedTalents"]);
    if (recruiterProfile) {
      return res.status(200).json({ recruiterProfile });
    }

    return res.status(404).json({ message: "User profile not found" });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

/**
 * Update User Profile by Email
 */
export const updateUserProfileByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { data } = req.body;

    // Check if the body contains data to update
    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Update in both candidate and recruiter profiles
    const updatedCandidateProfile = await CandidateUserProfile.findOneAndUpdate(
      { email },
      data,
      { new: true }
    );
    if (updatedCandidateProfile) {
      return res.status(200).json({
        message: "Candidate profile updated successfully",
        updatedProfile: updatedCandidateProfile,
      });
    }

    const updatedRecruiterProfile = await RecruiterUserProfile.findOneAndUpdate(
      { email },
      data,
      { new: true }
    );
    if (updatedRecruiterProfile) {
      return res.status(200).json({
        message: "Recruiter profile updated successfully",
        updatedProfile: updatedRecruiterProfile,
      });
    }

    return res.status(404).json({ message: "User profile not found" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};

/**
 * Bookmark Opportunites
 */

export const bookmarkOpportunity = async (req, res) => {
  try {
    const { userId, post_id } = req.body;

    // Find the user
    const profile = await CandidateUserProfile.findById(userId);
    if (!profile) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the opportunity is already bookmarked
    const isBookmarked = profile.OpportunityBookmarks.includes(post_id);

    if (isBookmarked) {
      // Remove bookmark
      profile.OpportunityBookmarks = profile.OpportunityBookmarks.filter(
        (id) => id.toString() !== post_id
      );
    } else {
      // Add bookmark
      profile.OpportunityBookmarks.push(post_id);
    }

    await profile.save();
    res.status(200).json({
      message: isBookmarked ? "Bookmark removed" : "Bookmark added",
      bookmarks: profile.OpportunityBookmarks,
    });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Error updating bookmarks." });
  }
};

export const unbookmarkOpportunity = async (req, res) => {
  try {
    const { userId, post_id } = req.body;

    const profile = await CandidateUserProfile.findById(userId);
    if (!profile) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove the bookmarked opportunity
    profile.OpportunityBookmarks = profile.OpportunityBookmarks.filter(
      (bookmark) => bookmark.toString() !== post_id
    );

    // Save the updated profile
    await profile.save();

    res.status(200).json({
      message: "Opportunity unbookmarked successfully",
      OpportunityBookmarks: profile.OpportunityBookmarks,
    });
  } catch (error) {
    console.error("Error unbookmarking opportunity:", error);
    res.status(500).json({ message: "Error unbookmarking opportunity." });
  }
};

/**
 * Bookmark Talents
 */

export const bookmarkTalents = async (req, res) => {
  try {
    const { recruiterId, candidateId } = req.body;
    const profile = await RecruiterUserProfile.findById(recruiterId);

    if (!profile) {
      return res.status(404).json({ message: "User not found." });
    }

    const isTalentBookmarked = profile.bookmarkedTalents.includes(candidateId);

    if (isTalentBookmarked) {
      profile.bookmarkedTalents = profile.bookmarkedTalents.filter(
        (id) => id.toString() !== candidateId
      );
    } else {
      profile.bookmarkedTalents.push(candidateId);
    }

    await profile.save();

    res.status(200).json({
      message: isTalentBookmarked ? "Talent unbookmarked" : "Talent bookmarked",
      bookmarkedTalents: profile.bookmarkedTalents,
    });
  } catch (error) {
    console.error("Error bookmarking talent:", error);
    res.status(500).json({ message: "Error bookmarking talent." });
  }
};

export const unbookmarkTalents = async (req, res) => {
  try {
    const { recruiterId, candidateId } = req.body;
    const profile = await RecruiterUserProfile.findById(recruiterId);
    if (!profile) {
      return res.status(404).json({ message: "User not found." });
    }
    profile.bookmarkedTalents = profile.bookmarkedTalents.filter(
      (id) => id.toString() !== candidateId
    );
    await profile.save();
    res.status(200).json({
      message: "Talent unbookmarked successfully",
      bookmarkedTalents: profile.bookmarkedTalents,
    });
  } catch (error) {
    console.error("Error unbookmarking talent:", error);
    res.status(500).json({ message: "Error unbookmarking talent." });
  }
};

export const UploadProfilePicture = async (req, res) => {
  try {
    console.log("▶ UploadProfilePicture route hit");

    if (!req.file) {
      console.log(" No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.params.userId;
    const file = req.file;

    console.log(" File received:", file.originalname, "Size:", file.size, "Type:", file.mimetype);
    console.log("▶ User ID:", userId);

    // Create a write stream to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'SkillSync/profiles',
        resource_type: 'auto',
        transformation: [
          { width: 500, height: 500, crop: 'fill' },
          { quality: 'auto' }
        ]
      },
      async (error, result) => {
        if (error) {
          console.error(" Cloudinary upload error:", error);
          return res.status(500).json({ 
            message: "Error uploading to Cloudinary",
            error: error.message 
          });
        }

        console.log(" Cloudinary upload successful:", result.secure_url);

        try {
          // Try updating Candidate first
          let updatedUser = await CandidateUserProfile.findByIdAndUpdate(
            userId,
            { 
              profilePicture: result.secure_url,
              'profilePictureDetails': {
                publicId: result.public_id,
                url: result.secure_url
              }
            },
            { new: true }
          );

          // Fallback to Recruiter
          if (!updatedUser) {
            updatedUser = await RecruiterUserProfile.findByIdAndUpdate(
              userId,
              { 
                profilePicture: result.secure_url,
                'profilePictureDetails': {
                  publicId: result.public_id,
                  url: result.secure_url
                }
              },
              { new: true }
            );
          }

          if (!updatedUser) {
            console.log(" User not found");
            return res.status(404).json({ message: "User not found" });
          }

          console.log(" DB update successful");
          return res.status(200).json({
            message: "Image uploaded successfully",
            profilePicture: result.secure_url,
            user: updatedUser,
          });
        } catch (dbError) {
          console.error(" DB update error:", dbError);
          return res.status(500).json({ 
            message: "Error updating user profile",
            error: dbError.message 
          });
        }
      }
    );

    // Write the file buffer directly to the upload stream
    uploadStream.end(file.buffer);
  } catch (error) {
    console.error(" Server error during upload:", error);
    return res.status(500).json({ 
      message: "Server error during upload",
      error: error.message 
    });
  }
};

export const UploadCandidateResume = async (req, res) => {
  console.log("▶ UploadCandidateResume route hit");

  try {
    if (!req.file) {
      console.log(" No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.params.userId;
    const file = req.file;

    console.log(" File received:", file.originalname, "Size:", file.size, "Type:", file.mimetype);

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "SkillSync/resume",
        resource_type: "raw", // auto handles PDF correctly
        type: "upload",        // <— ensures it’s publicly accessible
        use_filename: true,
        unique_filename: false,
      },
      async (error, result) => {
        if (error) {
          console.error(" Cloudinary upload error:", error);
          return res.status(500).json({
            message: "Error uploading to Cloudinary",
            error: error.message,
          });
        }

        console.log(" Cloudinary upload successful:", result.secure_url);

        try {
          // Update Candidate record with resume URL and name
          let updatedUser = await CandidateUserProfile.findByIdAndUpdate(
            userId,
            {
              resume: result.secure_url,
              resumeFileName: file.originalname,
            },
            { new: true }
          );

          if (!updatedUser) {
            updatedUser = await RecruiterUserProfile.findByIdAndUpdate(
              userId,
              {
                resume: result.secure_url,
                resumeFileName: file.originalname,
              },
              { new: true }
            );
          }

          if (!updatedUser) {
            console.log(" User not found");
            return res.status(404).json({ message: "User not found" });
          }

          console.log(" DB update successful");
          return res.status(200).json({
            message: "Resume uploaded successfully",
            resumeUrl: result.secure_url,
            resumeFileName: file.originalname,
            user: updatedUser,
          });
        } catch (dbError) {
          console.error(" DB update error:", dbError);
          return res.status(500).json({
            message: "Error updating user profile",
            error: dbError.message,
          });
        }
      }
    );

    uploadStream.end(file.buffer);
  } catch (error) {
    console.error(" Server error during upload:", error);
    return res.status(500).json({
      message: "Server error during upload",
      error: error.message,
    });
  }
};

