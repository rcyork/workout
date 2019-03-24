import React from "react";

import "./ConfirmButton.css";

export const ConfirmButton = ({ type, text }) => {
  return <button className={`${type}Button`}>{text}</button>;
};
