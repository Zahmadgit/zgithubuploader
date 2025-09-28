import React from "react";
import { useNavigate } from "react-router-dom";
const NoteUploadScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back to Initial Screen</button>
      <h1>Alright This screen will be used for Notes Uploading</h1>
    </div>
  );
};
export default NoteUploadScreen;
