import React from "react";

import moment from "moment";

import { Link } from "react-router-dom";

import { Workout } from "../Workout/Workout";

import "./Snapshot.css";

const workoutFullName = [
  { name: "wad1", fullText: "Week A: Day 1" },
  { name: "wad2", fullText: "Week A: Day 2" },
  { name: "wad3", fullText: "Week A: Day 3" },
  { name: "wbd1", fullText: "Week B: Day 1" },
  { name: "wbd2", fullText: "Week B: Day 2" },
  { name: "wbd3", fullText: "Week B: Day 3" }
];

export const Snapshot = ({
  workout,
  weights,
  title,
  isLogCard,
  deleteLogEntry,
  isLogEmpty
}) => {
  const workoutName = workoutFullName.find(item => item.name === workout.id)
    .fullText;
  return (
    <div className="snapshot">
      <div className={`snapshot__titleWrap ${isLogCard ? "isLogCard" : ""} `}>
        <h2 className="snapshot__title">
          {title ? title : moment(workout.key).format("LL")}
          <span className="snapshot__title__workoutId">{workoutName}</span>
        </h2>
        {isLogCard ? (
          <Link
            to={isLogEmpty ? "/" : "/log"}
            className="deleteLogEntry"
            onClick={() => deleteLogEntry(workout.key)}
          >
            <span className="fas fa-trash" />
          </Link>
        ) : null}
      </div>
      <Workout
        isLogCard={isLogCard}
        workout={workout}
        modifier="snapshot"
        weights={weights}
        purpose={isLogCard ? "edit" : "log"}
        destination={isLogCard ? "/active-workout" : "/"}
      />
    </div>
  );
};
