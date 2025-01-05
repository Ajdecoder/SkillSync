import React from "react";

const RecruiterProfileContent = ({ profileData, userRole, activeTab }) => {
  return (
    <>
      {/* Company Overview Tab */}
      {userRole === "recruiter" && activeTab === "company-overview" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Company Overview</h2>
          <div className="mt-6 space-y-6 text-gray-700">
            <div>
              <p className="font-semibold">Company Name:</p>
              <p>{profileData?.companyOverview?.name || "No company name provided"}</p>
            </div>
            <div>
              <p className="font-semibold">Company Description:</p>
              <p>{profileData?.companyOverview?.description || "No company description available"}</p>
            </div>
            <div>
              <p className="font-semibold">Website:</p>
              <a
                href={profileData?.companyOverview?.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {profileData?.companyOverview?.website || "No website provided"}
              </a>
            </div>
            <div>
              <p className="font-semibold">Social Links:</p>
              <div className="space-x-4">
                {profileData?.companyOverview?.socialLinks?.linkedin && (
                  <a
                    href={profileData?.companyOverview?.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {profileData?.companyOverview?.socialLinks?.twitter && (
                  <a
                    href={profileData?.companyOverview?.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Twitter
                  </a>
                )}
                {profileData?.companyOverview?.socialLinks?.facebook && (
                  <a
                    href={profileData?.companyOverview?.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold">Company Logo:</p>
              <img
                src={profileData?.companyLogo || "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg"}
                alt="Company Logo"
                className="w-32 h-32 object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>
        </section>
      )}

      {/* Job Listings */}
      {userRole === "recruiter" && activeTab === "jobListings" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Job Listings</h2>
          <div className="mt-6">
            <ul className="space-y-4">
              {profileData?.jobListings?.map((job, idx) => (
                <li key={idx} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="text-lg font-semibold">{job.jobTitle}</p>
                  <p className="text-sm text-gray-600">Location: {job.location} | Type: {job.jobType}</p>
                  <p className="mt-2">{job.description}</p>
                  <p className="mt-2">
                    <strong>Salary Range:</strong> {job.salaryRange ? `${job.salaryRange.min} - ${job.salaryRange.max}` : "Not specified"}
                  </p>
                  <p className="mt-2">
                    <strong>Application Deadline:</strong> {job.applicationDeadline ? new Date(job.applicationDeadline).toDateString() : "No deadline"}
                  </p>
                </li>
              )) || <p>No job listings available</p>}
            </ul>
          </div>
        </section>
      )}

      {/* Recruitment Process */}
      {userRole === "recruiter" && activeTab === "recruitmentProcess" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Recruitment Process</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <p>{profileData?.recruitmentProcess?.description || "No recruitment process description available"}</p>
            <p><strong>Timeline:</strong> {profileData?.recruitmentProcess?.timeline || "No timeline available"}</p>
            <div>
              <p className="font-semibold">Interview Stages:</p>
              <ul className="list-disc pl-6">
                {profileData?.recruitmentProcess?.interviewStages?.map((stage, idx) => (
                  <li key={idx}>{stage}</li>
                )) || "No interview stages listed"}
              </ul>
            </div>
            <div>
              <p className="font-semibold">Assessment Types:</p>
              <ul className="list-disc pl-6">
                {profileData?.recruitmentProcess?.assessmentTypes?.map((type, idx) => (
                  <li key={idx}>{type}</li>
                )) || "No assessment types listed"}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Team Members */}
      {userRole === "recruiter" && activeTab === "teamMembers" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Team Members</h2>
          <div className="mt-6">
            <ul className="space-y-4">
              {profileData?.teamMembers?.map((member, idx) => (
                <li key={idx} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="text-lg font-semibold">{member.name} - {member.teamMemberRole}</p>
                  <div className="space-x-4 mt-2">
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub
                    </a>
                  </div>
                </li>
              )) || "No team members listed"}
            </ul>
          </div>
        </section>
      )}

      {/* Company Benefits */}
      {userRole === "recruiter" && activeTab === "companyBenefits" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Company Benefits</h2>
          <div className="mt-6">
            <ul className="space-y-4">
              {profileData?.companyBenefits?.map((benefit, idx) => (
                <li key={idx} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p>{benefit.benefitType}: {benefit.description}</p>
                </li>
              )) || "No benefits listed"}
            </ul>
          </div>
        </section>
      )}

      {/* Past Hires */}
      {userRole === "recruiter" && activeTab === "pastHires" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Past Hires</h2>
          <div className="mt-6">
            <ul className="space-y-4">
              {profileData?.pastHires?.map((hire, idx) => (
                <li key={idx} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p>{hire.candidateName} for {hire.position} - {hire.status}</p>
                  <p><strong>Testimonial:</strong> {hire.testimonial}</p>
                </li>
              )) || "No past hires listed"}
            </ul>
          </div>
        </section>
      )}

      {/* Company Location */}
      {userRole === "recruiter" && activeTab === "companyLocation" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Company Location</h2>
          <p>{profileData?.companyLocation?.city}, {profileData?.companyLocation?.state}, {profileData?.companyLocation?.country}</p>
        </section>
      )}
    </>
  );
};

export default RecruiterProfileContent;
