import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { ChooseLoginMode } from "../Login/ChooseLoginMode";
import AddOpportunityForm from "../AddOpportunity/AddOpportunityForm";

const AddOpportunity = () => {
  const { loggedInUser } = useAuth();

  console.log("loggedin user opportunities", loggedInUser?.role)

  return loggedInUser?.role==='recruiter' ? <AddOpportunityForm /> : <ChooseLoginMode />;
};

export default AddOpportunity;
