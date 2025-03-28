import React from "react";
import { useAuth } from "../../context/AuthContext";
import TalentPool from "./TalentPool";
import { LoginPromoPage } from "../../Login/NotLoggedIn";


export const ListedTalents = () => {
  const { loggedInUser, googleUser } = useAuth();

  const currentUser = loggedInUser || googleUser;

  return currentUser?.role === "recruiter" ? (
    <TalentPool />
  ) : (
    <LoginPromoPage />
  );
};
