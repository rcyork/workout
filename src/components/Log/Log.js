import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { WORKOUT_NAMES } from "../../utils/workoutNames";

import "./Log.css";

export const Log = ({ log, setLog }) => {
  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
  });

  const deleteLogEntry = date => {
    setLog(log => {
      return log.filter(entry => {
        return entry.date !== date;
      });
    });
  };

  return (
    <div className="log">
      <Link to="/workout" className="log__homeButton">
        <i className="fas fa-home" />
        home
      </Link>
      <div className="scrollingLog">
        {!log || log.length === 0 ? (
          <p>You have no completed workouts</p>
        ) : null}
        {log.map(logEntry => (
          <div className="logCard" key={logEntry.date}>
            <div className="logCard__banner">
              <div className="logCard__banner__titleWrap">
                <h3>{moment(logEntry.date).format("MMMM Do, YYYY")}</h3>
                <p>
                  {
                    WORKOUT_NAMES.find(workout => workout.name === log.id)
                      .fullName
                  }
                </p>
              </div>
              <button
                className="logCard__banner__delete"
                onClick={() => deleteLogEntry(logEntry.date)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="tableWrap">
              <table className="logCard__table">
                <tbody>
                  <tr className="columnLabels">
                    <th align="left">exercise</th>
                    <th align="center">SetsxReps</th>
                    <th align="center">weight</th>
                    <th align="right">
                      <span role="img" aria-label="checkmark">
                        ✔️
                      </span>
                      ?
                    </th>
                  </tr>
                  {logEntry.exercises.map(exercise => {
                    return (
                      <tr key={exercise.name}>
                        <th align="left">{exercise.name}</th>
                        <td align="center">
                          {`${exercise.sets}x${exercise.reps} ${
                            exercise.amrap ? "+ 1xAMRAP" : ""
                          }`}
                        </td>
                        <td align="center">{exercise.weight}</td>
                        <td align="right">
                          {exercise.completed ? "✅" : "❌"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
