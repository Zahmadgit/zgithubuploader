import React from "react";
import { useNavigate } from "react-router-dom";
import NoteUploader from "../Components/NoteUploader.jsx";
const NoteUploadScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back to Initial Screen</button>
      <h1>Alright This screen will be used for Notes Uploading</h1>
      <NoteUploader />
    </div>
  );
};
export default NoteUploadScreen;
