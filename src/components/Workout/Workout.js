import React from "react";

import { Button } from "../Button/Button";

import "./Workout.css";

import { roundToNearestFive } from "../../roundToNearestFive";

export class Workout extends React.Component {
  state = {
    thisWorkoutsWeights: [
      { name: "deadlift", weight: null, completed: true, amrapNumber: 0 },
      { name: "row", weight: null, completed: true, amrapNumber: 0 },
      { name: "squat", weight: null, completed: true, amrapNumber: 0 },
      { name: "bench", weight: null, completed: true, amrapNumber: 0 },
      { name: "ohp", weight: null, completed: true, amrapNumber: 0 },
      { name: "chinup", weight: null, completed: true, amrapNumber: 0 }
    ]
  };

  increment = (exercise, factor, key) => {
    this.setState(prevState => {
      return {
        thisWorkoutsWeights: prevState.thisWorkoutsWeights.map(item => {
          if (item.name === exercise) {
            return { ...item, [key]: item[key] + factor };
          } else {
            return {
              ...item
            };
          }
        })
      };
    });
  };

  decrement = (exercise, factor, key) => {
    this.setState(prevState => {
      return {
        thisWorkoutsWeights: prevState.thisWorkoutsWeights.map(item => {
          if (item.name === exercise) {
            return { ...item, [key]: item[key] - factor };
          } else {
            return {
              ...item
            };
          }
        })
      };
    });
  };

  updateExerciseStatus = exercise => {
    this.setState(prevState => {
      return {
        thisWorkoutsWeights: prevState.thisWorkoutsWeights.map(item => {
          if (item.name !== exercise) {
            return item;
          }
          return { ...item, completed: !item.completed };
        })
      };
    });
  };

