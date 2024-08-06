import { jwtDecode } from "jwt-decode";

export const jwttokenDecode = (token) => {
  if (token) {
    const decoded_data = jwtDecode(token);
    return decoded_data;
  } else {
    return "no token found";
  }
};
