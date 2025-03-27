import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import TalentsCard from "../../home/recent/TalentsCards";
import { LoginPromoPage } from "../../Login/NotLoggedIn";

const HireResources = () => {
  const { loggedInUser,google_user } = useAuth();
  const currentUser = loggedInUser || google_user;


  return currentUser?.role === "recruiter" ? (
    // <TalentSearch />
    <TalentsCard bgColor='black' />
  ) : (
    <LoginPromoPage />
  );
};

export default HireResources;
