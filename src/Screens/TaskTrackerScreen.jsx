import React from "react";
import { useNavigate } from "react-router-dom";
import TaskTracker from "../Components/TaskTracker.jsx";
const TaskTrackerScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Gonna use this to persist and track tasks</h1>
      <button onClick={() => navigate("/")}>Go Back to Initial Screen</button>
      <TaskTracker />
    </div>
  );
};

export default TaskTrackerScreen;
