import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  bookmarkTalent,
  getUserProfileByEmail,
  getUserProfileById,
  removeBookmarkedTalent,
} from "../../../services/api";
import { motion } from "framer-motion";
import { Spinner } from "../../common/loadingSpinner/spinner";
import {
  FiBookmark,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import NotificationToasts from "../../chatbot/Toast/Toast";
import HireTalentModal from "../../Requirements/Recruiters/HireTalents/HireTalentModal";

export const ViewCandidateInfo = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [recruiterId, setRecruiterId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);
  const { loggedInUser } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");
  const [hiretalentModal, setHireTalentModal] = useState(false);

  // Fetch Candidate and Recruiter Profile
  useEffect(() => {
    const fetchCandidateProfile = async () => {
      try {
        const { data } = await getUserProfileById(candidateId);
        setCandidate({
          ...data.profile,
          skills: data.profile.skills.length
            ? data.profile.skills
            : ["No skills listed"],
          experience: data.profile.experience.length
            ? data.profile.experience
            : [
                {
                  JobRole: "No experience",
                  company: "N/A",
                  duration: "N/A",
                  description: "No experience details available.",
                },
              ],
          education: data.profile.education.length
            ? data.profile.education
            : [
                {
                  degree: "No education details",
                  institution: "N/A",
                  year: "N/A",
                },
              ],
          socialLinks: {
            linkedin: data.profile.socialLinks.linkedin || "#",
            github: data.profile.socialLinks.github || "#",
            portfolio: data.profile.socialLinks.portfolio || "#",
          },
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requirement details:", error);
        setLoading(false);
      }
    };

    const fetchRecruiterProfile = async () => {
      try {
        const { data } = await getUserProfileByEmail(loggedInUser.email);
        setRecruiterId(data.recruiterProfile._id);
        setBookmark(
          data.recruiterProfile.bookmarkedTalents.some(
            (bookmark) => bookmark._id === candidateId
          )
        );
      } catch (error) {
        console.error("Error fetching recruiter profile:", error);
      }
    };

    if (loggedInUser?.email) {
      fetchRecruiterProfile();
      fetchCandidateProfile();
    }
  }, [candidateId, loggedInUser]); // Ensure it re-fetches when the candidate changes

  // Handle Bookmark Click
  const handleBookmarkClick = async () => {
    try {
      if (!bookmark) {
        await bookmarkTalent(recruiterId, candidateId);
        setToastMessage("Bookmark added successfully!");
      } else {
        await removeBookmarkedTalent(recruiterId, candidateId);
        setToastMessage("Bookmark removed successfully!");
      }

      setToastType("success");
      setBookmark(!bookmark);

      // Fetch updated recruiter profile to keep data in sync
      const { data } = await getUserProfileByEmail(loggedInUser.email);
      setBookmark(
        data.recruiterProfile.bookmarkedTalents.some(
          (bookmark) => bookmark._id === candidateId
        )
      );
    } catch (error) {
      console.error("Error bookmarking candidate:", error);
      setToastMessage("Something went wrong!");
      setToastType("error");
    }
  };

  if (loading) return <Spinner />;

  if (!candidate) return <div>No candidate data found.</div>;

  // Helper Components
  const SectionWrapper = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-sky-100 pb-2">
        {title}
      </h2>
      {children}
    </motion.div>
  );

  const TimelineItem = ({ title, subtitle, description, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-4 border-l-2 border-sky-200"
    >
      <div className="absolute w-4 h-4 bg-sky-500 rounded-full -left-[9px] top-0" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
      {description && <p className="text-gray-600">{description}</p>}
    </motion.div>
  );

  const SocialIcon = ({ platform }) => {
    const icons = {
      linkedin: <FiLinkedin className="w-5 h-5 text-[#0A66C2]" />,
      github: <FiGithub className="w-5 h-5 text-gray-800" />,
      portfolio: <FiGlobe className="w-5 h-5 text-sky-600" />,
    };
    return icons[platform] || <FiGlobe className="w-5 h-5 text-gray-600" />;
  };

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Profile Header */}
        <div className="relative h-56 bg-gradient-to-r from-sky-500 to-indigo-600">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={candidate?.profilePicture}
            alt={`${candidate?.name}'s profile`}
            className="absolute -bottom-16 left-8 w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />

          <motion.button
            onClick={() => handleBookmarkClick()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl m-5 p-2 float-end rounded-full hover:bg-gray-700/30 transition-colors"
          >
            <FiBookmark
              className={`${
                bookmark
                  ? "fill-emerald-400 stroke-emerald-400"
                  : "text-gray-400"
              }`}
            />
          </motion.button>
        </div>

        <div className="pt-20 px-8 pb-8">
          {/* Name and About */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {candidate?.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{candidate?.about}</p>
          </motion.div>

          {/* Skills */}
          <SectionWrapper title="Skills">
            <div className="flex flex-wrap gap-2">
              {candidate?.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  className="px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </SectionWrapper>

          {/* Experience */}
          <SectionWrapper title="Experience">
            {candidate?.experience.map((exp, idx) => (
              <TimelineItem
                key={exp._id}
                title={`${exp.jobRole} at ${exp.company}`}
                subtitle={exp.duration}
                description={exp.description}
                index={idx}
              />
            ))}
          </SectionWrapper>

          {/* Education */}
          <SectionWrapper title="Education">
            {candidate?.education.map((edu, idx) => (
              <TimelineItem
                key={edu._id}
                title={`${edu.degree} from ${edu.institution}`}
                subtitle={`Year: ${edu.year}`}
                index={idx}
              />
            ))}
          </SectionWrapper>

          {/* Contact & Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-6 bg-sky-50 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FiMail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{candidate?.email}</span>
              </div>
              <div className="flex gap-4 mt-2">
                {Object.entries(candidate?.socialLinks || {}).map(
                  ([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <SocialIcon platform={platform} />
                      <span className="capitalize text-gray-700">
                        {platform}
                      </span>
                    </motion.a>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Hire Now Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => setHireTalentModal(true)}
          >
            Hire Now
          </motion.button>
          {/* Toast Notifications */}
          {toastMessage && (
            <NotificationToasts
              message={toastMessage}
              type={toastType}
              autoClose={1500}
              position="top-left"
              theme="dark"
            />
          )}
        </div>
      </motion.div>

      {hiretalentModal && (
        <HireTalentModal
          candidate={candidate}
          onClose={() => setHireTalentModal(false)}
        />
      )}
    </div>
  );
};
