import React from "react";

export const UserProfile = () => {

  


  return (
    <>
      <div className="profile-page-container p-6 bg-gray-100">
        {/* Header Section */}
        <div className="profile-header flex items-center gap-6 p-4 bg-white rounded-lg shadow-md h-[10rem]">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
            alt="Profile"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-600">Job Seeker</p>
            <p className="text-sm text-gray-500">
              johndoe@gmail.com | +1234567890
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-48 h-2 bg-gray-200 rounded-full">
                <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">75% Complete</span>
            </div>
          </div>
        </div>

        {/* Tabs for Navigation */}
        <nav className="profile-tabs mt-6 flex gap-4 text-gray-600 p-[3rem]">
          <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-500 hover:text-white">
            About
          </button>
          <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-500 hover:text-white">
            Skills & Experience
          </button>
          <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-500 hover:text-white">
            Opportunities/Jobs
          </button>
          <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-500 hover:text-white">
            Settings
          </button>
        </nav>

        {/* Content Section */}
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          {/* Dynamic Content based on Tab */}
          <h2 className="text-xl font-semibold">About</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-bold">Name:</p>
              <p>John Doe</p>
            </div>
            <div>
              <p className="font-bold">Email:</p>
              <p>johndoe@gmail.com</p>
            </div>
            <div>
              <p className="font-bold">Bio:</p>
              <p>
                Passionate front-end developer skilled in React, JavaScript, and
                Tailwind CSS.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
