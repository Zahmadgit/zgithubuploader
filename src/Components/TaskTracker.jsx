import React from "react";
import useIndexedDB from "../Hooks/useIndexedDB";

const TaskTracker = () => {
  const {
    inputRef,
    taskList,
    deleteTask,
    saveTask,
    editIndex,
    setEditIndex,
    setEditInput,
    editInput,
    handleEditTask,
    handleEditConfirm,
  } = useIndexedDB();
  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Type out a task to do" />
      <button
        onClick={() =>
          saveTask(Date.now().toString(), {
            title: inputRef.current.value,
          })
        }
      >
        Add Task
      </button>
      {taskList.map((item, index) => (
        <div key={item.title}>
          {editIndex === index ? (
            <div>
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
              <button onClick={() => handleEditConfirm(index)}>Confirm</button>
              <button onClick={() => setEditIndex(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>{item.title}</h2>
              <button onClick={() => deleteTask(index)}>delete a task</button>
              <button onClick={() => handleEditTask(item.title, index)}>
                Edit a task
              </button>
            </div>
          )}
        </div>
      ))}
      {/*to actually get the value of input, we can set its ref, then use ref.current.value*/}
    </div>
  );
};

export default TaskTracker;
