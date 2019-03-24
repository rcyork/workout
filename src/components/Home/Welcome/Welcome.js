import React from "react";

import { WORKOUTS } from "../../../workouts";
import { Snapshot } from "../../Snapshot/Snapshot";
import { ConfirmButton } from "../../ConfirmButton/ConfirmButton";

import "./Welcome.css";

export const Welcome = () => {
  const data = WORKOUTS.find(workout => workout.id === "wad1").exercises;

  return (
    <div className="welcome">
      <div className="welcomeCard">
        <h1 className="welcomeCard__title">About</h1>
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
      <Snapshot data={data} />
      <ConfirmButton text="Start First Workout" type="redirect" />
    </div>
  );
};
