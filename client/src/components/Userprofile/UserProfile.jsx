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

  const onTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const {
    data: fetchedProfileData,
    loading,
    error,
  } = useFetchData(
    `${PORT_CLIENT}/api/users/profile/account/user/profile/${loggedInUser?.email}`
  );

  useEffect(() => {
    if (fetchedProfileData) {
      const userRole = fetchedProfileData?.recruiterProfile
        ? "recruiter"
        : "candidate";
      setUserRole(userRole);
      if (userRole === "recruiter") {
        setProfileData(fetchedProfileData.recruiterProfile);
      } else {
        setProfileData(fetchedProfileData.candidateProfile);
      }
    }
  }, [fetchedProfileData]);

  const calculateProfileCompletion = (user, role) => {
    let filledFields = 0;
    let totalFields = role === "candidate" ? 22 : 16;

    if (role === "candidate") {
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

  useEffect(() => {
    if (profileData && userRole) {
      const completion = calculateProfileCompletion(profileData, userRole);
      setProfileCompletion(completion);
    }
  }, [profileData, userRole]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!profileData) return <div>No profile data available</div>;

  return (
    <div className="profile-page-container p-6 bg-gray-100 min-h-screen">
      <ProfileHeader
        user={profileData}
        profileCompletion={profileCompletion}
        userRole={userRole}
      />

      <ProfileTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        userRole={userRole}
      />
   
      <div className="profile-content-container mt-6">
  {activeTab === "about" && (
    <section className="profile-about-section p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">About</h2>
      <div className="mt-4 space-y-4">
        {userRole === "recruiter" && (
          <>
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
                className="text-blue-600"
              >
                {profileData?.companyOverview?.website ||
                  "No website provided"}
              </a>
            </div>
          </>
        )}

        {userRole === "candidate" && (
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
              }`}</p>
            </div>
          </>
        )}
      </div>
    </section>
  )}

  {(userRole === "recruiter" || userRole === "candidate") && activeTab === "settings" && (
    <section className="profile-settings-section p-6 bg-white rounded-lg shadow-md">
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

    </div>
  );
};

export default UserProfile;
