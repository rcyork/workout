import React from "react";

import { Workout } from "../Workout/Workout";
import { Button } from "../Button/Button";

import "./ActiveWorkout.css";

export const ActiveWorkout = ({
  modifier,
  exercises,
  weights,
  increment,
  decrement,
  isCollectingData
}) => {
  return (
    <div className="activeWorkout">
      <Button text="cancel" destination="/" type="cancel" />
      <Workout
        modifier={modifier}
        exercises={exercises}
        weights={weights}
        increment={increment}
        decrement={decrement}
        isCollectingData={isCollectingData}
      />
      <Button text="complete workout" destination="/" type="confirm" />
    </div>
  );
};
