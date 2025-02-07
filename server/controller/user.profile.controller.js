import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";
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
    const candidateProfile = await CandidateUserProfile.findById(id).populate(
      "candidateInfo"
    );
    if (candidateProfile) {
      return res.status(200).json({ profile: candidateProfile });
    }

    // Check recruiter profile
    const recruiterProfile = await RecruiterUserProfile.findById(id).populate(
      "recruiterInfo"
    );
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
    }).populate("candidateInfo");
    if (candidateProfile) {
      return res.status(200).json({ candidateProfile });
    }

    const recruiterProfile = await RecruiterUserProfile.findOne({
      email,
    }).populate("recruiterInfo");
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
    const updateData = req.body;

    // Check if the body contains data to update
    if (!Object.keys(updateData).length) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Update in both candidate and recruiter profiles
    const updatedCandidateProfile = await CandidateUserProfile.findOneAndUpdate(
      { email },
      updateData,
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
      updateData,
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
    const isBookmarked = profile.bookmarks.includes(post_id);

    if (isBookmarked) {
      // Remove bookmark
      profile.bookmarks = profile.bookmarks.filter(
        (id) => id.toString() !== post_id
      );
    } else {
      // Add bookmark
      profile.bookmarks.push(post_id);
    }

    await profile.save();
    res
      .status(200)
      .json({
        message: isBookmarked ? "Bookmark removed" : "Bookmark added",
        bookmarks: profile.bookmarks,
      });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Error updating bookmarks." });
  }
};

export const unbookmarkOpportunity = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, post_id } = req.body;

    console.log(userId, post_id);

    const profile = await CandidateUserProfile.findById(userId);
    if (!profile) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove the bookmarked opportunity
    profile.bookmarks = profile.bookmarks.filter(
      (bookmark) => bookmark.toString() !== post_id
    );

    // Save the updated profile
    await profile.save();

    res.status(200).json({
      message: "Opportunity unbookmarked successfully",
      bookmarks: profile.bookmarks,
    });

    console.log("Opportunity unbookmarked successfully");
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
    console.log(req.body);
    console.log(recruiterId, candidateId);
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

      await profile.save();

      res
        .status(200)
        .json({
          message: isTalentBookmarked
            ? "Talent unbookmarked"
            : "Talent bookmarked",
          bookmarkedTalents: profile.bookmarkedTalents,
        });

      console.log("Talent bookmarked successfully");
    }
  } catch (error) {
    console.error("Error bookmarking talent:", error);
    res.status(500).json({ message: "Error bookmarking talent." });
  }
};

export const unbookmarkTalents = async (req, res) => {
  try {
    const { recruiterId, candidateId } = req.body;
    console.log(recruiterId, candidateId);
    const profile = await RecruiterUserProfile.findById(recruiterId);
    if (!profile) {
      return res.status(404).json({ message: "User not found." });
    }
    profile.bookmarkedTalents = profile.bookmarkedTalents.filter(
      (id) => id.toString()!== candidateId
    );
    await profile.save();
    res.status(200).json({
      message: "Talent unbookmarked successfully",
      bookmarkedTalents: profile.bookmarkedTalents,
    });
    console.log("Talent unbookmarked successfully");
    } catch (error) {
    console.error("Error unbookmarking talent:", error);
    res.status(500).json({ message: "Error unbookmarking talent." });
    
    }
}