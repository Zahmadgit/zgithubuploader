import React from "react";
import { useNavigate } from "react-router-dom";
const ImageUploadScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back to Initial Screen</button>
      <h1>Alright This screen will be used for Images Uploading</h1>
    </div>
  );
};
export default ImageUploadScreen;
