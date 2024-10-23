import React, { useEffect, useState } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TimePickerPopup from "./Timepickerpopup";

export const Todo = ({ task, deleteTodo, onTimeSet, handleTimerEnd }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(task.timer);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    if (timer === 0) {
      clearInterval(interval);
      handleTimerEnd(task.id);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, handleTimerEnd, task.id]);

  const startTimer = () => {
    if (timer > 0) setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);

  const endTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  const handleSetTime = (time) => {
    setTimer(time);
    onTimeSet(task.id, time);
    setShowTimePicker(false);
  };

  return (
    <div className={`Todo ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <p>{task.task}</p>
        {timer > 0 && (
          <span className="timer">
            {Math.floor(timer / 3600)}h {Math.floor((timer % 3600) / 60)}m {timer % 60}s
          </span>
        )}
      </div>
      <div className="action-buttons">
        <button className="set-timer-btn" onClick={() => setShowTimePicker(true)}>Set Timer</button>
        {timer > 0 && (
          <>
            {isRunning ? (
              <button className="pause-btn" onClick={pauseTimer}>⏸️</button>
            ) : (
              <button className="start-btn" onClick={startTimer}>▶️</button>
            )}
            <button className="end-btn" onClick={endTimer}>⏹️</button>
          </>
        )}
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => deleteTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
      {showTimePicker && <TimePickerPopup onSetTime={handleSetTime} onClose={() => setShowTimePicker(false)} />}
    </div>
  );
};
