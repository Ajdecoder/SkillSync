import React, { useState, useEffect } from "react";
import "../Resources/Resources.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../utils/AuthContext";
import { Login } from "../Login/Login";
import TalentSearch from "../TalentSearch/TalentSearchForm";
import AddOpportunityForm from "../AddOpportunity/AddOpportunityForm";

const AddOpportunity = () => {
  const { loggedInUser } = useAuth();

  return loggedInUser ? <AddOpportunityForm /> : <Login />;
};

export default AddOpportunity;
