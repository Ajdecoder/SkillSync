import React from "react";
import { useAuth } from "../../context/AuthContext";
import TalentPool from "./TalentPool";
import { LoginPromoPage } from "../../Login/NotLoggedIn";


export const ListedTalents = () => {
  const { loggedInUser, google_user } = useAuth();

  const currentUser = loggedInUser || google_user;

  return currentUser?.role === "recruiter" ? (
    <TalentPool />
  ) : (
    <LoginPromoPage />
  );
};
