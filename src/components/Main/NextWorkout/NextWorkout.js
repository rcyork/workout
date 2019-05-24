import React from "react";

import { WORKOUT_NAMES } from "../../../utils/workoutNames";

import "./NextWorkout.css";

import { roundToNearestFive } from "../../../utils/roundToNearestFive";

export const NextWorkout = ({ workout }) => {
  return (
    <div className="nextWorkout">
      <div className="nextWorkout__banner">
        <h2>Next Workout</h2>
        <p>{WORKOUT_NAMES.find(name => name.id === workout.id).fullName}</p>
      </div>
      <div className="nextWorkout__tableWrap">
        <table className="nextWorkout__table">
          <tbody>
            <tr className="columnLables">
              <th align="left">exercise</th>
              <th align="center">sets x reps</th>
              <th align="right">weight</th>
            </tr>
            {workout.exercises.map(exercise => {
              return (
                <tr key={exercise.name}>
                  <th align="left">{exercise.name}</th>
                  <td align="center">{`${exercise.sets} x ${exercise.reps} ${
                    exercise.amrap ? "+ 1xAMRAP" : ""
                  }`}</td>
                  <td align="right">
                    {exercise.weight === null
                      ? 0
                      : exercise.reps === 8
                      ? roundToNearestFive(exercise.weight * 0.9)
                      : exercise.weight}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
