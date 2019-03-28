import React from "react";

import { Workout } from "../Workout/Workout";

import "./Snapshot.css";

export const Snapshot = ({ workout, weights, title }) => {
  return (
    <div className="snapshot">
      <h2 className="snapshot__title">{title}</h2>
      <Workout workout={workout} modifier="snapshot" weights={weights} />
    </div>
  );
};
