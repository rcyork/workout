import React from "react";

import { WORKOUTS } from "../../../workouts";
import { Snapshot } from "../../Snapshot/Snapshot";
import { Button } from "../../Button/Button";

import "./Welcome.css";

export const Welcome = ({ weights, firstVisit }) => {
  const exercises = WORKOUTS.find(workout => workout.id === "wad1").exercises;

  return (
    <div className={`${firstVisit ? "firstVisit" : ""} welcome`}>
      <div className="welcomeCard">
        <h1 className="welcomeCard__title">about</h1>
        <ul className="welcomeCard__bullets">
          <li className="welcomeCard__bullet">three workouts per week</li>
          <li className="welcomeCard__bullet">
            enter your weights once and we'll do the math for you
          </li>
          <li className="welcomeCard__bullet">
            automated deload if weights become too difficult
          </li>
          <li className="welcomeCard__bullet">
            view and edit your log of completed workouts
          </li>
        </ul>
      </div>
      <Snapshot exercises={exercises} weights={weights} />
      <Button
        text="start first workout"
        destination="/active-workout"
        type="confirm"
      />
    </div>
  );
};
