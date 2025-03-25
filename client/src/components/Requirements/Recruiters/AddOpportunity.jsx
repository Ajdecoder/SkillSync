import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import AddOpportunityForm from "../../AddOpportunity/AddOpportunityForm";
import { LoginPromoPage } from "../../Login/NotLoggedIn";

const AddOpportunity = () => {
  const { loggedInUser, google_user } = useAuth();

  const currentUser = loggedInUser || google_user;

  return currentUser?.role==='recruiter' ? <AddOpportunityForm /> : <LoginPromoPage />;
};

export default AddOpportunity;
