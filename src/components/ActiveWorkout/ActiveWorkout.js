import React from "react";

import { Workout } from "../Workout/Workout";
import { Button } from "../Button/Button";

import "./ActiveWorkout.css";

export const ActiveWorkout = ({
  modifier,
  exercises,
  weights,
  increment,
  decrement
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
      />
      <Button text="complete workout" destination="/" type="confirm" />
    </div>
  );
};
