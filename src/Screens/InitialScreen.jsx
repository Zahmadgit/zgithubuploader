import React, { useState, useEffect } from 'react';
import NoteUploader from '../Components/NoteUploader.jsx';
import SexyImage from '../Components/SexyImage.jsx';
import MapRepoFolder from '../Components/MapRepoFolder.jsx';
import Products from '../Components/Products.jsx';
import { useNavigate } from 'react-router-dom';
const InitialScreen = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate('/noteuploadscreen')}>GoToNotes</button>
      <button onClick={() => navigate('/imageuploadscreen')}>GoToImages</button>
      <Products />
      <NoteUploader />
      <MapRepoFolder />
      <SexyImage />
    </div>
  );
};
export default InitialScreen;
