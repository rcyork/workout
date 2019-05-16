import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { WORKOUT_NAMES } from "../../utils/workoutNames";

import "./Log.css";

export const Log = ({ log }) => {
  return (
    <div className="log">
      <Link to="/">home</Link>
      {log.map(logEntry => (
        <div className="logCard" key={logEntry.date}>
          <div className="logCard__banner">
            <h3>{moment(log.date).format("MMMM Do, YYYY")}</h3>
            <p>
              {WORKOUT_NAMES.find(workout => workout.name === log.id).fullName}
            </p>
          </div>
          <table className="logCard__table">
            <tbody>
              <tr>
                <th>exercise</th>
                <th>sets x reps</th>
                <th>weight</th>
                <th>completed?</th>
              </tr>
              {logEntry.exercises.map(exercise => {
                return (
                  <tr key={exercise.name}>
                    <th>{exercise.name}</th>
                    <td>
                      {exercise.sets} x {exercise.reps}
                    </td>
                    <td>{exercise.weight}</td>
                    <td>{exercise.completed ? "✅" : "❌"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
