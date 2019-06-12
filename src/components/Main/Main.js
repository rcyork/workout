import React from "react";

import { Link } from "react-router-dom";

import { About } from "./About/About";
import { NextWorkout } from "./NextWorkout/NextWorkout";

import "./Main.css";

export const Main = ({ workout }) => {
  return (
    <div className="main">
      <div className="main__navLinks">
        <Link to="/log" className="viewLog">
          <i className="fas fa-clipboard-list" /> View Log
        </Link>
        <Link className="startWorkout" to="/active-workout">
          Start Workout
        </Link>
      </div>
      <About />
      <NextWorkout workout={workout} />
    </div>
  );
};