  render() {
    const {
      workout,
      weights,
      modifier,
      logWorkout,
      destination,
      isLogCard
    } = this.props;

    const filteredWeights = weights.filter(item =>
      workout.exercises.find(entry => entry.name === item.name)
    );

    const calculatedWeights = filteredWeights.map(item => {
      const itemWeight = item.isTimeToDeload
        ? item.weight * 0.9
        : item.isTimeToDoubleProgress
        ? item.weight + item.progressionRate * 2
        : item.isTimeToProgress
        ? item.weight + item.progressionRate
        : item.weight;

      const finalWeight =
        workout.exercises.find(entry => entry.name === item.name).reps === 8
          ? itemWeight * 0.9
          : itemWeight;

      return { ...item, weight: roundToNearestFive(finalWeight) };
    });

    const { increment, decrement } = this;
    const formattedWorkout = workout.exercises.map(exercise => {
      const weight = isLogCard
        ? weights.find(item => item.name === exercise.name).weight
        : calculatedWeights.find(item => item.name === exercise.name).weight;
      return { ...exercise, weight };
    });

    return (
      <div className={`workout ${modifier}`}>
        <div className={`workout__tableWrap`}>
          <table className={`workout__table`}>
            <tbody>
              <tr className={`workout__table__labels`}>
                <th scope="col" align="left">
                  exercises
                </th>
                <th scope="col" align="center">
                  sets x reps
                </th>
                {(modifier === "normal" || modifier === "isCollectingData") &&
                formattedWorkout.some(item => item.amrap) ? (
                  <th align="center">AMRAP#</th>
                ) : null}

                <th
                  scope="col"
                  align={
                    modifier === "snapshot" || "isCalculatingData"
                      ? "right"
                      : "center"
                  }
                >
                  weight
                </th>
                {modifier === "normal" || modifier === "isCollectingData" ? (
                  <th align="right">
                    <span role="img" aria-label="checkmark">
                      ✔️
                    </span>
                    ?
                  </th>
                ) : null}
              </tr>
              <>
                {formattedWorkout.map(exercise => (
                  <tr key={exercise.name} className="row">
                    <td align="left" className="cell">
                      {exercise.name}
                    </td>
                    <td align="center" className="cell">
                      {exercise.amrap
                        ? `${exercise.sets}x${exercise.reps} + 1xAMRAP`
                        : `${exercise.sets}x${exercise.reps}`}
                    </td>
                    {(modifier === "normal" ||
                      modifier === "isCollectingData") &&
                    exercise.amrap ? (
                      <td className="inputtingReps">
                        <>
                          <button
                            className="decrement"
                            data-name={exercise.name}
                            onClick={() =>
                              decrement(exercise.name, 1, "amrapNumber")
                            }
                          >
                            -
                          </button>
                          <span className="adjustableWeight">
                            {this.state.thisWorkoutsWeights.find(
                              item => item.name === exercise.name
                            ).amrapNumber || 0}
                          </span>
                          <button
                            className="increment"
                            data-name={exercise.name}
                            onClick={() =>
                              increment(exercise.name, 1, "amrapNumber")
                            }
                          >
                            +
                          </button>
                        </>
                      </td>
                    ) : (modifier === "normal" ||
                        modifier === "isCollectingData") &&
                      !exercise.amrap ? (
                      <td />
                    ) : null}
                    <td
                      className={`weight ${
                        isLogCard && exercise.completed
                          ? "completed"
                          : isLogCard && exercise.completed === false
                          ? "incomplete"
                          : ""
                      } ${
                        (calculatedWeights.find(
                          item => item.name === exercise.name
                        ).weight === null &&
                          (modifier === "isCollectingData" ||
                            modifier === "normal")) ||
                        (calculatedWeights.find(
                          item => item.name === exercise.name
                        ).weight === 0 &&
                          (modifier === "isCollectingData" ||
                            modifier === "normal"))
                          ? "inputtingWeight"
                          : ""
                      }`}
                      align={
                        modifier === "snapshot" || "isCalculatingData"
                          ? "right"
                          : "center"
                      }
                    >
                      {(exercise.weight === null &&
                        (modifier === "isCollectingData" ||
                          modifier === "normal")) ||
                      (exercise.weight === 0 &&
                        (modifier === "isCollectingData" ||
                          modifier === "normal")) ? (
                        <>
                          <button
                            className="decrement"
                            data-name={exercise.name}
                            onClick={() =>
                              decrement(exercise.name, 5, "weight")
                            }
                          >
                            -
                          </button>
                          <span className="adjustableWeight">
                            {this.state.thisWorkoutsWeights.find(
                              item => item.name === exercise.name
                            ).weight || 0}
                          </span>
                          <button
                            className="increment"
                            data-name={exercise.name}
                            onClick={() =>
                              increment(exercise.name, 5, "weight")
                            }
                          >
                            +
                          </button>
                        </>
                      ) : exercise.weight === null || exercise.weight === 0 ? (
                        "?"
                      ) : (
                        exercise.weight
                      )}
                    </td>
                    {(modifier === "normal" ||
                      modifier === "isCollectingData") &&
                    exercise.weight ? (
                      <td align="right" className="cell checkboxWrap">
                        <input
                          type="checkbox"
                          checked={
                            this.state.thisWorkoutsWeights.find(
                              item => item.name === exercise.name
                            ).completed
                          }
                          onChange={() =>
                            this.updateExerciseStatus(exercise.name)
                          }
                        />
                      </td>
                    ) : (
                      <td />
                    )}
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
        {modifier === "snapshot" ? null : (
          <Button
            text="complete workout"
            destination={destination}
            type="confirm"
            onClick={() => {
              logWorkout({
                id: workout.id,
                key: new Date(),
                exercises: workout.exercises.map(item => {
                  return {
                    ...item,
                    weight: formattedWorkout.find(
                      entry => entry.name === item.name
                    ).weight
                      ? formattedWorkout.find(entry => entry.name === item.name)
                          .weight
                      : this.state.thisWorkoutsWeights.find(
                          entry => entry.name === item.name
                        ).weight,
                    completed: this.state.thisWorkoutsWeights.find(
                      entry => entry.name === item.name
                    ).completed,
                    amrap: this.state.thisWorkoutsWeights.find(
                      entry => entry.name === item.name
                    ).amrapNumber
                  };
                })
              });
            }}
          />
        )}
      </div>
    );
  }
}
