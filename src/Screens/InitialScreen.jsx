import React from 'react';
import NoteUploader from '../Components/NoteUploader.jsx';
import SexyImage from '../Components/SexyImage.jsx';
import MapRepoFolder from '../Components/MapRepoFolder.jsx';
import Products from '../Components/Products.jsx';
import { useNavigate } from 'react-router-dom';
const InitialScreen = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate('/noteuploadscreen')}>
        Upload Notes
      </button>
      <button onClick={() => navigate('/imageuploadscreen')}>
        Upload Image
      </button>
      <button onClick={() => navigate('/editnotescreen')}>Edit Notes</button>
      <Products />
      <NoteUploader />
      <MapRepoFolder />
      <SexyImage />
    </div>
  );
};
export default InitialScreen;
