import React from "react";

const RecruiterProfileContent = ({ user }) => {
  return (
    <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
      {/* Company Overview */}
      <h2 className="text-xl font-semibold">Company Overview</h2>
      <p><strong>Name:</strong> {user?.companyOverview?.name}</p>
      <p><strong>Description:</strong> {user?.companyOverview?.description}</p>
      <p><strong>Website:</strong> <a href={user?.companyOverview?.website} target="_blank" rel="noopener noreferrer">{user?.companyOverview?.website}</a></p>

      {/* Job Listings */}
      <div className="mt-4">
        <p className="font-bold">Job Listings:</p>
        <ul>
          {user?.jobListings?.map((job, idx) => (
            <li key={idx}>
              <p>{job.jobTitle} at {job.location} ({job.jobType})</p>
              <p>{job.description}</p>
              <p>Salary Range: {job.salaryRange ? `${job.salaryRange.min} - ${job.salaryRange.max}` : "Not specified"}</p>
              <p>Application Deadline: {job.applicationDeadline ? job.applicationDeadline.toDateString() : "No deadline"}</p>
            </li>
          )) || "No job listings available"}
        </ul>
      </div>

      {/* Recruitment Process */}
      <div className="mt-4">
        <p className="font-bold">Recruitment Process:</p>
        <p>{user?.recruitmentProcess?.description}</p>
        <p><strong>Timeline:</strong> {user?.recruitmentProcess?.timeline}</p>
        <p><strong>Interview Stages:</strong> {user?.recruitmentProcess?.interviewStages?.join(", ")}</p>
        <p><strong>Assessment Types:</strong> {user?.recruitmentProcess?.assessmentTypes?.join(", ")}</p>
      </div>

      {/* Team Members */}
      <div className="mt-4">
        <p className="font-bold">Team Members:</p>
        <ul>
          {user?.teamMembers?.map((member, idx) => (
            <li key={idx}>
              <p>{member.name} - {member.role}</p>
              <p><a href={member.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
              <p><a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </li>
          )) || "No team members listed"}
        </ul>
      </div>

      {/* Company Benefits */}
      <div className="mt-4">
        <p className="font-bold">Company Benefits:</p>
        <ul>
          {user?.companyBenefits?.map((benefit, idx) => (
            <li key={idx}>
              <p>{benefit.benefitType}: {benefit.description}</p>
            </li>
          )) || "No benefits listed"}
        </ul>
      </div>

      {/* Past Hires */}
      <div className="mt-4">
        <p className="font-bold">Past Hires:</p>
        <ul>
          {user?.pastHires?.map((hire, idx) => (
            <li key={idx}>
              <p>{hire.candidateName} for {hire.position} - {hire.status}</p>
              <p>Testimonial: {hire.testimonial}</p>
            </li>
          )) || "No past hires listed"}
        </ul>
      </div>

      {/* Company Location */}
      <div className="mt-4">
        <p className="font-bold">Company Location:</p>
        <p>{user?.companyLocation?.city}, {user?.companyLocation?.state}, {user?.companyLocation?.country}</p>
      </div>

      {/* Company Logo */}
      <div className="mt-4">
        <p className="font-bold">Company Logo:</p>
        {user?.companyLogo ? <img src={user.companyLogo} alt="Company Logo" className="w-24 h-24" /> : "No logo uploaded"}
      </div>
    </section>
  );
};

export default RecruiterProfileContent;
