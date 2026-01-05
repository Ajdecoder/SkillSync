import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import RecentOpportunity from "./RecentOpportunityCard";
import { useAuth } from "../../context/AuthContext";
import { SampleRecentCard } from "../../SampleRecentCard";
import TalentsCard from "./TalentsCards";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../common/loadingSpinner/spinner";
import { getAllCandidateProfiles } from "../../../services/api";
import { LoginLoading } from "../../Login/LoginLoading";
import RecentTalentCard from "./RecentTalentCard";

const Recent = ({ filteredopportunity, opportunity, loading, candidates, filteredCandidates, opportunitiesError, candidatesError: talentsError }) => {

  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  if (talentsError) {
    return <div className="text-center text-red-500">{talentsError}</div>;
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {currentUser ? (
        <>
          {(currentUser?.role === "candidate") && (
            <section className="recent padding dark:bg-gray-800 dark:text-white">
              <div className="container">
                <Heading
                  title="Newly Listed Companies"
                  subtitle={`Explore the latest companies seeking talent. (${opportunity?.length} opportunities)`}
                />
                <RecentOpportunity
                  opportunitiesLoading={loading}
                  addedOpportunities={opportunity}
                  filterdOpportunities={filteredopportunity}
                />
              </div>
            </section>
          )}

          {(currentUser?.role === "recruiter") && (
            <section className="recent padding">
              <div className="container">
                <Heading
                  title="Newly Listed Talents"
                  subtitle={`Explore the latest talents looking for opportunities. (${candidates?.length} talents)`}
                />
                <RecentTalentCard
                  TalentsLoading={loading}
                  addedTalents={candidates}
                  filterdTalents={filteredCandidates}
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
