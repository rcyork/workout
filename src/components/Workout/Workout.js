import React from "react";

import "./Workout.css";

export const Workout = ({ modifier, data }) => {
  return (
    <div className="workout">
      <div className={`workout__tableWrap`}>
        <table className={`workout__table`}>
          <tbody>
            <tr className={`workout__table__labels`}>
              <th scope="col" align="left">
                Exercises
              </th>
              <th scope="col" align="center">
                Sets x Reps
              </th>
              <th
                scope="col"
                align={modifier === "snapshot" ? "right" : "center"}
              >
                Weight
              </th>
            </tr>
            <>
              {data.map(exercise => (
                <tr key={exercise.type}>
                  <td align="left">{exercise.type}</td>
                  <td align="center">
                    {exercise.sets} x {exercise.reps}
                  </td>
                  <td align={modifier === "snapshot" ? "right" : "center"}>
                    ?
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};
