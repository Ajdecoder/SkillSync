import React from "react";
import Heading from "../../common/Heading";
import RecentCard from "./RecentCard";
import { useAuth } from "../../utils/AuthContext";
import { SampleRecentCard } from "../../SampleRecentCard";

const Recent = () => {
  const { loggedInUser } = useAuth();

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
