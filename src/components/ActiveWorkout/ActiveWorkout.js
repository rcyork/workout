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
  editWorkout
}) => {
  return (
    <div className="activeWorkout">
      <Button text="cancel" destination="/" type="cancel" onClick={null} />
      <Workout
        destination="/"
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
