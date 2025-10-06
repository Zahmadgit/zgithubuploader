import React from "react";
import NoteUploader from "../Components/NoteUploader.jsx";
import SexyImage from "../Components/SexyImage.jsx";
import { useNavigate } from "react-router-dom";
import AutoCorrectTextInput from "../Components/AutoCorrectTextInput.jsx";

const InitialScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate("/noteuploadscreen")}>
        Upload Notes
      </button>
      <button onClick={() => navigate("/imageuploadscreen")}>
        Upload Image
      </button>
      <button onClick={() => navigate("/tasktrackerscreen")}>
        Task Tracker
      </button>
      <AutoCorrectTextInput documentElementId={"txt1"} />
      <AutoCorrectTextInput documentElementId={"txt2"} inputType={"input"} />
      <NoteUploader />
      <SexyImage />
    </div>
  );
};
export default InitialScreen;
