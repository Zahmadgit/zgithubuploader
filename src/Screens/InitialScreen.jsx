import React, { useState, useRef, useEffect } from "react";
import NoteUploader from "../Components/NoteUploader.jsx";
import SexyImage from "../Components/SexyImage.jsx";
import Products from "../Components/Products.jsx";
import { useNavigate } from "react-router-dom";
import { testAutoCorrect } from "zautocorrect";
const InitialScreen = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const correctWordsRef = useRef([]);
  const checkWordCorrectHandler = (word) => {
    let wordsArr = testAutoCorrect(word);
    setCorrectWords([wordsArr]);
    console.log(correctWords);
  };

  return (
    <div style={{ padding: 16 }}>
      <input
        type="text"
        value={inputVal}
        placeholder="Lets test zautocorrect"
        onChange={(e) => {
          setInputVal(e.target.value);
          checkWordCorrectHandler(e.target.value);
        }}
      />

      {correctWords.map((word, idx) => (
        <div
          key={idx}
          onClick={() => {
            correctWordsRef.current.value = correctWords[idx];
            setInputVal(correctWordsRef);
            console.log(correctWordsRef);
          }}
        >
          <li>{word}</li>
        </div>
      ))}
      <button onClick={() => navigate("/noteuploadscreen")}>
        Upload Notes
      </button>
      <button onClick={() => navigate("/imageuploadscreen")}>
        Upload Image
      </button>
      <button onClick={() => navigate("/tasktrackerscreen")}>
        Task Tracker
      </button>

      {/* <Products /> */}
      <NoteUploader />
      <SexyImage />
    </div>
  );
};
export default InitialScreen;
