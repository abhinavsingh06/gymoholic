import React from "react";
import { useAppContext } from "../Contexts/AppContext";
import "../../styles/common/inputfield.css";

const InputField = ({ type, label, options, className, ...rest }) => {
  const { userPreferences, setUserPreferences } = useAppContext();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  const inputProps = {
    type,
    id: label,
    value: userPreferences[label],
    onChange: handleChange,
    name: label, 
    ...rest,
  };

  if (type === "select") {
    return (
      <div className={`input-container ${className}`}>
        <label htmlFor={label}>{label}</label>
        <select {...inputProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={label}>{label}</label>
      <input {...inputProps} />
    </div>
  );
};

export default InputField;
