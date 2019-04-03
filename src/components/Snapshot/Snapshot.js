import React from "react";

import moment from "moment";

import { Link } from "react-router-dom";

import { Workout } from "../Workout/Workout";

import "./Snapshot.css";

export const Snapshot = ({
  workout,
  weights,
  title,
  isLogCard,
  deleteLogEntry,
  isLogEmpty
}) => {
  return (
    <div className="snapshot">
      <h2 className={`snapshot__title ${isLogCard ? "isLogCard" : ""} `}>
        {title ? title : moment(workout.key).format("LL")}
        {isLogCard ? (
          <Link
            to={isLogEmpty ? "/" : "/log"}
            className="deleteLogEntry"
            onClick={() => deleteLogEntry(workout.key)}
          >
            <span className="fas fa-trash" />
          </Link>
        ) : null}
      </h2>
      <Workout
        workout={workout}
        modifier="snapshot"
        weights={weights}
        purpose={isLogCard ? "edit" : "log"}
        destination={isLogCard ? "/active-workout" : "/"}
      />
    </div>
  );
};
