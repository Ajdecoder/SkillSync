import React from "react";
import { useParams } from "react-router-dom";
import { getRequirementById, getUserProfileByEmail } from "../../../services/api";

export const ViewCandidateInfo = () => {
  const { candidateid } = useParams();
 ;(async () => {
    try {
      const requirementDetails = await getUserProfileByEmail(candidateid);
      console.log(requirementDetails);
    } catch (error) {
      console.error("Error fetching requirement details:", error);
    }
  })();

  return <div>ViewCandidateInfo</div>;
};
