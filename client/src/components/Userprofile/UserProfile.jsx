import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import useFetchData from "../hooks/useGetDataFetch";
import CandidateProfileContent from "./CandidateProfileContent";
import RecruiterProfileContent from "./RecruiterProfileContent";
import { PORT_CLIENT } from "../../commonClient";
import { Spinner } from "../common/loadingSpinner/spinner";
import { CandidateAboutSection } from "./Candidate/AboutSection";
import { RecruiterAboutSection } from "./Recruiter/AboutSection";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [userRole, setUserRole] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { loggedInUser, googleUser } = useAuth();
  const navigate = useNavigate();

  const onTabChange = (tabName) => setActiveTab(tabName);

  const currentUser = loggedInUser || googleUser;

  // Fetch profile data (always executed, avoiding conditional hook calls)
  const {
    data: fetchedProfileData,
    loading,
    error,
  } = useFetchData(
    `${PORT_CLIENT}/api/user/profile/account/user/email/${currentUser?.email}`
  );

  console.log("Fetched Profile Data:", fetchedProfileData);

  // If user is not logged in, navigate and return null (ensuring hooks run first)
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const calculateProfileCompletion = (user, role) => {
    let filledFields = 0;
    const totalFields = role === "candidate" ? 22 : 16;

    if (role === "candidate") {
      const candidateFields = [
        user?.name,
        user?.email,
        user?.profilePicture,
        user?.skills?.length > 0,
        user?.experience?.length > 0,
        user?.education?.length > 0,
        user?.location?.city,
        user?.preferences?.jobType,
        user?.preferences?.salaryRange?.min,
        user?.preferences?.salaryRange?.max,
        user?.about,
        user?.socialLinks?.linkedin,
        user?.portfolio?.length > 0,
        user?.certifications?.length > 0,
        user?.languages?.length > 0,
        user?.awards?.length > 0,
        user?.availabilityStatus !== undefined,
        user?.resume,
        user?.volunteerExperience?.length > 0,
        user?.workEnvironment,
      ];
      filledFields = candidateFields.filter(Boolean).length;
    } else if (role === "recruiter") {
      const recruiterFields = [
        user?.name,
        user?.email,
        user?.profilePicture,
        user?.companyOverview?.name,
        user?.companyOverview?.description,
        user?.companyOverview?.website,
        user?.jobListings?.length > 0,
        user?.companyLocation?.city,
        user?.companyLocation?.state,
        user?.companyLocation?.country,
        user?.companyBenefits?.length > 0,
        user?.pastHires?.length > 0,
        user?.companyLogo,
        user?.recruitmentProcess?.description,
        user?.recruitmentProcess?.timeline,
        user?.recruitmentProcess?.interviewStages?.length > 0,
      ];
      filledFields = recruiterFields.filter(Boolean).length;
    }

    return Math.floor((filledFields / totalFields) * 100);
  };

  useEffect(() => {
    if (fetchedProfileData) {
      const role = fetchedProfileData?.recruiterProfile
        ? "recruiter"
        : "candidate";
      setUserRole(role);

      const data =
        role === "recruiter"
          ? fetchedProfileData.recruiterProfile
          : fetchedProfileData.candidateProfile;

      setProfileData(data);
      setProfileCompletion(calculateProfileCompletion(data, role));
    }
  }, [fetchedProfileData]);

  // Manage theme and notification settings in localStorage
  useEffect(() => {
    const savedEmailNotifications = localStorage.getItem("emailNotifications");
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedEmailNotifications !== null) {
      setEmailNotifications(JSON.parse(savedEmailNotifications));
    }
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    localStorage.setItem(
      "emailNotifications",
      JSON.stringify(emailNotifications)
    );
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [emailNotifications, darkMode]);

 if (loading) return <Spinner />;
if (error) return <div className="error-message">Error: {error.message}</div>;
if (!profileData) return null; // Or just a placeholder


  return (
    <div>
      <div className="profile-page-container p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
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
              <h2 className="text-xl font-semibold dark:text-black">About</h2>
              <div className="mt-4 space-y-4">
                <RecruiterAboutSection
                  profileData={profileData}
                  userRole={userRole}
                />
                <CandidateAboutSection
                  profileData={profileData}
                  userRole={userRole}
                />
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
    </div>
  );
};

export default UserProfile;
