import React from "react";

import { WORKOUTS } from "../../../workouts";
import { Snapshot } from "../../Snapshot/Snapshot";
import { Button } from "../../Button/Button";
import { AboutCard } from "./AboutCard/AboutCard";

import "./Welcome.css";

export const Welcome = ({ weights, firstVisit, setFirstVisitToFalse }) => {
  const workout = WORKOUTS.find(workout => workout.id === "wad1");

  return (
    <div className={`${firstVisit ? "firstVisit" : ""} welcome`}>
      {firstVisit ? <AboutCard /> : null}
      <Snapshot workout={workout} weights={weights} title="next workout" />
      <Button
        text={firstVisit ? "start first workout" : "start next workout"}
        destination="/active-workout"
        type="confirm"
        onClick={firstVisit ? setFirstVisitToFalse : undefined}
      />
      {!firstVisit ? (
        <Button text="view log" destination="/log" type="nav" />
      ) : null}
    </div>
  );
};
