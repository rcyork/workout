import { WORKOUTS } from "./workouts";

export const getNextWorkout = id => {
  const nextWorkoutIndex = WORKOUTS.findIndex(workout => workout.id === id) + 1;
  if (nextWorkoutIndex === WORKOUTS.length) {
    return WORKOUTS[0];
  }
  return WORKOUTS[nextWorkoutIndex];
};
