import React from "react";

import { Workout } from "../Workout/Workout";
import { Button } from "../Button/Button";

import "./ActiveWorkout.css";

export const ActiveWorkout = ({
  modifier,
  workout,
  weights,
  increment,
  decrement,
  isCollectingData,
  logWorkout,
  isEditingLogEntry,
  editWorkout
}) => {
  return (
    <div className="activeWorkout">
      <Button
        text="cancel"
        destination={isEditingLogEntry ? "/log" : "/"}
        type="cancel"
      />
      <Workout
        purpose={isEditingLogEntry ? "edit" : null}
        destination={isEditingLogEntry ? "/log" : "/"}
        modifier={modifier}
        workout={workout}
        weights={weights}
        increment={increment}
        decrement={decrement}
        isCollectingData={isCollectingData}
        logWorkout={logWorkout}
        editWorkout={editWorkout}
      />
    </div>
  );
};
