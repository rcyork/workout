import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Welcome } from "./components/Home/Welcome/Welcome";
import { ActiveWorkout } from "./components/ActiveWorkout/ActiveWorkout";
import { WORKOUTS } from "./workouts";
import "./App.css";

function getIsCollectingData(workingWeights) {
  return workingWeights.some(item => item.value === null);
}

class App extends Component {
  state = {
    nextWorkout: WORKOUTS.find(workout => workout.id === "wad1").exercises,
    firstVisit: true,
    workingWeights: [
      { name: "deadlift", value: null },
      { name: "row", value: null },
      { name: "squat", value: null },
      { name: "bench", value: null },
      { name: "ohp", value: null },
      { name: "chinup", value: 0 }
    ]
  };

  increment = (currentNumber, exercise) => {
    this.setState(prevState => {
      return {
        workingWeights: prevState.workingWeights.map(item => {
          if (item.name === exercise) {
            return { ...item, value: (currentNumber += 5) };
          } else {
            return {
              ...item
            };
          }
        })
      };
    });
  };

  decrement = (currentNumber, exercise) => {
    this.setState(prevState => {
      return {
        workingWeights: prevState.workingWeights.map(item => {
          if (item.name === exercise) {
            return { ...item, value: (currentNumber -= 5) };
          } else {
            return {
              ...item
            };
          }
        })
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
                  exercises={this.state.nextWorkout}
                  modifier={modifier}
                  weights={this.state.workingWeights}
                  increment={this.increment}
                  decrement={this.decrement}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
