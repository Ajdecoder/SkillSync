import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import TalentsCard from "../../home/recent/TalentsCards";
import { LoginPromoPage } from "../../Login/NotLoggedIn";

const HireResources = () => {
  const { loggedInUser } = useAuth();


  return loggedInUser?.role === "recruiter" ? (
    // <TalentSearch />
    <TalentsCard bgColor='black' />
  ) : (
    <LoginPromoPage />
  );
};

export default HireResources;
