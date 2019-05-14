import React, { useState } from "react";

import { INTIAL_WEIGHTS } from "./utils/initialWeights";
import { WORKOUTS } from "./utils/workouts";

import Main from "./components/Main/Main";

export default function App() {
  const [weights, setWeight] = useState(INTIAL_WEIGHTS);
  const [log, setLog] = useState([]);
  const [workout, setWorkout] = useState(
    WORKOUTS.find(workout => workout.id === "wad1")
  );

  return <Main workout={workout} />;
}
