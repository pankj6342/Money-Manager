import React, { useState } from "react";
import "./ToggleSwitch.css";

export const Switch = ({ label, isOn, handleToggle, colorOne, colorTwo }) => {
  return (
    <div className="toggle-container">
    <div>{label}</div>
    <div>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch`+label}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor={`switch`+label}
      >
        <span className={`switch-button`} >{isOn?'ON':'OFF'}</span>
      </label>
    </div>
    </div>
  );
};
