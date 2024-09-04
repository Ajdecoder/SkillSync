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
              title="Recent Company Listed"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
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
