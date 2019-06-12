import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { INTIAL_WEIGHTS } from "./utils/initialWeights";
import { WORKOUTS } from "./utils/workouts";

import { Main } from "./components/Main/Main";
import { Log } from "./components/Log/Log";
import { Workout } from "./components/Workout/Workout";

import "./App.css";

export const App = () => {
  const [weights, setWeights] = useState(
    JSON.parse(localStorage.getItem("weights")) || INTIAL_WEIGHTS
  );
  const [log, setLog] = useState(JSON.parse(localStorage.getItem("log")) || []);
  const [workout, setWorkout] = useState(
    JSON.parse(localStorage.getItem("workout")) ||
      WORKOUTS.find(workout => workout.id === "wad1")
  );

  useEffect(() => {
    localStorage.setItem("workout", JSON.stringify(workout));
  });

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
  });

  useEffect(() => {
    localStorage.setItem("weights", JSON.stringify(weights));
  });

  const formattedWorkout = {
    ...workout,
    exercises: workout.exercises.map(exercise => {
      const correspondingWeight = weights.find(
        item => item.name === exercise.name
      ).weight;

      return { ...exercise, weight: correspondingWeight };
    })
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/workout"
            render={() => <Main workout={formattedWorkout} />}
          />
          <Route
            exact
            path="/active-workout"
            render={() => (
              <Workout
                workout={formattedWorkout}
                log={log}
                setLog={setLog}
                setWeights={setWeights}
                weights={weights}
                setWorkout={setWorkout}
              />
            )}
          />
          <Route
            exact
            path="/log"
            render={() => <Log log={log} setLog={setLog} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
