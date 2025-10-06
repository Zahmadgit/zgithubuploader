import React, { useState, useRef, useEffect } from "react";
import NoteUploader from "../Components/NoteUploader.jsx";
import SexyImage from "../Components/SexyImage.jsx";
import Products from "../Components/Products.jsx";
import { useNavigate } from "react-router-dom";
import { testAutoCorrect, readEnglishFile } from "zautocorrect";

console.time("SetReturn");
async function dictionarySetFunction() {
  const newSet = await readEnglishFile();
  console.log("this is the top level function call of: ", newSet);
  return newSet;
}
const dictionarySet = await dictionarySetFunction();

const InitialScreen = () => {
  const navigate = useNavigate();
  const inputVal = useRef("");
  const [correctWords, setCorrectWords] = useState([]);
  const wordIndex = useRef(0);

  /**
   * store the array with each index and character, seperately, including
   * the spaces so that the index is accurate, and then use the
   * event listerner index to go up to the current index inside
   * the array, and then use a for loop to go backwards and push
   * to a new array that will contain all letters of the current index
   * and backwards until a space is reached
   * and then we can join the array and just send that word to the
   * library autocorrect function
   */
  const checkWordCorrectHandler = (word) => {
    console.log("word: ", word);

    const currentWordsArr = word.split(" ");
    console.log("currentWordsArr:", currentWordsArr);

    const completeWordsArr = word.split("");
    console.log("completeWordsArra:", completeWordsArr);

    let wordArrForTestAutoCorrect = [];
    console.log("WordIndexValue:", wordIndex.current);
    for (let i = wordIndex.current - 1; i >= 0; --i) {
      console.log("Current i value inside arr:", completeWordsArr[i]);
      if (completeWordsArr[i] == " ") {
        console.log("returning early");
        break;
      }
      wordArrForTestAutoCorrect.push(completeWordsArr[i]);
      console.log(
        "wordArrForTestAutoCorrect inside for loop:",
        wordArrForTestAutoCorrect
      );
    }
    const wordForTestAutoCorrect = wordArrForTestAutoCorrect.reverse().join("");
    console.log("wordForTestAutoCorrect:", wordArrForTestAutoCorrect);
    /**
     * so I need to optimize the amount of stuff being passing into
     * this function, now that means that im going to split or filter
     * somehow the previous words as well as spaces?
     */
    let wordsArr = testAutoCorrect(dictionarySet, wordForTestAutoCorrect);

    setCorrectWords([wordsArr]);
    console.log(correctWords);
  };

  useEffect(() => {
    const input = document.getElementById("txt");
    const updateCaret = () => {
      wordIndex.current = txt.selectionStart;
    };
    input.addEventListener("input", updateCaret);
    return () => {
      input.removeEventListener("input", updateCaret);
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <li>Current Input Index: {wordIndex.current}</li>
      <input
        id="txt"
        type="text"
        ref={inputVal}
        spellCheck={true}
        placeholder="Lets test zautocorrect"
        onChange={(e) => {
          console.time("onChange Time");
          checkWordCorrectHandler(e.target.value);
          console.timeEnd("onChange Time");
        }}
      />

      {correctWords.map((word, idx) => (
        <div key={idx}>
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
