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
    firstVisit: false,
    workingWeights: [
      { name: "deadlift", weight: 0 },
      { name: "row", weight: 0 },
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
            weight: 135
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
      },
      {
        id: "wad2",
        key: new Date("02-18-1993"),
        exercises: [
          {
            name: "squat",
            sets: 4,
            reps: 4,
            amrap: false,
            weight: 135
          },
          {
            name: "deadlift",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 135
          },
          {
            name: "row",
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
      },
      {
        id: "wad2",
        key: new Date("02-18-1993"),
        exercises: [
          {
            name: "squat",
            sets: 4,
            reps: 4,
            amrap: false,
            weight: 135
          },
          {
            name: "deadlift",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 135
          },
          {
            name: "row",
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
      },
      {
        id: "wad2",
        key: new Date("02-18-1993"),
        exercises: [
          {
            name: "squat",
            sets: 4,
            reps: 4,
            amrap: false,
            weight: 135
          },
          {
            name: "deadlift",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 135
          },
          {
            name: "row",
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
      },
      {
        id: "wad2",
        key: new Date("02-18-1993"),
        exercises: [
          {
            name: "squat",
            sets: 4,
            reps: 4,
            amrap: false,
            weight: 135
          },
          {
            name: "deadlift",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 135
          },
          {
            name: "row",
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
      },
      {
        id: "wad2",
        key: new Date("02-18-1993"),
        exercises: [
          {
            name: "squat",
            sets: 4,
            reps: 4,
            amrap: false,
            weight: 135
          },
          {
            name: "deadlift",
            sets: 4,
            reps: 8,
            amrap: false,
            weight: 135
          },
          {
            name: "row",
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

  logWorkout = workout => {
    this.setState(prevState => {
      return {
        log: [{ ...workout }, ...prevState.log]
      };
    });
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
                  />
                )}
              />
              <Route
                exact
                path="/active-workout"
                render={() => (
                  <ActiveWorkout
                    workout={this.state.nextWorkout}
                    modifier={modifier}
                    weights={this.state.workingWeights}
                    increment={this.increment}
                    decrement={this.decrement}
                    logWorkout={this.logWorkout}
                  />
                )}
              />
              <Route
                exact
                path="/log"
                render={() => <Log log={this.state.log} />}
              />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
