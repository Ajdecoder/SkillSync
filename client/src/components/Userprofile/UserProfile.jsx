import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import axios from "axios";
import { PORT_CLIENT } from "../../commonClient";
import useFetchData from "../hooks/useGetDataFetch";

export const UserProfile = () => {
  const [tab, setTab] = useState("about");
  const [profileRole, setProfileRole] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const { loggedInUser } = useAuth(); // Assuming useAuth provides loggedInUser info
  const navigate = useNavigate();

  // Handle tab click
  const handleTabClick = (val) => {
    setTab(val);
  };

  // Function to calculate profile completion for both candidate and recruiter
  const calculateProfileCompletion = (user, role) => {
    let filledFields = 0;
    let totalFields = 0;

    if (role === "candidate") {
      totalFields = 22; // Candidate needs to fill 22 fields (updated according to schema)

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
      totalFields = 16; // Recruiter needs to fill 16 fields (updated according to schema)

      // Check if fields are filled for recruiter
      if (user?.name) filledFields++;
      if (user?.email) filledFields++;
      if (user?.profilePicture) filledFields++;
      if (user?.companyOverview?.name) filledFields++;
      if (user?.companyOverview?.description) filledFields++;
      if (user?.jobListings?.length > 0) filledFields++; // At least one job listing
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

    // Calculate percentage
    return Math.floor((filledFields / totalFields) * 100);
  };

  // Set profile role and calculate profile completion when loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      setProfileRole(loggedInUser?.role);
      const completion = calculateProfileCompletion(
        loggedInUser,
        loggedInUser?.role
      );
      setProfileCompletion(completion);
    }
  }, [loggedInUser]);

  const { data: GetProfileData } = useFetchData(
    `${PORT_CLIENT}/api/users/profile/account/user/profile/${loggedInUser?.email}`
  );
  
  useEffect(() => {
    if (GetProfileData) {
      // Check role and set appropriate profile data
      if (profileRole === "recruiter") {
        setProfileData(GetProfileData.recruiterProfile);
      } else if (profileRole === "candidate") {
        setProfileData(GetProfileData.candidateProfile);
      }
    }
  }, [GetProfileData, profileRole]);

  console.log(profileData)
  
  

  return (
    <div className="profile-page-container p-6 bg-gray-100">
      {/* Header Section */}
      <ProfileHeader
        user={loggedInUser}
        profileCompletion={profileCompletion}
        profileRole={profileRole}
      />

      {/* Tabs for Navigation */}
      <ProfileTabs
        tab={tab}
        handleTabClick={handleTabClick}
        profileRole={profileRole}
      />

      {/* Content Section */}
      {tab === "about" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">About</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-bold">Name:</p>
              <p>{profileData?.name || "John Doe"}</p>
            </div>
            <div>
              <p className="font-bold">Email:</p>
              <p>{profileData?.email || "johndoe@gmail.com"}</p>
            </div>
            <div>
              <p className="font-bold">Bio:</p>
              <p>{profileData?.about || "No bio available"}</p>
            </div>
            <div>
              <p className="font-bold">Location:</p>
              <p>{`${profileData?.location?.city || "Unknown City"}, ${
                profileData?.location?.state || "Unknown State"
              }, ${profileData?.location?.country || "Unknown Country"}`}</p>
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
                  GitHub: {profileData?.socialLinks?.github || "Not provided"}
                </p>
                <p>
                  Portfolio:{" "}
                  {profileData?.socialLinks?.portfolio || "Not provided"}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {tab === "skills&exp" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Skills & Experience</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-bold">Skills:</p>
              <p>{profileData?.skills?.join(", ") || "No skills listed"}</p>
            </div>
            <div>
              <p className="font-bold">Experience:</p>
              <ul>
                {profileData?.experience?.map((exp, idx) => (
                  <li key={idx}>
                    {exp.role} at {exp.company} ({exp.duration})
                  </li>
                )) || "No experience listed"}
              </ul>
            </div>
            <div>
              <p className="font-bold">Education:</p>
              <ul>
                {profileData?.education?.map((edu, idx) => (
                  <li key={idx}>
                    {edu.degree} from {edu.institution} ({edu.year})
                  </li>
                )) || "No education listed"}
              </ul>
            </div>
          </div>
        </section>
      )}

      {profileRole === "candidate" && tab === "opportunity/jobs" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Opportunities/Jobs</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-bold">Looking For:</p>
              <p>{profileData?.preferences?.jobType || "Not specified"}</p>
            </div>
            <div>
              <p className="font-bold">Salary Range:</p>
              <p>
                {profileData?.preferences?.salaryRange
                  ? `${loggedInUser.preferences.salaryRange.min} - ${loggedInUser.preferences.salaryRange.max}`
                  : "Not specified"}
              </p>
            </div>
          </div>
        </section>
      )}

      {profileRole === "recruiter" && tab === "manage/jobs" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Manage Jobs</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-bold">Current Openings:</p>
              <ul>
                {profileData?.jobListings?.map((job, idx) => (
                  <li key={idx}>
                    {job.jobTitle} at {job.location} | {job.jobType}
                  </li>
                )) || "No job listings available"}
              </ul>
            </div>
            <div>
              <p className="font-bold">Post New Job:</p>
              <button
                onClick={() => navigate("/requirements/add-opportunity")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Post New Openings
              </button>
            </div>
          </div>
        </section>
      )}

      {tab === "settings" && (
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
    </div>
  );
};
