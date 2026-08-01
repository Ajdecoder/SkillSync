import React from "react";
import RecentOpportunity from "./home/recent/RecentOpportunityCard";

export const SampleRecentCard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <>
      <RecentOpportunity />
    </>
  );
};