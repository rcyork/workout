import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";

import { Welcome } from "./components/Home/Welcome/Welcome";
import { ActiveWorkout } from "./components/ActiveWorkout/ActiveWorkout";
import { Log } from "./components/Log/Log";

import { WORKOUTS } from "./workouts";
import "./App.css";

function getIsCollectingData(workingWeights) {
  return workingWeights.some(item => item.weight === null);
}

class App extends React.Component {
  state = {
    nextWorkout: WORKOUTS.find(workout => workout.id === "wad1"),
    workoutToEdit: null,
    firstVisit: false,
    workingWeights: [
      { name: "deadlift", weight: null },
      { name: "row", weight: null },
      { name: "squat", weight: 225 },
      { name: "bench", weight: 135 },
      { name: "ohp", weight: null },
      { name: "chinup", weight: 0 }
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
            weight: null,
            isEditable: true
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
            isEditable: true,
            weight: 0
          }
        ]
      }
    ]
  };

  logWorkout = workout => {
    this.setState(prevState => {
      return {
        log: [{ ...workout }, ...prevState.log]
      };
    });
  };

  editWorkout = workout => {
    this.setState(prevState => {
      return {
        workoutToEdit: null,
        log: prevState.log.map(entry => {
          if (entry.key === workout.key) {
            return { ...workout };
          }
          return {
            ...entry
          };
        })
      };
    });
  };

  setWorkoutToEdit = id => {
    this.setState({ workoutToEdit: id });
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
                      workout={
                        this.state.workoutToEdit
                          ? this.state.log.find(
                              item => item.key === this.state.workoutToEdit
                            )
                          : this.state.nextWorkout
                      }
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
                    setWorkoutToEdit={this.setWorkoutToEdit}
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
