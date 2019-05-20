import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { INTIAL_WEIGHTS } from "./utils/initialWeights";
import { WORKOUTS } from "./utils/workouts";
import { roundToNearestFive } from "./utils/roundToNearestFive";

import { Main } from "./components/Main/Main";
import { Log } from "./components/Log/Log";
import { Workout } from "./components/Workout/Workout";

export const App = () => {
  const [weights, setWeights] = useState(INTIAL_WEIGHTS);
  const [log, setLog] = useState([
    {
      date: new Date(),
      id: "wad1",
      exercises: [
        {
          name: "bench",
          sets: 4,
          reps: 4,
          amrap: false,
          weight: 100,
          completed: true
        },
        {
          name: "squat",
          sets: 4,
          reps: 8,
          amrap: false,
          weight: 110,
          completed: false
        },
        {
          name: "ohp",
          sets: 4,
          reps: 8,
          amrap: false,
          weight: 120,
          completed: true
        },
        {
          name: "chinup",
          sets: 4,
          reps: 8,
          amrap: false,
          weight: 130,
          completed: false
        }
      ]
    },
    {
      date: 1558131740591,
      id: "wad1",
      exercises: [
        {
          name: "bench",
          sets: 4,
          reps: 4,
          amrap: false,
          weight: 200,
          completed: true
        },
        {
          name: "squat",
          sets: 4,
          reps: 8,
          amrap: false,
          weight: 200,
          completed: false
        },
        {
          name: "ohp",
          sets: 4,
          reps: 8,
          amrap: false,
          weight: 200,
          completed: true
        },
        {
          name: "chinup",
          sets: 4,
          reps: 8,
          amrap: false,
          weight: 200,
          completed: false
        }
      ]
    }
  ]);
  const [workout, setWorkout] = useState(
    WORKOUTS.find(workout => workout.id === "wad3")
  );

  const calculatedWorkout = {
    ...workout,
    exercises: workout.exercises.map(exercise => {
      const correspondingWeight = weights.find(
        item => item.name === exercise.name
      );

      let calculatedWeight = correspondingWeight.weight;
      if (correspondingWeight.failuresInARow >= 2) {
        // if they've failed twice then deload and set failures in a row to 0
        calculatedWeight = calculatedWeight * 0.9;
      } else if (correspondingWeight.lastAmrapWasAboveEight) {
        // if they're latest amrap is 8 or more then double progression
        calculatedWeight =
          calculatedWeight + correspondingWeight.progressionRate * 2;
      } else if (correspondingWeight.haveDoneThisWeek === false) {
        // do normal progression as long as it's the first time doing the correspondingWeight this week
        calculatedWeight =
          calculatedWeight + correspondingWeight.progressionRate;
      }

      return { ...exercise, weight: calculatedWeight };
    })
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Main workout={calculatedWorkout} />}
        />
        <Route
          exact
          path="/workout"
          render={() => (
            <Workout
              workout={calculatedWorkout}
              log={log}
              setLog={setLog}
              setWeights={setWeights}
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
    </BrowserRouter>
  );
};
