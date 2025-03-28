import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { MyJobListings } from "../MyJobListings";
import { LoginPromoPage } from "../../../Login/NotLoggedIn";

export const ListedListenings = () => {
  const { loggedInUser, googleUser } = useAuth();

  const currentUser = loggedInUser || googleUser;

  return currentUser?.role==='recruiter'? <MyJobListings/> : <LoginPromoPage/>;
};
