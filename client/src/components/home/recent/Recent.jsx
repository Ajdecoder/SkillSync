import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import RecentOpportunity from "./RecentOpportunityCard";
import { useAuth } from "../../context/AuthContext";
import { SampleRecentCard } from "../../SampleRecentCard";
import TalentsCard from "./TalentsCards";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../common/loadingSpinner/spinner";
import { getAllCandidateProfiles } from "../../../services/api";

const Recent = ({ filterCategory, filteredopportunity, opportunity }) => {
  const { loggedInUser, googleUser } = useAuth();
  const navigate = useNavigate();
  const [talentsError, setTalentsError] = useState(null);
  const [talentsLoading, setTalentsLoading] = useState(true);
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await getAllCandidateProfiles();
        setTalents(data.candidates || []);
        setTalentsLoading(false);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setTalentsError("Error loading talents");
      }
    };

    fetchCandidates();
  }, []);

  const handleConnectClick = (item, index, type) => {
    const post_id = opportunity[index]?._id;
    navigate(`${type}/connect/${post_id}`, { state: { item } });
  };

  if ((loggedInUser || googleUser) && talentsLoading) return <Spinner />;

  if (talentsError) {
    return <div className="text-center text-red-500">{talentsError}</div>;
  }

  return (
    <>
      {loggedInUser || googleUser ? (
        <>
          {(loggedInUser?.role === "candidate" ||
            googleUser?.role === "candidate") && (
            <section className="recent padding dark:bg-gray-800 dark:text-white">
              <div className="container">
                <Heading
                  title="Newly Listed Companies"
                  subtitle="Explore the latest companies seeking talent. Stay updated with fresh opportunities and potential career moves."
                />
                <RecentOpportunity
                  handleConnectClick={handleConnectClick}
                  addedOpportunities={opportunity}
                  filterdOpportunities={filteredopportunity}
                />
              </div>
            </section>
          )}

          {(loggedInUser?.role === "recruiter" ||
            googleUser?.role === "recruiter") && (
            <section className="recent padding">
              <div className="container">
                <Heading
                  title="Newly Listed Talents"
                  subtitle="Explore the latest talents looking for opportunities. Stay updated with fresh talent profiles and career options."
                />
                <TalentsCard
                  talents={
                    filteredopportunity?.length ? filteredopportunity : talents
                  }
                />
              </div>
            </section>
          )}
        </>
      ) : (
        <SampleRecentCard />
      )}
    </>
  );
};

export default Recent;
