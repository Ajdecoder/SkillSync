import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileById } from "../../../services/api";
import { motion } from "framer-motion";
import { Spinner } from "../../common/loadingSpinner/spinner";

export const ViewCandidateInfo = () => {
  const { candidateid } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidateProfile = async () => {
      try {
        const { data } = await getUserProfileById(candidateid)  ;
        setCandidate(data.profile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requirement details:", error);
        setLoading(false);
      }
    };

    fetchCandidateProfile();
  }, [candidateid]);

  if (loading) return <Spinner />;

  if (!candidate) return <div>No candidate data found.</div>;

  return (
    <div className="mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <img
          src={candidate.profilePicture}
          alt={`${candidate.name}'s profile`}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{candidate.name}</h2>
          <p className="text-gray-700 mb-4">{candidate.about}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Skills:</h3>
            <ul className="list-disc list-inside">
              {candidate.skills.map((skill, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Experience:</h3>
            {candidate.experience.map((exp, idx) => (
              <motion.div
                key={exp._id.$oid}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h4 className="font-semibold">
                  {exp.JobRole} at {exp.company}
                </h4>
                <p>{exp.duration}</p>
                <p>{exp.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Education:</h3>
            {candidate.education.map((edu, idx) => (
              <motion.div
                key={edu._id.$oid}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h4 className="font-semibold">
                  {edu.degree} from {edu.institution}
                </h4>
                <p>Year: {edu.year}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Location:</h3>
            <p>
              {candidate.location.city}, {candidate.location.state},{" "}
              {candidate.location.country}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Preferences:</h3>
            <p>
              Salary Range: ${candidate.preferences.salaryRange.min} - $
              {candidate.preferences.salaryRange.max}
            </p>
            <p>Job Type: {candidate.preferences.jobType}</p>
            <p>Industry: {candidate.preferences.industry}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Languages:</h3>
            {candidate.languages.map((lang, idx) => (
              <motion.p
                key={lang._id.$oid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                {lang.language} - {lang.proficiency}
              </motion.p>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Certifications:</h3>
            {candidate.certifications.map((cert, idx) => (
              <motion.div
                key={cert._id.$oid}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h4 className="font-semibold">{cert.name}</h4>
                <p>Issued by: {cert.issuingOrganization}</p>
                <p>
                  Date Issued:{" "}
                  {new Date(cert.dateIssued.$date).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Portfolio:</h3>
            {candidate.portfolio.map((project, idx) => (
              <motion.div
                key={project._id.$oid}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h4 className="font-semibold">{project.title}</h4>
                <p>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Project
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Awards:</h3>
            {candidate.awards.map((award, idx) => (
              <motion.div
                key={award._id.$oid}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h4 className="font-semibold">{award.awardName}</h4>
                <p>Issued by: {award.issuingOrganization}</p>
                <p>Date: {new Date(award.date.$date).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Volunteer Experience:</h3>
            {candidate.volunteerExperience.map((volunteer, idx) => (
              <motion.div
                key={volunteer._id.$oid}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h4 className="font-semibold">
                  {volunteer.volunteerRole} at {volunteer.organization}
                </h4>
                <p>{volunteer.duration}</p>
                <p>{volunteer.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Contact:</h3>
            <p>Email: {candidate.email}</p>
            <div className="flex gap-4">
              <a
                href={candidate.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                LinkedIn
              </a>
              <a
                href={candidate.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                GitHub
              </a>
              <a
                href={candidate.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
