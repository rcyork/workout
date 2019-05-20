import React, { useState } from "react";
import { Link } from "react-router-dom";
import { roundToNearestFive } from "../../utils/roundToNearestFive";
import { getNextWorkout } from "../../utils/getNextWorkout";

import "./Workout.css";

export const Workout = ({ workout, setLog, setWeights, setWorkout }) => {
  const [userEnteredWeights, setUserEnteredWeights] = useState([
    { name: "deadlift", weight: 0, amrapNumber: 0, completed: false },
    { name: "row", weight: 0, amrapNumber: 0, completed: false },
    { name: "squat", weight: 0, amrapNumber: 0, completed: false },
    { name: "bench", weight: 0, amrapNumber: 0, completed: false },
    { name: "ohp", weight: 0, amrapNumber: 0, completed: false },
    { name: "chinup", weight: 0, amrapNumber: 0, completed: false }
  ]);
  const needsUserInput = workout.exercises.some(
    exercise => exercise.weight === 0 || exercise.weight === null
  );

  const increment = (name, factor, key) => {
    setUserEnteredWeights(userEnteredWeights => {
      return userEnteredWeights.map(exercise => {
        if (exercise.name !== name) {
          return { ...exercise };
        }
        return { ...exercise, [key]: exercise[key] + factor };
      });
    });
  };

  const decrement = (name, factor, key) => {
    setUserEnteredWeights(userEnteredWeights => {
      return userEnteredWeights.map(exercise => {
        if (exercise.name !== name) {
          return { ...exercise };
        }
        return { ...exercise, [key]: exercise[key] - factor };
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

  const workoutContainsAmrapExercise = workout.exercises.some(
    exercise => exercise.amrap
  );

  return (
    <div className="workout">
      <Link to="/">Cancel</Link>
      <div className="workoutCard">
        <table>
          <tbody>
            <tr>
              <th>Exercise</th>
              <th>Sets x Reps</th>
              {workoutContainsAmrapExercise ? <th>AMRAP #</th> : null}
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
                  {workoutContainsAmrapExercise ? (
                    <td>
                      {exercise.amrap ? (
                        <div>
                          <div>
                            <button
                              onClick={() =>
                                decrement(exercise.name, 1, "amrapNumber")
                              }
                            >
                              <span role="img" aria-label="plus">
                                ➖
                              </span>
                            </button>
                            <span>
                              {
                                userEnteredWeights.find(
                                  item => item.name === exercise.name
                                ).amrapNumber
                              }
                            </span>
                            <button
                              onClick={() =>
                                increment(exercise.name, 1, "amrapNumber")
                              }
                            >
                              <span role="img" aria-label="minus">
                                ➕
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </td>
                  ) : null}
                  <td>
                    {(needsUserInput && exercise.weight === 0) ||
                    exercise.weight === null ? (
                      <div>
                        <button
                          onClick={() => decrement(exercise.name, 5, "weight")}
                        >
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
                        <button
                          onClick={() => increment(exercise.name, 5, "weight")}
                        >
                          <span role="img" aria-label="minus">
                            ➕
                          </span>
                        </button>
                      </div>
                    ) : exercise.reps === 8 ? (
                      roundToNearestFive(exercise.weight * 0.9)
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
        onClick={() => {
          setWeights(weights =>
            weights.map(weightsEntry => {
              const endOfWeek = workout.id.endsWith("3");
              const isExerciseFromThisWorkout = workout.exercises.some(
                exercise => exercise.name === weightsEntry.name
              );
              const correspondingExercise = userEnteredWeights.find(
                item => item.name === weightsEntry.name
              );
              return {
                ...weightsEntry,
                haveDoneThisWeek: endOfWeek // if it's the end of the week reset all exercises to false otherwise just set the exercises done this workout to false
                  ? false
                  : isExerciseFromThisWorkout
                  ? false
                  : weightsEntry.haveDoneThisWeek,
                failuresInARow: !isExerciseFromThisWorkout // reset to 0 if they completed the exercise otherwise add 1
                  ? weightsEntry.failuresInARow
                  : correspondingExercise.completed
                  ? 0
                  : weightsEntry.failuresInARow + 1,
                weight:
                  correspondingExercise.weight === 0 // if there is a user entered weight then use that, otherwise just return the weight given in the workout plan
                    ? weightsEntry.weight
                    : correspondingExercise.weight,
                lastAmrapWasAboveEight: !isExerciseFromThisWorkout
                  ? weightsEntry.lastAmrapWasAboveEight
                  : correspondingExercise.amrapNumber >= 8
              };
            })
          );
          setWorkout(workout => (workout = getNextWorkout(workout.id)));
          setLog(log =>
            log.concat({
              ...workout,
              date: new Date(),
              exercises: workout.exercises.map(exercise => {
                const correspondingExercise = userEnteredWeights.find(
                  item => item.name === exercise.name
                );
                // use inital weight unless the user has entered a weight
                const appropriateWeight =
                  correspondingExercise.weight === 0
                    ? exercise.weight
                    : exercise.reps === 8
                    ? roundToNearestFive(correspondingExercise.weight / 0.9) // converts user entered weight into correct '4 rep weight' that we use to log weights over time
                    : correspondingExercise.weight;

                return {
                  ...exercise,
                  weight: appropriateWeight,
                  completed: correspondingExercise.completed
                };
              })
            })
          );
        }}
      >
        Save Workout
      </Link>
    </div>
  );
};

// things to set upon completion of workout
// all exercises failuresInARow to 0 as long as they completed the exercise
// all exercises in this workout haveDoneThisWeek to true
// if completeing the third workout of the week then set all exercises haveDoneThisWeek to false
// update exercises in this workouts weights
//
