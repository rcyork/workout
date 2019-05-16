import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Workout.css";

export const Workout = ({ workout, log, setLog }) => {
  const [userEnteredWeights, setUserEnteredWeights] = useState([
    { name: "deadlift", weight: 0, completed: false },
    { name: "row", weight: 0, completed: false },
    { name: "squat", weight: 0, completed: false },
    { name: "bench", weight: 0, completed: false },
    { name: "ohp", weight: 0, completed: false },
    { name: "chinup", weight: 0, completed: false }
  ]);
  const needsUserInput = workout.exercises.some(
    exercise => exercise.weight === 0 || exercise.weight === null
  );

  const increment = (name, factor) => {
    setUserEnteredWeights(userEnteredWeights => {
      return userEnteredWeights.map(exercise => {
        if (exercise.name !== name) {
          return { ...exercise };
        }
        return { ...exercise, weight: exercise.weight + factor };
      });
    });
  };

  const decrement = (name, factor) => {
    setUserEnteredWeights(userEnteredWeights => {
      return userEnteredWeights.map(exercise => {
        if (exercise.name !== name) {
          return { ...exercise };
        }
        return { ...exercise, weight: exercise.weight - factor };
      });
    });
  };

  const onCompletedChange = name => {
    setUserEnteredWeights(userEnteredWeights => {
      return userEnteredWeights.map(exercise => {
        if (exercise.name !== name) {
          return { ...exercise };
        }

        return { ...exercise, completed: !exercise.completed };
      });
    });
  };

  return (
    <div className="workout">
      <Link to="/">Cancel</Link>
      <div className="workoutCard">
        <table>
          <tbody>
            <tr>
              <th>Exercise</th>
              <th>Sets x Reps</th>
              <th>Weight</th>
              <th>Completed?</th>
            </tr>
            {workout.exercises.map(exercise => {
              return (
                <tr key={exercise.name}>
                  <th>{exercise.name}</th>
                  <td>
                    {exercise.sets} x {exercise.reps}
                  </td>
                  <td>
                    {(needsUserInput && exercise.weight === 0) ||
                    exercise.weight === null ? (
                      <div>
                        <button onClick={() => decrement(exercise.name, 5)}>
                          <span role="img" aria-label="plus">
                            ➖
                          </span>
                        </button>
                        <span>
                          {
                            userEnteredWeights.find(
                              item => item.name === exercise.name
                            ).weight
                          }
                        </span>
                        <button onClick={() => increment(exercise.name, 5)}>
                          <span role="img" aria-label="minus">
                            ➕
                          </span>
                        </button>
                      </div>
                    ) : (
                      exercise.weight
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => onCompletedChange(exercise.name)}
                      checked={
                        userEnteredWeights.find(
                          item => item.name === exercise.name
                        ).completed
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link
        to="/"
        onClick={() =>
          setLog(log =>
            log.concat({
              ...workout,
              exercises: workout.exercises.map(exercise => {
                const correspondingExercise = userEnteredWeights.find(
                  item => item.name === exercise.name
                );
                // use userEnteredWeight if it's there, otherwise use intital weight
                const appropriateWeight =
                  correspondingExercise.weight === 0
                    ? exercise.weight
                    : correspondingExercise.weight;

                return {
                  ...exercise,
                  weight: appropriateWeight,
                  completed: correspondingExercise.completed
                };
              })
            })
          )
        }
      >
        Save Workout
      </Link>
    </div>
  );
};
