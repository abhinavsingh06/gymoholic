import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "./App.css";
import InputField from "./Components/Common/InputField";
import { useAppContext } from "./Components/Contexts/AppContext";

const App = () => {
  const {
    userPreferences,
    setUserPreferences,
    workoutRecommendation,
    setWorkoutRecommendation,
  } = useAppContext();

  const handleGenerateWorkout = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: `Generate a personalized workout plan for ${userPreferences.name}, a ${userPreferences.age}-year-old ${userPreferences.gender} with a ${userPreferences.fitnessLevel} fitness level, targeting ${userPreferences.targetMuscleGroups} muscles, and desiring a workout duration of ${userPreferences.desiredDuration} minutes. Provide a ${userPreferences.workoutType} workout plan.`,
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
          },
        }
      );

      setWorkoutRecommendation(response.data.choices[0].text);
    } catch (error) {
      console.error("Error generating workout:", error);
      console.error("Response data:", error.response && error.response.data);
    }
  };

  const handleInputChange = (field, value) => {
    setUserPreferences((prevUserPreferences) => ({
      ...prevUserPreferences,
      [field]: value,
    }));
  };

  const fitnessLevelOptions = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const muscleGroupOptions = [
    { label: "Chest", value: "chest" },
    { label: "Back", value: "back" },
    { label: "Legs", value: "legs" },
    { label: "Arms", value: "arms" },
    { label: "Shoulders", value: "shoulders" },
    { label: "Core", value: "core" },
  ];

  const workoutTypeOptions = [
    { label: "Specific Exercises", value: "specific" },
    { label: "General Workout Plan", value: "general" },
  ];

  const debouncedGenerateWorkout = debounce(handleGenerateWorkout, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    debouncedGenerateWorkout();
  };

  return (
    <div>
      <div className="App-header">
        <div>
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              label="Name"
              value={userPreferences.name}
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
              placeholder="Enter your name"
            />

            <InputField
              type="number"
              label="Age"
              value={userPreferences.age}
              onChange={(event) => handleInputChange("age", event.target.value)}
              placeholder="Enter your age"
            />

            <InputField
              type="select"
              label="Gender"
              value={userPreferences.gender}
              onChange={(event) =>
                handleInputChange("gender", event.target.value)
              }
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />

            <InputField
              type="select"
              label="Fitness Level"
              value={userPreferences.fitnessLevel}
              onChange={(event) =>
                handleInputChange("fitnessLevel", event.target.value)
              }
              options={fitnessLevelOptions}
            />

            <InputField
              type="select"
              label="Target Muscle Groups"
              value={userPreferences.targetMuscleGroups}
              onChange={(event) =>
                handleInputChange("targetMuscleGroups", event.target.value)
              }
              options={muscleGroupOptions}
            />

            <InputField
              type="number"
              label="Desired Workout Duration (minutes)"
              value={userPreferences.desiredDuration}
              onChange={(event) =>
                handleInputChange("desiredDuration", event.target.value)
              }
              placeholder="Enter desired duration"
            />

            <InputField
              type="select"
              label="Workout Type"
              value={userPreferences.workoutType}
              onChange={(event) =>
                handleInputChange("workoutType", event.target.value)
              }
              options={workoutTypeOptions}
            />
            <button type="submit">Generate Workout</button>
          </form>
        </div>
        <div>
          <h1>hello</h1>
          {workoutRecommendation && (
            <div className="workout-recommendation">
              <h3>Generated Workout Recommendation:</h3>
              <p>{workoutRecommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
