import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { roundToNearestFive } from "../../utils/roundToNearestFive";
import { WORKOUT_NAMES } from "../../utils/workoutNames";
import { getNextWorkout } from "../../utils/getNextWorkout";

import "./Workout.css";

export const Workout = ({
  workout,
  setLog,
  setWeights,
  setWorkout,
  weights,
  log
}) => {
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
      <div className="workoutCard">
        <h2 className="workoutCard__title">
          {WORKOUT_NAMES.find(name => name.id === workout.id).fullName}
        </h2>
        <div className="workout__tableWrap">
          <table>
            <tbody>
              <tr className="workoutCard__columnLabels">
                <th align="left">Exercise</th>
                <th align="center">SetsxReps</th>
                {workoutContainsAmrapExercise ? <th>AMRAP</th> : null}
                <th align="center">Weight</th>
                <th>
                  <span role="img" aria-label="completed?" align="right">
                    ✅
                  </span>
                  ?
                </th>
              </tr>
              {workout.exercises.map(exercise => {
                return (
                  <tr key={exercise.name}>
                    <th align="left">{exercise.name}</th>
                    <td align="center">
                      {`${exercise.sets}x${exercise.reps} ${
                        exercise.amrap ? "+ 1xAMRAP" : ""
                      }`}
                    </td>
                    {workoutContainsAmrapExercise ? (
                      <td align="center">
                        {exercise.amrap ? (
                          <div>
                            <div>
                              <button
                                className="decrement"
                                onClick={() =>
                                  decrement(exercise.name, 1, "amrapNumber")
                                }
                              >
                                -
                              </button>
                              <span className="userEnteredValue">
                                {
                                  userEnteredWeights.find(
                                    item => item.name === exercise.name
                                  ).amrapNumber
                                }
                              </span>
                              <button
                                className="increment"
                                onClick={() =>
                                  increment(exercise.name, 1, "amrapNumber")
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}
                      </td>
                    ) : null}
                    <td align="center">
                      {(needsUserInput && exercise.weight === 0) ||
                      exercise.weight === null ? (
                        <div>
                          <button
                            className="decrement"
                            onClick={() =>
                              decrement(exercise.name, 5, "weight")
                            }
                          >
                            -
                          </button>
                          <span className="userEnteredValue">
                            {
                              userEnteredWeights.find(
                                item => item.name === exercise.name
                              ).weight
                            }
                          </span>
                          <button
                            className="increment"
                            onClick={() =>
                              increment(exercise.name, 5, "weight")
                            }
                          >
                            +
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
                        align="right"
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
      </div>
      <div className="workout__buttonsWrap">
        <Link to="/" className="workout__cancel">
          Cancel
        </Link>
        <Link
          to="/"
          className="workout__save"
          onClick={() => {
            setWeights(
              weights =>
                weights.map(weightsEntry => {
                  const endOfWeek = workout.id.endsWith("3");
                  const isExerciseFromThisWorkout = workout.exercises.some(
                    exercise => exercise.name === weightsEntry.name
                  );
                  const correspondingExercise = userEnteredWeights.find(
                    item => item.name === weightsEntry.name
                  );
                  console.log(weightsEntry.name, weightsEntry.failuresInARow);

                  return {
                    ...weightsEntry,
                    failuresInARow:
                      isExerciseFromThisWorkout === false
                        ? weightsEntry.failuresInARow // return intial value
                        : correspondingExercise.completed
                        ? 0 // reset to 0 if they completed the exercise
                        : weightsEntry.failuresInARow === 0
                        ? weightsEntry.failuresInARow + 1 // add one to failures in a row
                        : 0, // reset to zero because they've failed twice in a row and will now be deloaded
                    weight:
                      weightsEntry.failuresInARow === 0 &&
                      correspondingExercise.completed === false // failed for the first time -> try weight again
                        ? weightsEntry.weight
                        : weightsEntry.failuresInARow >= 1 &&
                          correspondingExercise.completed === false // failed twice in a row -> deload
                        ? weightsEntry.weight * 0.9
                        : correspondingExercise.amrap >= 8 // amrap >= 8 -> double progression
                        ? weightsEntry.weight + weightsEntry.progressionRate * 2
                        : endOfWeek // starting new week -> regular progression
                        ? weightsEntry.weight + weightsEntry.progressionRate
                        : weightsEntry.weight
                  };
                }),
              () => {
                localStorage.setItem("weights", JSON.stringify(weights));
              }
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
    </div>
  );
};

// things to set upon completion of workout
// all exercises failuresInARow to 0 as long as they completed the exercise
// all exercises in this workout haveDoneThisWeek to true
// if completeing the third workout of the week then set all exercises haveDoneThisWeek to false
// update exercises in this workouts weights
//
