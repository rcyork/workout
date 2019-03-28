import React from "react";

import { Snapshot } from "../Snapshot/Snapshot";
import { Button } from "../Button/Button";

import "./Log.css";

export const Log = ({ log }) => {
  return (
    <div className="log">
      <Button text="back" type="cancel" destination="/" />
      {log.map(item => {
        const workout = item;
        const weights = item.exercises.map(exercise => {
          return { name: exercise.name, weight: exercise.weight };
        });

        return (
          <Snapshot
            title="test"
            workout={workout}
            weights={weights}
            key={item.key}
          />
        );
      })}
    </div>
  );
};
