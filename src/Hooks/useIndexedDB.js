import React, { useEffect, useState, useRef } from "react";
import { get, set, del, clear, keys } from "../API/idbAPIHelper";

const useIndexedDB = () => {
  const [taskList, setTaskList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    getTask();
  }, []);

  const deleteTask = async (key, index) => {
    if (!key) {
      return;
    }
    console.log(key);
    try {
      await del(key);
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
    } catch (e) {
      console.log("broken asss shit: ", e);
    }
  };

  const getTask = async () => {
    try {
      //if I wanna get the Values for all the keys I need to get all keys first
      const responseKeys = await keys();
      console.log(responseKeys);
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
  return { inputRef, taskList, deleteTask, saveTask, getTask };
};

export default useIndexedDB;
