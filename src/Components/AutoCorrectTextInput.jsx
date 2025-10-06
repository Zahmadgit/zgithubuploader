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
  const [correctWords, setCorrectWords] = useState();
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
  const handleWordCorrectCheck = (word) => {
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
    //normalize it so that if it just returns the correct word, its a string, otherwise an array
    if (wordsArr.length >= 5 && wordsArr.length <= 20) {
      setCorrectWords(Array.isArray(wordsArr) ? wordsArr : [wordsArr]);
    } else {
      setCorrectWords(
        Array.isArray(wordsArr) ? wordsArr.slice(0, 5) : [wordsArr.slice(0, 5)]
      );
    }

    console.log("correct Words Array", wordsArr.slice(0, 5));
  };

  /*left off at string manipulation on the inputVal
currently trying to turn the inputval into an array 
also turning the word into an array
and traversing the array, switching the elemtns at the elements
currently not working....
so this definitly wont work because I forgot that longer words can get 
get switched fine but longer correction words will reach a space before
being able to finish the correction, only replacing parcial. instead
I should find the index at which the first space is before the word
that needs to be corrected, and then start changing from that index 
onwards
*/
  const handleInputCorrection = (word) => {
    //fuck I gotta worry about the caret
    const inputValArrLength = inputVal.current.value.split("");
    let lengthToStartCorrect = 0;

    for (let i = wordIndex.current - 1; i >= 0; i--) {
      if (inputValArrLength[i] == " ") {
        console.log("the lengthToStartCorrect: ", i);
        lengthToStartCorrect = i;
        break;
      }
      lengthToStartCorrect = i;
    }
    console.log(
      "the lengthToStartCorrect after for loop: ",
      lengthToStartCorrect
    );
    const inputValArr = inputVal.current.value.split("");
    console.log("correction handler array: ", inputValArr);
    let wordArrForInputValReplace = inputValArr;
    const wordArr = word.split("");
    console.log("word that replace: ", wordArr);
    let wordCounter = 0;

    for (
      let i = lengthToStartCorrect + 1;
      i <= lengthToStartCorrect + wordArr.length + 1;
      i++
    ) {
      console.log("Right before return: ", i);
      if (inputValArr[i] == " ") {
        console.log("returning early");
        break;
      }
      console.log(
        "wordArrForInputValReplace before changing: ",
        wordArrForInputValReplace
      );
      if (lengthToStartCorrect == 0) {
        wordArrForInputValReplace[i - 1] = wordArr[wordCounter];
      } else {
        wordArrForInputValReplace[i] = wordArr[wordCounter];
      }

      wordCounter++;
      console.log(
        "wordArrForInputValReplace inside loop:",
        wordArrForInputValReplace
      );
    }

    //testing a different method
    // for (let i = wordIndex.current - 1; i >= 0; i--) {
    //   console.log("Right before return: ", i);
    //   if (inputValArr[i] == " ") {
    //     console.log("returning early");
    //     break;
    //   }
    //   console.log(
    //     "wordArrForInputValReplace before changing: ",
    //     wordArrForInputValReplace
    //   );
    //   wordArrForInputValReplace[i] = wordArr[wordCounter];
    //   wordCounter--;
    //   console.log(
    //     "wordArrForInputValReplace inside loop:",
    //     wordArrForInputValReplace
    //   );
    // }
    console.log("wordArrForInputValReplace: ", wordArrForInputValReplace);
    inputVal.current.value = wordArrForInputValReplace.join("");
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
          handleWordCorrectCheck(e.target.value);
        }}
      />
      <div style={{ flex: "row", display: "flex" }}>
        {correctWords?.map((word) => (
          <div
            key={word}
            style={{
              border: "1px solid blue",
              width: "90px",
              height: "20px",
              alignItems: "center",
              display: "flex",
              margin: "3px",
              borderRadius: "4px",
            }}
            onClick={() => {
              handleInputCorrection(word);
            }}
          >
            <p>{word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoCorrectTextInput;
