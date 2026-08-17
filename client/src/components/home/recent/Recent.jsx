import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "../../common/loadingSpinner/spinner";
import RecentTalentCard from "./RecentTalentCard";
import RecentOpportunity from "./RecentOpportunityCard";

const Recent = ({
  filteredOpportunities,
  opportunity,
  loading,
  candidates,
  filteredCandidates,
  opportunitiesError,
  candidatesError: talentsError,
  hasActiveOpportunityFilters = false,
  hasActiveCandidateFilters = false,
}) => {
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
            <section className="recent dark:bg-gray-800 dark:text-white">
              <div className="container">
                <Heading
                  title="Newly Listed Companies"
                  subtitle={`Explore the latest companies seeking talent. (${opportunity?.length} opportunities)`}
                />
                <RecentOpportunity
                  opportunitiesLoading={loading}
                  addedOpportunities={opportunity}
                  filterdOpportunities={hasActiveOpportunityFilters ? filteredOpportunities : []}
                  isFilteringActive={hasActiveOpportunityFilters}
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
                  filterdTalents={hasActiveCandidateFilters ? filteredCandidates : []}
                  isFilteringActive={hasActiveCandidateFilters}
                />
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="recent padding dark:bg-gray-800 dark:text-white">
          <div className="container">
            <RecentOpportunity
              opportunitiesLoading={loading}
              addedOpportunities={opportunity}
              // filterdOpportunities={filteredopportunity}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Recent;
