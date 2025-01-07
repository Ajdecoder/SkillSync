import React from "react";
import { useNavigate } from "react-router-dom";

const CandidateProfileContent = ({profileData, activeTab, userRole }) => {

    const navigate = useNavigate()

  return (
    <>
      {activeTab === "skillsAndExperience" && (
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
                    {exp.JobRole} at {exp.company} ({exp.duration})
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
            <div>
              <p className="font-bold">Volunteer Experience:</p>
              <ul>
                {profileData?.volunteerExperience?.length > 0 ? (
                  profileData.volunteerExperience.map((volunteer, idx) => (
                    <li key={idx}>
                      <p>
                        <strong>Organization:</strong> {volunteer.organization}
                      </p>
                      <p>
                        <strong>Role:</strong> {volunteer.volunteerRole}
                      </p>
                      <p>
                        <strong>Duration:</strong> {volunteer.duration}
                      </p>
                      <p>
                        <strong>Description:</strong> {volunteer.description}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No Volunteer Experience listed</p>
                )}
              </ul>
            </div>
          </div>
        </section>
      )}

      {userRole === "candidate" && activeTab === "jobOpportunities" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Job Opportunities</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-bold">Looking For:</p>
              <p>{profileData?.preferences?.jobType || "Not specified"}</p>
            </div>
            <div>
              <p className="font-bold">Salary Range:</p>
              <p>
                {profileData?.preferences?.salaryRange
                  ? `${profileData?.preferences.salaryRange.min} - ${profileData?.preferences.salaryRange.max}`
                  : "Not specified"}
              </p>
            </div>
          </div>
        </section>
      )}

      {userRole === "recruiter" && activeTab === "manageJobListings" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Manage Job Listings</h2>
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

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Portfolio</h2>
          <div className="mt-4 space-y-4">
            {profileData?.portfolio?.length > 0 ? (
              profileData.portfolio.map((portfolioItem, idx) => (
                <div key={idx}>
                  <p>{portfolioItem.projectName}</p>
                  <p>
                    <a href={portfolioItem.link}>{portfolioItem.link}</a>
                  </p>
                </div>
              ))
            ) : (
              <p>No portfolio available</p>
            )}
          </div>
        </section>
      )}

      {/* Certifications Tab */}
      {activeTab === "certifications" && (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <div className="mt-4 space-y-4">
            <ul>
              {profileData?.certifications?.map((cert, idx) => (
                <li key={idx}>
                  {cert.name} from {cert.issuingOrganization} (
                  {new Date(cert.dateIssued).toLocaleDateString()})
                </li>
              )) || "No certifications listed"}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default CandidateProfileContent;
