import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import InitialScreen from "./Screens/InitialScreen.jsx";
import ImageUploadScreen from "./Screens/ImageUploadScreen.jsx";
import NoteUploadScreen from "./Screens/NoteUploadScreen.jsx";
import EditNoteScreen from "./Screens/EditNoteScreen.jsx";
export default function App() {
  return (
    <HashRouter>
      <div>
        <h2>DegenerateUploader</h2>
      </div>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/imageuploadscreen" element={<ImageUploadScreen />} />
        <Route path="/noteuploadscreen" element={<NoteUploadScreen />} />
        <Route path="/editnotescreen" element={<EditNoteScreen />} />
      </Routes>
    </HashRouter>
  );
}
