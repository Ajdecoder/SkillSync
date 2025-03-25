import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { MyJobListings } from "../MyJobListings";
import { LoginPromoPage } from "../../../Login/NotLoggedIn";

export const ListedListenings = () => {
  const { loggedInUser, google_user } = useAuth();

  const currentUser = loggedInUser || google_user;

  return currentUser?.role==='recruiter'? <MyJobListings/> : <LoginPromoPage/>;
};
