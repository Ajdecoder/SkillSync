import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { ChooseLoginMode } from "../../Login/ChooseLoginMode";
import TalentSearch from "../../TalentSearch/TalentSearchForm";
import TalentsCard from "../../home/recent/TalentsCards";

const HireResources = () => {
  const { loggedInUser } = useAuth();


  return loggedInUser?.role === "recruiter" ? (
    // <TalentSearch />
    <TalentsCard bgColor='black' />
  ) : (
    <ChooseLoginMode />
  );
};

export default HireResources;
