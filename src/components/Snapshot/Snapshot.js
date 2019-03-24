import React from "react";

import { Workout } from "../Workout/Workout";
import { ConfirmButton } from "../ConfirmButton/ConfirmButton";

import "./Snapshot.css";

export const Snapshot = ({ data }) => {
  return (
    <div className="snapshot">
      <h2 className="snapshot__title">Next Workout</h2>
      <Workout data={data} modifier="snapshot" />
    </div>
  );
};
