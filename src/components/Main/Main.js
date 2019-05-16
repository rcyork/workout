import React from "react";

import { Link } from "react-router-dom";

import { About } from "./About/About";
import { NextWorkout } from "./NextWorkout/NextWorkout";

import "./Main.css";

export const Main = ({ workout }) => {
  return (
    <div className="main">
      <About />
      <NextWorkout workout={workout} />
      <Link to="/log">View Log</Link>
    </div>
  );
};
