import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState({});
  const [workoutRecommendation, setWorkoutRecommendation] = useState("");

  const contextValue = {
    userPreferences,
    setUserPreferences,
    workoutRecommendation,
    setWorkoutRecommendation,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
