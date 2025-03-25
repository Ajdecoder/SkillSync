import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const ProfileHeader = ({ user, profileCompletion, userRole }) => {

    const { user: auth0User, isAuthenticated, isLoading: isAuth0Loading, logout: auth0Logout } = useAuth0();


  return (
    <div className="profile-header flex items-center gap-6 p-4 bg-white rounded-lg shadow-md h-[10rem]">
      <img
        src={
          user?.profilePicture || user?.profile ||
          "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg"
        }
        alt="Profile"
        className="w-14 h-14 rounded-full"
      />
      <div>
        <h1 className="text-2xl font-bold">{user?.recruiterInfo?.name || "John Doe"}</h1>
        <p className="text-gray-600">
          
          {userRole === "candidate"
            ? "Job Seeker"
            : userRole === "recruiter"
            ? "Recruiter"
            : "Unknown"}
        </p>

        <p className="text-sm text-gray-500">
          {user?.email || "johndoe@gmail.com"} | {user?.phone || "+1234567890"}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="w-48 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">
            {profileCompletion}% Complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
