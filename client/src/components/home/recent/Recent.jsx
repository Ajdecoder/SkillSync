import React, { useEffect } from "react";
import Heading from "../../common/Heading";
import RecentOpportunity from "./RecentOpportunityCard";
import { useAuth } from "../../context/AuthContext";
import { SampleRecentCard } from "../../SampleRecentCard";
import TalentSearchCard from "./TalentSearchCards";
import useFetchData from "../../hooks/useGetDataFetch";
import { useNavigate } from "react-router-dom";
import { PORT_CLIENT } from "../../../commonClient";
import { Spinner } from "../../common/loadingSpinner/spinner";

const Recent = () => {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/allRequirements`
  );
  const {
    data: talentData,
    error: talentError,
    loading: talentLoading,
  } = useFetchData(`${PORT_CLIENT}/api/requirements/allTalents`);

  
  const addedOpportunities = data?.Addedopportunities || [];
  const talents = talentData?.talents || [];



  const handleConnectClick = (item, index, type) => {
    const post_id =
      type === "opportunity"
        ? addedOpportunities[index]._id
        : talents[index]._id;
    navigate(`${type}/connect/${post_id}`, { state: { item } });
  };

  if (loading || talentLoading) {
    return <Spinner/>;
  }

  if (error || talentError) {
    return (
      <div className="text-center text-red-500">{error || talentError}</div>
    );
  }

  return (
    <>
      {loggedInUser ? (
        <>
          {/* Recent Opportunities Section */}
          <section className="recent padding">
            <div className="container">
              <Heading
                title="Newly Listed Companies"
                subtitle="Explore the latest companies seeking talent. Stay updated with fresh opportunities and potential career moves."
              />
              <RecentOpportunity
                handleConnectClick={handleConnectClick}
                addedOpportunities={addedOpportunities}
              />
            </div>
          </section>

          {/* Newly Listed Talents Section */}
          { loggedInUser.role === 'recruiter' && <section className="recent padding">
            <div className="container">
              <Heading
                title="Newly Listed Talents"
                subtitle="Explore the latest talents looking for opportunities. Stay updated with fresh talent profiles and career options."
              />
              <div style={{
                display:'grid',
                justifyItems:'center',
              }} className="grid grid-cols-1 justify-center sm:grid-cols-2  lg:grid-cols-3 gap-6">
                {talents.map((talent, index) => (
                  <TalentSearchCard
                    key={talent._id}
                    talent={talent}
                    onConnectClick={() =>
                      handleConnectClick(talent, index, "talent")
                    }
                  />
                ))}
              </div>
            </div>
          </section>}
        </>
      ) : (
        <SampleRecentCard />
      )}
    </>
  );
};

export default Recent;
