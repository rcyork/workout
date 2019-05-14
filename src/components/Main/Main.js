import React from "react";

import About from "./About/About";
import NextWorkout from "./NextWorkout/NextWorkout";

import "./Main.css";

export default function Main({ workout }) {
  return (
    <div className="main">
      <About />
      <NextWorkout workout={workout} />
    </div>
  );
}
