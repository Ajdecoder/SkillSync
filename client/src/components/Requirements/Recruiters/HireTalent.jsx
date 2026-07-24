import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LoginPromoPage } from "../../Login/NotLoggedIn";
import { getAllCandidateProfiles } from "../../../services/api";
import TalentsGrid from "../../home/recent/RecentTalentCard";

const HireResources = () => {
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await getAllCandidateProfiles();
      setCandidates(response.data.candidates || []);
    } catch (error) {
      console.error("Error fetching candidates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return currentUser?.role === "recruiter" ? (
    <div className="py-3">
    <TalentsGrid
      addedTalents={candidates}
      TalentsLoading={loading}
    />
    </div>  
  ) : (
    <LoginPromoPage />
  );
};

export default HireResources;
