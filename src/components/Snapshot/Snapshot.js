import React from "react";

import { Workout } from "../Workout/Workout";

import "./Snapshot.css";

export const Snapshot = ({ exercises, weights, title }) => {
  return (
    <div className="snapshot">
      <h2 className="snapshot__title">{title}</h2>
      <Workout exercises={exercises} modifier="snapshot" weights={weights} />
    </div>
  );
};
