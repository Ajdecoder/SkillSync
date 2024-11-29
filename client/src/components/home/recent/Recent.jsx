import React from "react";
import Heading from "../../common/Heading";
import RecentCard from "./RecentCard";
import { useAuth } from "../../context/AuthContext";
import { SampleRecentCard } from "../../SampleRecentCard";

const Recent = (filteredProgrammers,programmers,filterCategory) => {

  const { loggedInUser } = useAuth();

  // console.log('filetered programers in recent',filteredProgrammers)
  // console.log('programers in recent',programmers)
  // console.log('filterCategory in recent',filterCategory)

  return (
    <>
      {loggedInUser ? (
        <section className="recent padding">
          <div className="container">
            <Heading
              title="Newly Listed Companies"
              subtitle="Explore the latest companies seeking talent. Stay updated with fresh opportunities and potential career moves."
            />
            <RecentCard />
          </div>
        </section>
      ) : (
        <SampleRecentCard />
      )}
    </>
  );
};

export default Recent;
