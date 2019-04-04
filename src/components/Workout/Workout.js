import React from "react";

import { Button } from "../Button/Button";

import "./Workout.css";

export class Workout extends React.Component {
  state = {
    thisWorkoutsWeights: [
      { name: "deadlift", weight: null },
      { name: "row", weight: null },
      { name: "squat", weight: null },
      { name: "bench", weight: null },
      { name: "ohp", weight: null },
      { name: "chinup", weight: null }
    ]
  };

  increment = (currentNumber, exercise) => {
    this.setState(prevState => {
      return {
        thisWorkoutsWeights: prevState.thisWorkoutsWeights.map(item => {
          if (item.name === exercise) {
            return { ...item, weight: (currentNumber += 5) };
          } else {
            return {
              ...item
            };
          }
        })
      };
    });
  };

  decrement = (currentNumber, exercise) => {
    this.setState(prevState => {
      return {
        thisWorkoutsWeights: prevState.thisWorkoutsWeights.map(item => {
          if (item.name === exercise) {
            return { ...item, weight: (currentNumber -= 5) };
          } else {
            return {
              ...item
            };
          }
        })
      };
    });
  };

  roundToTheNearestFive = currentNumber => {
    return Math.ceil(currentNumber / 5) * 5;
  };

  render() {
    const { workout, weights, modifier, logWorkout, destination } = this.props;

    const filteredWeights = weights.filter(item =>
      workout.exercises.find(entry => entry.name === item.name)
    );

    const calculatedWeights = filteredWeights.map(item => {
      const itemWeight = item.isTimeToDeload
        ? item.weight * 0.9
        : item.isFirstTimeThisWeek
        ? (item.weight += item.progressionRate)
        : item.weight;

      const finalWeight =
        workout.exercises.find(entry => entry.name === item.name).reps === 8
          ? itemWeight * 0.9
          : itemWeight;

      return { ...item, weight: this.roundToTheNearestFive(finalWeight) };
    });

    const { increment, decrement } = this;
    const formattedWorkout = workout.exercises.map(exercise => {
      const weight = calculatedWeights.find(item => item.name === exercise.name)
        .weight;
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
                {modifier === "normal" ? (
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
                      {exercise.sets} x {exercise.reps}
                    </td>
                    <td
                      className={
                        (calculatedWeights.find(
                          item => item.name === exercise.name
                        ).weight === null &&
                          modifier === "isCollectingData") ||
                        (calculatedWeights.find(
                          item => item.name === exercise.name
                        ).weight === 0 &&
                          modifier === "isCollectingData")
                          ? "inputtingWeight"
                          : ""
                      }
                      align={
                        modifier === "snapshot" || "isCalculatingData"
                          ? "right"
                          : "center"
                      }
                    >
                      {(exercise.weight === null &&
                        modifier === "isCollectingData") ||
                      (exercise.weight === 0 &&
                        modifier === "isCollectingData") ? (
                        <>
                          <button
                            className="decrement"
                            data-name={exercise.name}
                            onClick={() =>
                              decrement(
                                this.state.thisWorkoutsWeights.find(
                                  item => item.name === exercise.name
                                ).weight || 0,
                                exercise.name
                              )
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
                              increment(
                                this.state.thisWorkoutsWeights.find(
                                  item => item.name === exercise.name
                                ).weight || 0,
                                exercise.name
                              )
                            }
                          >
                            +
                          </button>
                        </>
                      ) : exercise.weight === null ? (
                        "?"
                      ) : (
                        exercise.weight
                      )}
                    </td>
                    {(modifier === "normal" ||
                      modifier === "isCollectingData") &&
                    exercise.weight ? (
                      <td align="right" className="cell">
                        <input type="checkbox" />
                      </td>
                    ) : null}
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
                        ).weight
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
