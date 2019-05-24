import React from "react";

import "./About.css";

export const About = () => {
  return (
    <div className="about">
      <h3 className="about__title">About</h3>
      <ul className="about__bullets">
        <li className="about__bullet">Workout program aimed at beginners</li>
        <li className="about__bullet">
          Enter weights once and we'll handle the rest
        </li>
        <li className="about__bullet">Three workouts per week</li>
        <li className="about__bullet">
          Automated progression (and deload if necessary)
        </li>
        <li className="about__bullet">
          Test your strength with 'as many reps as possible' aka AMRAP sets
        </li>
        <li className="about__bullet">
          If you test very well we will increase your weights to stay in line
          with your strength gains so you always keep improving
        </li>
      </ul>
    </div>
  );
};
