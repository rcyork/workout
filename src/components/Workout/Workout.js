import React from "react";

import { Button } from "../Button/Button";

import "./Workout.css";

export class Workout extends React.Component {
  state = {
    thisWorkoutscalculatedWeights: [
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
        thisWorkoutscalculatedWeights: prevState.thisWorkoutscalculatedWeights.map(
          item => {
            if (item.name === exercise) {
              return { ...item, weight: (currentNumber += 5) };
            } else {
              return {
                ...item
              };
            }
          }
        )
      };
    });
  };

  decrement = (currentNumber, exercise) => {
    this.setState(prevState => {
      return {
        thisWorkoutscalculatedWeights: prevState.thisWorkoutscalculatedWeights.map(
          item => {
            if (item.name === exercise) {
              return { ...item, weight: (currentNumber -= 5) };
            } else {
              return {
                ...item
              };
            }
          }
        )
      };
    });
  };

  render() {
    const {
      workout,
      weights,
      modifier,
      logWorkout,
      editWorkout,
      purpose,
      destination
    } = this.props;
    const calculatedWeights = weights.map(item => {
      const itemWeight = item.isTimeToDeload
        ? item.weight * 0.9
        : item.isFirstTimeThisWeek
        ? (item.weight += item.progressionRate)
        : item.weight;
      return { ...item, weight: itemWeight };
    });
    console.log(weights);

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
                                this.state.thisWorkoutscalculatedWeights.find(
                                  item => item.name === exercise.name
                                ).weight || 0,
                                exercise.name
                              )
                            }
                          >
                            -
                          </button>
                          <span className="adjustableWeight">
                            {this.state.thisWorkoutscalculatedWeights.find(
                              item => item.name === exercise.name
                            ).weight || 0}
                          </span>
                          <button
                            className="increment"
                            data-name={exercise.name}
                            onClick={() =>
                              increment(
                                this.state.thisWorkoutscalculatedWeights.find(
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
            text={purpose === "edit" ? "save" : "complete workout"}
            destination={destination}
            type="confirm"
            onClick={() => {
              purpose === "edit"
                ? editWorkout({
                    ...workout,
                    exercises: workout.exercises.map(item => {
                      return {
                        ...item,
                        weight: this.state.thisWorkoutscalculatedWeights.find(
                          entry => entry.name === item.name
                        ).weight
                          ? this.state.thisWorkoutscalculatedWeights.find(
                              entry => entry.name === item.name
                            ).weight
                          : item.weight
                      };
                    })
                  })
                : logWorkout({
                    id: workout.id,
                    key: new Date(),
                    exercises: workout.exercises.map(item => {
                      return {
                        ...item,
                        weight: calculatedWeights.find(
                          entry => entry.name === item.name
                        ).weight
                          ? calculatedWeights.find(
                              entry => entry.name === item.name
                            ).weight
                          : this.state.thisWorkoutscalculatedWeights.find(
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
