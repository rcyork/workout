import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";

import { Welcome } from "./components/Home/Welcome/Welcome";
import { ActiveWorkout } from "./components/ActiveWorkout/ActiveWorkout";
import { Log } from "./components/Log/Log";

import { roundToNearestFive } from "./roundToNearestFive";

import { WORKOUTS } from "./workouts";
import "./App.css";

function getIsCollectingData(workingWeights) {
  return workingWeights.some(item => item.weight === null);
}

class App extends React.Component {
  state = {
    nextWorkout: WORKOUTS.find(workout => workout.id === "wad3"),
    workoutToEdit: null,
    firstVisit: false,
    workingWeights: [
      {
        name: "deadlift",
        weight: 0,
        progressionRate: 15,
        isTimeToProgress: false,
        numberOfTimesFailedInARow: 0,
        isTimeToDeload: false,
        isTimeToDoubleProgress: false
      },
      {
        name: "row",
        weight: null,
        progressionRate: 10,
        isTimeToProgress: false,
        numberOfTimesFailedInARow: 0,
        isTimeToDeload: false,
        isTimeToDoubleProgress: false
      },
      {
        name: "squat",
        weight: 225,
        progressionRate: 15,
        isTimeToProgress: false,
        numberOfTimesFailedInARow: 0,
        isTimeToDeload: false,
        isTimeToDoubleProgress: false
      },
      {
        name: "bench",
        weight: 100,
        progressionRate: 10,
        isTimeToProgress: false,
        numberOfTimesFailedInARow: 0,
        isTimeToDeload: false,
        isTimeToDoubleProgress: false
      },
      {
        name: "ohp",
        weight: null,
        progressionRate: 5,
        isTimeToProgress: false,
        numberOfTimesFailedInARow: 0,
        isTimeToDeload: false,
        isTimeToDoubleProgress: false
      },
      {
        name: "chinup",
        weight: null,
        progressionRate: 5,
        isTimeToProgress: false,
        numberOfTimesFailedInARow: 0,
        isTimeToDeload: false,
        isTimeToDoubleProgress: false
      }
    ],
    log: [
      {
        id: "wad1",
        key: Date.now(),
        exercises: [
          {
            name: "bench",
            sets: 4,
            reps: 4,
            amrap: false,
            weight: null
          },
          {
            name: "squat",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 135
          },
          {
            name: "ohp",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 135
          },
          {
            name: "chinup",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 0
          }
        ]
      }
    ]
  };

  getNextWorkout = currentWorkout => {
    const index = WORKOUTS.findIndex(workout => workout.id === currentWorkout);
    if (index < WORKOUTS.length - 1) {
      return WORKOUTS[index + 1];
    }
    return WORKOUTS[0];
  };

  logWorkout = workout => {
    console.log(workout);

    // calculates 8 rep weights back to 4 rep weights to make calculating easier when generating next workout
    const fixedWeights = workout.exercises.map(exercise => {
      if (exercise.reps === 8) {
        return {
          ...exercise,
          weight: roundToNearestFive(exercise.weight / 0.9)
        };
      }
      return { ...exercise };
    });

    this.setState(prevState => {
      return {
        workingWeights: prevState.workingWeights.map(exercise => {
          const fixedWeight = fixedWeights.find(
            item => item.name === exercise.name
          );

          const foundItem = workout.exercises.find(
            item => item.name === exercise.name
          );

          return {
            ...exercise,
            weight: fixedWeight ? fixedWeight.weight : exercise.weight,
            numberOfTimesFailedInARow: !foundItem
              ? exercise.numberOfTimesFailedInARow
              : foundItem.completed
              ? false
              : exercise.numberOfTimesFailedInARow + 1,
            isTimeToDeload: exercise.numberOfTimesFailedInARow >= 2,
            isTimeToProgress: !foundItem
              ? exercise.isTimeToProgress
              : !foundItem.completed
              ? false
              : workout.id[3] === "3",

            isTimeToDoubleProgress: exercise.isTimeToDoubleProgress
              ? false
              : foundItem
              ? foundItem.amrap >= 8
              : false
          };
        }),
        nextWorkout: this.getNextWorkout(workout.id),
        log: [{ ...workout }, ...prevState.log]
      };
    });
  };

  deleteLogEntry = key => {
    this.setState(prevState => {
      return {
        log: prevState.log.filter(item => item.key !== key)
      };
    });
  };

  setFirstVisitToFalse = () => {
    this.setState({ firstVisit: false });
  };

  render() {
    const modifier = getIsCollectingData(this.state.workingWeights)
      ? "isCollectingData"
      : "normal";

    return (
      <div className="app">
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Welcome
                    nextWorkout={this.state.nextWorkout}
                    firstVisit={this.state.firstVisit}
                    weights={this.state.workingWeights}
                    setFirstVisitToFalse={this.setFirstVisitToFalse}
                  />
                )}
              />
              <Route
                exact
                path="/active-workout"
                render={() => {
                  return (
                    <ActiveWorkout
                      workout={this.state.nextWorkout}
                      modifier={modifier}
                      weights={this.state.workingWeights}
                      logWorkout={this.logWorkout}
                      isEditingLogEntry={this.state.workoutToEdit}
                      editWorkout={this.editWorkout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/log"
                render={() => (
                  <Log
                    log={this.state.log}
                    editWorkout={this.editWorkout}
                    deleteLogEntry={this.deleteLogEntry}
                    isLogEmpty={
                      this.state.log === undefined ||
                      this.state.log.length === 0
                    }
                  />
                )}
              />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
