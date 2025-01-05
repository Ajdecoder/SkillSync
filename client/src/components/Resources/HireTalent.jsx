import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { ChooseLoginMode } from "../Login/ChooseLoginMode";
import TalentSearch from "../TalentSearch/TalentSearchForm";

const   HireResources = () => {
  const { loggedInUser } = useAuth();

  console.log("loggedin user intalentsearch", loggedInUser)


  return loggedInUser?.role==='recruiter' ? <TalentSearch /> : <ChooseLoginMode />;
};

export default HireResources;
