import React, { useEffect, useState, useRef } from "react";
import { testAutoCorrect, readEnglishFile } from "zautocorrect";
// async function dictionarySetFunction() {
//   const newSet = await readEnglishFile();
//   console.log("this is the top level function call of: ", newSet);
//   return newSet;
// }
// const dictionarySet = await dictionarySetFunction();

const AutoCorrectTextInput = ({ documentElementId }) => {
  const inputVal = useRef("");
  const [correctWords, setCorrectWords] = useState([]);
  const wordIndex = useRef(0);
  const [dictionary, setDictionary] = useState();

  /*lets try to follow react best practices...
  move this this into some sorta context or global state, preferably context
  */
  useEffect(() => {
    const dictionarySetFunction = async () => {
      try {
        const newSet = await readEnglishFile();
        console.log("this is the top level function call of: ", newSet);
        setDictionary(newSet);
      } catch (e) {
        console.log("Welp... Set wasnt made: ", e);
      }
    };
    dictionarySetFunction();
  }, []);

  useEffect(() => {
    const input = document.getElementById(documentElementId);
    const updateCaret = () => {
      wordIndex.current = input.selectionStart;
    };
    input.addEventListener("input", updateCaret);
    return () => {
      input.removeEventListener("input", updateCaret);
    };
  }, []);

  /**
   * store the array with each index and character, seperately, including
   * the spaces so that the index is accurate, and then use the
   * event listener index to go up to the current index inside
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
    let wordsArr = testAutoCorrect(dictionary, wordForTestAutoCorrect);

    setCorrectWords([wordsArr]);
    console.log(correctWords);
  };

  return (
    <div>
      <li>Current Input Index: {wordIndex.current}</li>
      <input
        id={documentElementId}
        type="text"
        ref={inputVal}
        placeholder="Lets test zautocorrect"
        onChange={(e) => {
          checkWordCorrectHandler(e.target.value);
        }}
      />

      {correctWords.map((word, idx) => (
        <div key={idx}>
          <li>{word}</li>
        </div>
      ))}
    </div>
  );
};

export default AutoCorrectTextInput;
