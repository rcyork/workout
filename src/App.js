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
  const [log, setLog] = useState(
    JSON.parse(localStorage.getItem("log")) ||
      [
        // {
        //   date: new Date(),
        //   id: "wad1",
        //   exercises: [
        //     {
        //       name: "bench",
        //       sets: 4,
        //       reps: 4,
        //       amrap: false,
        //       weight: 100,
        //       completed: true
        //     },
        //     {
        //       name: "squat",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 110,
        //       completed: false
        //     },
        //     {
        //       name: "ohp",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 120,
        //       completed: true
        //     },
        //     {
        //       name: "chinup",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 130,
        //       completed: false
        //     }
        //   ]
        // },
        // {
        //   date: 1558131770591,
        //   id: "wad1",
        //   exercises: [
        //     {
        //       name: "bench",
        //       sets: 4,
        //       reps: 4,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "squat",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     },
        //     {
        //       name: "ohp",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "chinup",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     }
        //   ]
        // },
        // {
        //   date: 1558131760591,
        //   id: "wad1",
        //   exercises: [
        //     {
        //       name: "bench",
        //       sets: 4,
        //       reps: 4,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "squat",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     },
        //     {
        //       name: "ohp",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "chinup",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     }
        //   ]
        // },
        // {
        //   date: 1558131730591,
        //   id: "wad1",
        //   exercises: [
        //     {
        //       name: "bench",
        //       sets: 4,
        //       reps: 4,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "squat",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     },
        //     {
        //       name: "ohp",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "chinup",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     }
        //   ]
        // },
        // {
        //   date: 1558131720591,
        //   id: "wad1",
        //   exercises: [
        //     {
        //       name: "bench",
        //       sets: 4,
        //       reps: 4,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "squat",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     },
        //     {
        //       name: "ohp",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "chinup",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     }
        //   ]
        // },
        // {
        //   date: 1558131744591,
        //   id: "wad1",
        //   exercises: [
        //     {
        //       name: "bench",
        //       sets: 4,
        //       reps: 4,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "squat",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     },
        //     {
        //       name: "ohp",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: true
        //     },
        //     {
        //       name: "chinup",
        //       sets: 4,
        //       reps: 8,
        //       amrap: false,
        //       weight: 200,
        //       completed: false
        //     }
        //   ]
        // }
      ]
  );
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

      // let calculatedWeight = correspondingWeight.weight;
      // if (correspondingWeight.failuresInARow >= 2) {
      //   // if they've failed twice then deload and set failures in a row to 0
      //   calculatedWeight = calculatedWeight * 0.9;
      // } else if (correspondingWeight.lastAmrapWasAboveEight) {
      //   // if they're latest amrap is 8 or more then double progression
      //   calculatedWeight =
      //     calculatedWeight + correspondingWeight.progressionRate * 2;
      // } else if (correspondingWeight.haveDoneThisWeek === false) {
      //   // do normal progression as long as it's the first time doing the correspondingWeight this week
      //   calculatedWeight =
      //     calculatedWeight + correspondingWeight.progressionRate;
      // }

      return { ...exercise, weight: correspondingWeight };
    })
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Main workout={formattedWorkout} />}
          />
          <Route
            exact
            path="/workout"
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
