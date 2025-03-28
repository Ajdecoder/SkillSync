import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import RecentOpportunity from "./RecentOpportunityCard";
import { useAuth } from "../../context/AuthContext";
import { SampleRecentCard } from "../../SampleRecentCard";
import TalentsCard from "./TalentsCards";
import useFetchData from "../../hooks/useGetDataFetch";
import { useNavigate } from "react-router-dom";
import { PORT_CLIENT } from "../../../commonClient";
import { Spinner } from "../../common/loadingSpinner/spinner";
import { getAllCandidateProfiles } from "../../../services/api";

const Recent = ({ filterCategory, filteredProgrammers, programmers }) => {
  console.log(filterCategory, filteredProgrammers, programmers);
  const { loggedInUser, googleUser } = useAuth();
  const navigate = useNavigate();
  const [talentsError, setTalentsError] = useState(null);
  const [talentsLoading, setTalentsLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);
  const [talents, setTalents] = useState([]);

  const {
    data: opportunitiesData,
    error: opportunitiesError,
    loading: opportunitiesLoading,
  } = useFetchData(`${PORT_CLIENT}/api/requirements/addedOpportunities`);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await getAllCandidateProfiles();
        setTalents(data.candidates || []);
        setTalentsLoading(false);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    if (opportunitiesData?.Addedopportunities) {
      setOpportunities(opportunitiesData.Addedopportunities);
    }
  }, [opportunitiesData]);

  const handleConnectClick = (item, index, type) => {
    const post_id = opportunities[index]?._id;
    navigate(`${type}/connect/${post_id}`, { state: { item } });
  };

  if (loggedInUser && (opportunitiesLoading || talentsLoading))
    return <Spinner />;

  if (opportunitiesError || talentsError) {
    return (
      <div className="text-center text-red-500">
        {opportunitiesError || talentsError}
      </div>
    );
  }

  return (
    <>
      {loggedInUser || googleUser ? (
        <>
          {(loggedInUser?.role === "candidate" ||
            googleUser?.role === "candidate") && (
            <section className="recent padding">
              <div className="container">
                <Heading
                  title="Newly Listed Companies"
                  subtitle="Explore the latest companies seeking talent. Stay updated with fresh opportunities and potential career moves."
                />
                <RecentOpportunity
                  handleConnectClick={handleConnectClick}
                  addedOpportunities={opportunities}
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
                <TalentsCard talents={talents} />
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
