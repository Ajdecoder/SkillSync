import { jwtDecode } from "jwt-decode";

export const jwttokenDecode = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    console.log("data of decoded token", decoded);
    const currentTime = Date.now() / 1000;
    const expiryTime = decoded.exp;

    if (currentTime > expiryTime) {
      localStorage.removeItem("jwttoken");
      return null;
    }

    return decoded;
  } catch (error) {
    localStorage.removeItem("jwttoken");
    return null;
  }
};
