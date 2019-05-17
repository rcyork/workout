import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { WORKOUT_NAMES } from "../../utils/workoutNames";

import "./Log.css";

export const Log = ({ log, setLog }) => {
  const deleteLogEntry = date => {
    setLog(log => {
      return log.filter(entry => {
        return entry.date !== date;
      });
    });
  };

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
            <button
              className="logCard__banner__delete"
              onClick={() => deleteLogEntry(logEntry.date)}
            >
              <i className="fas fa-times" />
            </button>
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
