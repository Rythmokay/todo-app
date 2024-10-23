import React, { useState } from 'react';


const TimePicker = ({ onConfirm, onCancel }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleConfirm = () => {
    const totalTime = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
    onConfirm(totalTime);
  };

  return (
    <div className="time-picker-modal">
      <div className="time-picker">
        <div className="time-input-group">
          <label>Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Math.max(0, e.target.value))}
            className="time-input"
            placeholder="0"
          />
        </div>
        <div className="time-input-group">
          <label>Hours</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Math.max(0, e.target.value))}
            className="time-input"
            placeholder="0"
          />
        </div>
        <div className="time-input-group">
          <label>Minutes</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, e.target.value))}
            className="time-input"
            placeholder="0"
          />
        </div>
        <div className="time-input-group">
          <label>Seconds</label>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Math.max(0, e.target.value))}
            className="time-input"
            placeholder="0"
          />
        </div>
      </div>
      <div className="time-picker-buttons">
        <button onClick={handleConfirm}>Set Time</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TimePicker;
