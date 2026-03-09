import React, { useEffect, useState } from "react";
import { PORT_CLIENT } from "../../../commonClient";
import useFetchData from "../../hooks/useGetDataFetch";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard";
import { Spinner } from "../../common/loadingSpinner/spinner";

export const SavedOpportunity = ({
  filterdOpportunities = [],
}) => {
  const [opportunities, setOpportunities] = useState([]);

  const opportunitiesToShow =
    filterdOpportunities.length > 0 ? filterdOpportunities : opportunities;

  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/addedOpportunities`
  );

  console.log(data)

  useEffect(() => {
    if (data?.Addedopportunities) {
      setOpportunities(data.Addedopportunities);
    }
  }, [data]);

  const renderOpportunityCard = (opportunity) => {
    return (
      <AddOpportunityCard
        key={opportunity._id}
        opportunity={opportunity}
      />
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner/>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading opportunities: {error.message}
      </div>
    );

  if (!opportunities.length)
    return (
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          No Opportunities Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Please check back later.
        </p>
      </div>
    );

    console.log("opportunitiestoshow",opportunitiesToShow)

  return (
    <div className="space-y-11 m-6 opportunity-card-container">
      {opportunitiesToShow.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4">
          {opportunitiesToShow.map((opportunity) =>
            renderOpportunityCard(opportunity)
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No matching opportunities found.
        </div>
      )}
    </div>
  )

};
