import React from "react";

const CandidateProfileContent = ({ user }) => {
  return (
    <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
      {/* About Section */}
      <h2 className="text-xl font-semibold">About</h2>
      <p>{user?.about || "No bio available"}</p>

      {/* Skills Section */}
      <div className="mt-4">
        <p className="font-bold">Skills:</p>
        <ul>{user?.skills?.map((skill, idx) => <li key={idx}>{skill}</li>) || "No skills listed"}</ul>
      </div>

      {/* Experience Section */}
      <div className="mt-4">
        <p className="font-bold">Experience:</p>
        <ul>
          {user?.experience?.map((exp, idx) => (
            <li key={idx}>
              <p>{exp.role} at {exp.company} ({exp.duration})</p>
              <p>{exp.description}</p>
            </li>
          )) || "No experience listed"}
        </ul>
      </div>

      {/* Education Section */}
      <div className="mt-4">
        <p className="font-bold">Education:</p>
        <ul>
          {user?.education?.map((edu, idx) => (
            <li key={idx}>
              <p>{edu.degree} from {edu.institution} ({edu.year})</p>
            </li>
          )) || "No education listed"}
        </ul>
      </div>

      {/* Preferences Section */}
      <div className="mt-4">
        <p className="font-bold">Preferences:</p>
        <p>Job Type: {user?.preferences?.jobType || "Not specified"}</p>
        <p>Industry: {user?.preferences?.industry || "Not specified"}</p>
        <p>Salary Range: {user?.preferences?.salaryRange ? `${user.preferences.salaryRange.min} - ${user.preferences.salaryRange.max}` : "Not specified"}</p>
      </div>

      {/* Social Links Section */}
      <div className="mt-4">
        <p className="font-bold">Social Links:</p>
        <ul>
          {user?.socialLinks?.linkedin && <li><a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
          {user?.socialLinks?.github && <li><a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
          {user?.socialLinks?.portfolio && <li><a href={user.socialLinks.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></li>}
        </ul>
      </div>

      {/* Portfolio Section */}
      <div className="mt-4">
        <p className="font-bold">Portfolio:</p>
        <ul>
          {user?.portfolio?.map((item, idx) => (
            <li key={idx}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a> - {item.description} ({item.dateCompleted ? item.dateCompleted : "Date not available"})
            </li>
          )) || "No portfolio items listed"}
        </ul>
      </div>

      {/* Certifications Section */}
      <div className="mt-4">
        <p className="font-bold">Certifications:</p>
        <ul>
          {user?.certifications?.map((cert, idx) => (
            <li key={idx}>
              <p>{cert.name} by {cert.issuingOrganization} ({cert.dateIssued})</p>
              <p>Expiry Date: {cert.expiryDate || "No expiry"}</p>
            </li>
          )) || "No certifications listed"}
        </ul>
      </div>

      {/* Languages Section */}
      <div className="mt-4">
        <p className="font-bold">Languages:</p>
        <ul>
          {user?.languages?.map((lang, idx) => (
            <li key={idx}>
              {lang.language} - {lang.proficiency}
            </li>
          )) || "No languages listed"}
        </ul>
      </div>

      {/* Awards Section */}
      <div className="mt-4">
        <p className="font-bold">Awards:</p>
        <ul>
          {user?.awards?.map((award, idx) => (
            <li key={idx}>
              {award.awardName} from {award.issuingOrganization} ({award.date})
            </li>
          )) || "No awards listed"}
        </ul>
      </div>

      {/* Availability Section */}
      <div className="mt-4">
        <p className="font-bold">Availability Status:</p>
        <p>{user?.availabilityStatus ? "Available" : "Not Available"}</p>
      </div>

      {/* Resume Section */}
      <div className="mt-4">
        <p className="font-bold">Resume:</p>
        {user?.resume ? (
          <a href={user.resume} target="_blank" rel="noopener noreferrer">Download Resume</a>
        ) : "No resume uploaded"}
      </div>
    </section>
  );
};

export default CandidateProfileContent;
