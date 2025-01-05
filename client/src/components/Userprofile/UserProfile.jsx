import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import useFetchData from "../hooks/useGetDataFetch";
import CandidateProfileContent from "./CandidateProfileContent";
import RecruiterProfileContent from "./RecruiterProfileContent";
import { PORT_CLIENT } from "../../commonClient";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [userRole, setUserRole] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  // Handle tab change
  const onTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Fetch profile data based on loggedInUser's email
  const {
    data: fetchedProfileData,
    loading,
    error,
  } = useFetchData(
    `${PORT_CLIENT}/api/users/profile/account/user/profile/${loggedInUser?.email}`
  );

  // Debug log to check fetched data
  useEffect(() => {
    if (fetchedProfileData) {
      console.log("Fetched Profile Data:", fetchedProfileData); // Log the response to check
      const userRole = fetchedProfileData?.recruiterProfile
        ? "recruiter"
        : "candidate";
      setUserRole(userRole);

      // Set profile data based on role
      if (userRole === "recruiter") {
        setProfileData(fetchedProfileData.recruiterProfile);
      } else {
        setProfileData(fetchedProfileData.candidateProfile);
      }
    }
  }, [fetchedProfileData]);

  // Calculate profile completion for both candidate and recruiter
  const calculateProfileCompletion = (user, role) => {
    let filledFields = 0;
    let totalFields = 0;

    if (role === "candidate") {
      totalFields = 22; // Candidate needs to fill 22 fields
      // Check if fields are filled for candidate
      if (user?.name) filledFields++;
      if (user?.email) filledFields++;
      if (user?.profilePicture) filledFields++;
      if (user?.skills?.length > 0) filledFields++;
      if (user?.experience?.length > 0) filledFields++;
      if (user?.education?.length > 0) filledFields++;
      if (user?.location?.city) filledFields++;
      if (user?.preferences?.jobType) filledFields++;
      if (user?.preferences?.salaryRange?.min) filledFields++;
      if (user?.preferences?.salaryRange?.max) filledFields++;
      if (user?.about) filledFields++;
      if (user?.socialLinks?.linkedin) filledFields++;
      if (user?.portfolio?.length > 0) filledFields++;
      if (user?.certifications?.length > 0) filledFields++;
      if (user?.languages?.length > 0) filledFields++;
      if (user?.awards?.length > 0) filledFields++;
      if (user?.availabilityStatus !== undefined) filledFields++;
      if (user?.resume) filledFields++;
      if (user?.volunteerExperience?.length > 0) filledFields++;
      if (user?.workEnvironment) filledFields++;
    } else if (role === "recruiter") {
      totalFields = 16; // Recruiter needs to fill 16 fields
      // Add the checks for recruiter fields
      if (user?.name) filledFields++;
      if (user?.email) filledFields++;
      if (user?.profilePicture) filledFields++;
      if (user?.companyOverview?.name) filledFields++;
      if (user?.companyOverview?.description) filledFields++;
      if (user?.jobListings?.length > 0) filledFields++;
      if (user?.companyLocation?.city) filledFields++;
      if (user?.companyLocation?.state) filledFields++;
      if (user?.companyLocation?.country) filledFields++;
      if (user?.companyBenefits?.length > 0) filledFields++;
      if (user?.pastHires?.length > 0) filledFields++;
      if (user?.companyLogo) filledFields++;
      if (user?.recruitmentProcess?.description) filledFields++;
      if (user?.recruitmentProcess?.timeline) filledFields++;
      if (user?.recruitmentProcess?.interviewStages?.length > 0) filledFields++;
    }

    return Math.floor((filledFields / totalFields) * 100);
  };

  // Calculate profile completion whenever profile data or userRole changes
  useEffect(() => {
    if (profileData && userRole) {
      const completion = calculateProfileCompletion(profileData, userRole);
      setProfileCompletion(completion);
    }
  }, [profileData, userRole]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading spinner or message
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Handle errors
  }

  if (!profileData) {
    return <div>No profile data available</div>; // Fallback if profileData is undefined
  }

  return (
    <div className="profile-page-container p-6 bg-gray-100">
      {/* Header Section */}
      <ProfileHeader
        user={profileData}
        profileCompletion={profileCompletion}
        userRole={userRole}
      />

      {/* Tabs for Navigation */}
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        userRole={userRole}
      />

      {/* Content Section */}
      {activeTab === "about" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">About</h2>
          <div className="mt-4 space-y-4">
            {/* Display for both Recruiters and Candidates */}
            {userRole === "recruiter" && profileData && (
              <div>
                <div>
                  <p className="font-bold">Company Description:</p>
                  <p>
                    {profileData?.companyOverview?.description ||
                      "No description available"}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Company Website:</p>
                  <a
                    href={profileData?.companyOverview?.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileData?.companyOverview?.website ||
                      "No website provided"}
                  </a>
                </div>
              </div>
            )}

            {/* Display personal information for Candidates */}
            {userRole === "candidate" && profileData && (
              <>
                <div>
                  <p className="font-bold">Name:</p>
                  <p>{profileData?.name || "Name not provided"}</p>
                </div>
                <div>
                  <p className="font-bold">Email:</p>
                  <p>{profileData?.email || "Email not provided"}</p>
                </div>
                <div>
                  <p className="font-bold">Phone:</p>
                  <p>{profileData?.phone || "Phone not provided"}</p>
                </div>
                <div>
                  <p className="font-bold">Bio:</p>
                  <p>{profileData?.about || "No bio available"}</p>
                </div>
                <div>
                  <p className="font-bold">Languages</p>
                  {profileData?.languages?.map((lang, idx) => (
                    <div key={idx} className="flex">
                      <p>{lang.language || "No language"}</p>
                      <p>({lang.proficiency || "No proficiency"})</p>
                    </div>
                  )) || "No languages to show"}
                </div>
                <div>
                  <p className="font-bold">Location:</p>
                  <p>{`${profileData?.location?.city || "Unknown City"}, ${
                    profileData?.location?.state || "Unknown State"
                  }, ${
                    profileData?.location?.country || "Unknown Country"
                  }`}</p>
                </div>
                <div>
                  <p className="font-bold">Profile Picture:</p>
                  <img
                    src={
                      profileData?.profilePicture ||
                      "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg"
                    }
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
                {profileData?.socialLinks && (
                  <div>
                    <p className="font-bold">Social Links:</p>
                    <p>
                      LinkedIn:{" "}
                      {profileData?.socialLinks?.linkedin || "Not provided"}
                    </p>
                    <p>
                      GitHub:{" "}
                      {profileData?.socialLinks?.github || "Not provided"}
                    </p>
                    <p>
                      Portfolio:{" "}
                      {profileData?.socialLinks?.portfolio || "Not provided"}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Settings Tab */}
      {(userRole === "recruiter" || userRole === "candidate") &&
        activeTab === "settings" && (
          <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Settings</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-bold">Email Notifications:</p>
                <p>Enabled</p>
              </div>
              <div>
                <p className="font-bold">Dark Mode:</p>
                <p>Enabled</p>
              </div>
            </div>
          </section>
        )}

      {/* Content for candidate and recruiter */}
      {userRole === "candidate" && activeTab !== "about" && (
        <CandidateProfileContent
          userRole={userRole}
          activeTab={activeTab}
          profileData={profileData}
        />
      )}
      {userRole === "recruiter" && activeTab !== "about" && (
        <RecruiterProfileContent
          userRole={userRole}
          activeTab={activeTab}
          profileData={profileData}
        />
      )}
    </div>
  );
};

export default UserProfile;
