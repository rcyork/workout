import React from "react";

import { Link } from "react-router-dom";

import "./Button.css";

export const Button = ({
  text,
  destination,
  type,
  logWorkout,
  purpose,
  editWorkout,
  onClick
}) => {
  const handleOnClickOptions = purpose === "edit" ? editWorkout : logWorkout;
  return (
    <Link to={`${destination}`} className={`button ${type}`} onClick={onClick}>
      {text}
    </Link>
  );
};
