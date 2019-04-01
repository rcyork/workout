import React from "react";

import "./AboutCard.css";

export const AboutCard = () => {
  return (
    <div className="aboutCard">
      <h1 className="aboutCard__title">about</h1>
      <ul className="aboutCard__bullets">
        <li className="aboutCard__bullet">three workouts per week</li>
        <li className="aboutCard__bullet">
          enter your weights once and we'll do the math for you
        </li>
        <li className="aboutCard__bullet">
          automated deload if weights become too difficult
        </li>
        <li className="aboutCard__bullet">
          view and edit your log of completed workouts
        </li>
      </ul>
    </div>
  );
};
