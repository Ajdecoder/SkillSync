import React from "react";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import TalentsCard from "./TalentsCards.jsx";

const RecentTalentCard = ({
  addedTalents = [],
  filterdTalents = [],
  TalentsLoading=false
}) => {

//   console.log("addedTalents:", addedTalents);
// console.log("filterdTalents:", filterdTalents);
// console.log("TalentsLoading:", TalentsLoading);


  if (TalentsLoading === true) {
  return <Spinner />;
}

  // Use filtered data if available, else fallback to all added Talents
  const TalentsToShow =
    filterdTalents.length > 0 ? filterdTalents : addedTalents;

    console.log('recentrale',addedTalents)

  const renderTalentCard = (talent) => {
    return (
      <TalentsCard
        key={talent?._id}
        talent={talent}
      />
    );
  };

  return (
    <div className="space-y-8 talent-card-container">
      {TalentsToShow.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4">
          {TalentsToShow.map((talent) =>
            renderTalentCard(talent)
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No matching Talents found.
        </div>
      )}
    </div>
  );
};

export default RecentTalentCard;
