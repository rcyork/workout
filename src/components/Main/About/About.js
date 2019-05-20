import React from "react";

import "./About.css";

export const About = () => {
  return (
    <div className="about">
      <h3 className="about__title">About</h3>
      <ul className="about__bullets">
        <li className="about__bullet">workout program aimed at beginners</li>
        <li className="about__bullet">
          enter weights once and we'll handle the rest
        </li>
        <li className="about__bullet">three workouts per week</li>
        <li className="about__bullet">
          automated progression and deload if necessary
        </li>
        <li className="about__bullet">
          test your strength with 'as many reps as possible' or AMRAP for short
        </li>
        <li className="about__bullet">
          if you test very well we will increase your weights to stay in line
          with your strength gains so you always keep improving
        </li>
      </ul>
    </div>
  );
};
