import "../Resources/Resources.css";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { Login } from "../Login/Login";
import AddOpportunityForm from "../AddOpportunity/AddOpportunityForm";

const AddOpportunity = () => {
  const { loggedInUser } = useAuth();

  return loggedInUser ? <AddOpportunityForm /> : <Login />;
};

export default AddOpportunity;
