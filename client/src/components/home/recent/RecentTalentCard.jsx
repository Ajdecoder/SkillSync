import React from "react";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import TalentsCard from "./TalentsCards.jsx";

const RecentTalentCard = ({
  addedTalents = [],
  filterdTalents = [],
  TalentsLoading = false
}) => {

  // console.log("addedTalents:", addedTalents);
  // console.log("filterdTalents:", filterdTalents);
  // console.log("TalentsLoading:", TalentsLoading);
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  if (TalentsLoading === true) {
    return <Spinner />;
  }

  // Use filtered data if available, else fallback to all added Talents
  const TalentsToShow =
    filterdTalents.length > 0 ? filterdTalents : addedTalents;

  // console.log('recentrale',addedTalents)

  const renderTalentCard = (talent) => {
    // console.log('renderTalentCard talents', talent)
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
          <div className="flex justify-center mt-6">
            {loadMore ? <Spinner /> : <button onClick={handleLoadMore} className="gap-2 px-6 py-3
                      bg-gradient-to-r from-emerald-500 to-cyan-500 
                      rounded-lg text-white font-semibold">Load More</button>}
          </div>
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
