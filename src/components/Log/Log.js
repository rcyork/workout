import React from "react";

import { Snapshot } from "../Snapshot/Snapshot";
import { Button } from "../Button/Button";

import "./Log.css";

export const Log = ({ log, deleteLogEntry, isLogEmpty }) => {
  return (
    <div className="log">
      <Button text="back" type="cancel" destination="/" />
      {isLogEmpty ? (
        <h2 className="emptyLogMessage">You have no workout history.</h2>
      ) : (
        log.map(item => {
          const workout = item;
          const weights = item.exercises.map(exercise => {
            return { name: exercise.name, weight: exercise.weight };
          });

          return (
            <Snapshot
              deleteLogEntry={deleteLogEntry}
              workout={workout}
              weights={weights}
              key={item.key}
              isLogCard={true}
              isLogEmpty={isLogEmpty}
            />
          );
        })
      )}
    </div>
  );
};
