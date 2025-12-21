import { jwtDecode } from "jwt-decode";

export const jwttokenDecode = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("jwttoken");
      window.location.href = "/login";
      return null;
    }

    return decoded;
  } catch (error) {
    localStorage.removeItem("jwttoken");
    window.location.href = "/login";
    return null;
  }
};
