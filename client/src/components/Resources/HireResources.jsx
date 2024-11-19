import "../Resources/Resources.css";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../utils/AuthContext";
import { Login } from "../Login/Login";
import TalentSearch from "../TalentSearch/TalentSearchForm";

const   HireResources = () => {
  const { loggedInUser } = useAuth();

  return loggedInUser ? <TalentSearch /> : <Login />;
};

export default HireResources;
