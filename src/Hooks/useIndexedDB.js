import React, { useEffect, useState, useRef } from "react";
import { get, set, del, clear, keys } from "../API/idbAPIHelper";

const useIndexedDB = () => {
  const [taskList, setTaskList] = useState([]);
  const [editInput, setEditInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  const [currentKeys, setCurrentKeys] = useState([]);

  useEffect(() => {
    getTask();
  }, [editIndex]);

  const deleteTask = async (index) => {
    console.log(index);
    try {
      await del(currentKeys[index]);
      //gotta skip the item and go to index for filer so do (_, i)
      setTaskList((prev) => prev.filter((_, i) => i != index));
    } catch (e) {
      console.log("delete task didnt work, sadge: ", e);
    }
  };
  const saveTask = async (key, value) => {
    try {
      await set(key, value);
      setTaskList((prev) => [...prev, value]);
      inputRef.current.value = null;
    } catch (e) {
      console.log("broken asss shit: ", e);
    }
  };

  const getTask = async () => {
    try {
      //if I wanna get the Values for all the keys I need to get all keys first
      const responseKeys = await keys();
      console.log(responseKeys);
      //plan on using this ref to get the key for the put operation
      setCurrentKeys(responseKeys);
      console.log("responseKeys: ", currentKeys);
      //alright lets use Promise.all now...
      //Promise.all returns a promise with an array of resolved values
      const waitingPromise = await Promise.all(
        responseKeys.map(async (keyItem) => {
          const responseValue = await get(keyItem);
          return responseValue;
        })
      );
      setTaskList(waitingPromise);
      console.log("list of values:", waitingPromise);
    } catch (e) {
      console.log("getting some shit did not work :sadface: ", e);
    }
  };
  const handleEditTask = (item, index) => {
    setEditInput(item);
    setEditIndex(index);
  };

  const handleEditConfirm = (index) => {
    setTaskList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...prev, title: editInput } : item
      )
    );
    saveTask(currentKeys[index], {
      completed: false,
      title: editInput,
    });
    setEditIndex(null);
    setEditInput("");
  };

  return {
    inputRef,
    taskList,
    deleteTask,
    saveTask,
    getTask,
    editIndex,
    editInput,
    setEditInput,
    setEditIndex,
    handleEditTask,
    handleEditConfirm,
  };
};

export default useIndexedDB;
