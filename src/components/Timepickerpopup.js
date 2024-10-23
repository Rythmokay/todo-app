import React, { useState } from "react";

const TimePickerPopup = ({ onSetTime, onClose }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    onSetTime(totalTime);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Set Timer</h2>
        <form onSubmit={handleSubmit}>
          <div className="time-inputs">
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="hh" />
            <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="mm" />
            <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="ss" />
          </div>
          <div className="popup-buttons">
            <button type="submit" className="set-time-btn">Set Time</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimePickerPopup;
