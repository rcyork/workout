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
  editWorkout,
  setWorkoutToEdit
}) => {
  return (
    <div className="snapshot">
      <h2 className={`snapshot__title ${isLogCard ? "isLogCard" : ""} `}>
        {title ? title : moment(workout.key).format("LL")}
        {isLogCard ? (
          <Link
            className="editLogEntry"
            to="/active-workout"
            onClick={() => setWorkoutToEdit(workout.key)}
          >
            <span className="fas fa-pen" />
          </Link>
        ) : null}
      </h2>
      <Workout
        workout={workout}
        modifier="snapshot"
        weights={weights}
        editWorkout={editWorkout}
        purpose={isLogCard ? "edit" : "log"}
        destination={isLogCard ? "/active-workout" : "/"}
      />
    </div>
  );
};
