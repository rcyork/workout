import React from "react";

import "./Workout.css";

export const Workout = ({
  modifier,
  exercises,
  weights,
  increment,
  decrement
}) => {
  const formattedWorkout = exercises.map(exercise => {
    const weight = weights.find(item => item.name === exercise.name).value;
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
                  <td align="left">{exercise.name}</td>
                  <td align="center">
                    {exercise.sets} x {exercise.reps}
                  </td>
                  <td
                    className="weight"
                    align={
                      modifier === "snapshot" || "isCalculatingData"
                        ? "right"
                        : "center"
                    }
                  >
                    {modifier === "isCollectingData" ? (
                      <>
                        <button
                          className="decrement"
                          data-name={exercise.name}
                          onClick={() =>
                            decrement(exercise.weight || 0, exercise.name)
                          }
                        >
                          -
                        </button>
                        <span>{exercise.weight || 0}</span>
                        <button
                          className="increment"
                          data-name={exercise.name}
                          onClick={() =>
                            increment(exercise.weight || 0, exercise.name)
                          }
                        >
                          +
                        </button>
                      </>
                    ) : (
                      exercise.weight
                    )}
                  </td>
                  {modifier === "normal" ? (
                    <td align="right">
                      <input type="checkbox" />
                    </td>
                  ) : null}
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};
