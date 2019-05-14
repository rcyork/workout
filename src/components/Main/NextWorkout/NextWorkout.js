import React from "react";

import "./NextWorkout.css";

export default function NextWorkout({ workout }) {
  console.log(workout.exercises);

  return (
    <div className="nextWorkout">
      <table className="nextWorkout__table">
        <tr>
          <th>exercise</th>
          <th>sets x reps</th>
          <th>weight</th>
        </tr>
        {workout.exercises.map(exercise => {
          return (
            <tr>
              <th>{exercise.name}</th>
              <td>
                {exercise.reps} x {exercise.set}
              </td>
              <td>0</td>
            </tr>
          );
        })}
      </table>
      <button className="nextWorkout__startWorkoutButton">Start Workout</button>
    </div>
  );
}
