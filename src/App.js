import React, { Component } from "react";
import { Welcome } from "./components/Home/Welcome/Welcome";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Welcome />
      </div>
    );
  }
}

export default App;
