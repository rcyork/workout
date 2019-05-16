import React from "react";
import { Link } from "react-router-dom";
import "./NextWorkout.css";

export const NextWorkout = ({ workout }) => {
  return (
    <div className="nextWorkout">
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
                <td>
                  {exercise.sets} x {exercise.reps}
                </td>
                <td>{exercise.weight === null ? 0 : exercise.weight}</td>
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
