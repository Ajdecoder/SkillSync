import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PORT_CLIENT } from "../../commonClient";

export const GoogleAuth = ({ role }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(
        `${PORT_CLIENT}/auth/google`,
        {
          token: response.credential,
          role,
        },
        {
          withCredentials: true,
        }
      );

      const { token } = res.data;

      localStorage.setItem("authToken", JSON.stringify(token));

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.log("Login Failed")}
      text="continue_with"
    />
  );
};