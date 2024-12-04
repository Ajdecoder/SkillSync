// components/context/LoadingContext.js
import React, { createContext, useState, useContext } from "react";

const ScreenLoadingContext = createContext();

export const useScreenLoadingContext = () => useContext(ScreenLoadingContext);

export const ScreenLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <ScreenLoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </ScreenLoadingContext.Provider>
  );
};
