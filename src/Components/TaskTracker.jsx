import React from "react";
import useIndexedDB from "../Hooks/useIndexedDB";

const TaskTracker = () => {
  const { inputRef, taskList, deleteTask, saveTask, getTask } = useIndexedDB();
  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Type out a task to do" />
      <button
        onClick={() =>
          saveTask(inputRef.current.value, {
            completed: false,
            title: inputRef.current.value,
          })
        }
      >
        Add Task
      </button>
      {taskList.map((item, index) => (
        <div key={item.title}>
          <h2>{item.title}</h2>
          <h4>{item.completed ? "Completed" : "Uncompleted"}</h4>
          <button onClick={() => deleteTask(item.title, index)}>
            delete a task
          </button>
        </div>
      ))}
      {/*to actually get the value of input, we can set its ref, then use ref.current.value*/}
    </div>
  );
};

export default TaskTracker;
