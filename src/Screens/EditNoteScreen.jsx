import React from 'react';
import { useNavigate } from 'react-router-dom';
const EditNoteScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/')}>Go Back To Initial Screen</button>
      <h1>Alright This screen will be used for Editing Notes</h1>
    </div>
  );
};

export default EditNoteScreen;
