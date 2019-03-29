import React from "react";

import { Link } from "react-router-dom";

import "./Button.css";

export const Button = ({
  text,
  destination,
  type,
  logWorkout,
  purpose,
  editWorkout
}) => {
  return (
    <Link
      to={`${destination}`}
      className={`button ${type}`}
      onClick={purpose === "edit" ? editWorkout : logWorkout}
    >
      {text}
    </Link>
  );
};
