import React from "react";
import { Link } from "react-router-dom";
import "./NextWorkout.css";

import { roundToNearestFive } from "../../../utils/roundToNearestFive";

export const NextWorkout = ({ workout }) => {
  return (
    <div className="nextWorkout">
      <div className="nextWorkout__banner">
        <h2>Next Workout</h2>
        <p>{workout.id}</p>
      </div>
      <table className="nextWorkout__table">
        <tbody>
          <tr>
            <th>exercise</th>
            <th>sets x reps</th>
            <th>weight</th>
          </tr>
          {workout.exercises.map(exercise => {
            return (
              <tr key={exercise.name}>
                <th>{exercise.name}</th>
                <td>{`${exercise.sets} x ${exercise.reps} ${
                  exercise.amrap ? "+ 1xAMRAP" : ""
                }`}</td>
                <td>
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
      <Link className="nextWorkout__startWorkoutButton" to="/workout">
        Start Workout
      </Link>
    </div>
  );
};
