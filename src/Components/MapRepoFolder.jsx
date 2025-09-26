import React, { useEffect, useState } from 'react';
import useNoteSubFolder from '../Hooks/useNoteSubfolder';
const MapRepoFolder = () => {
  const repoStructure = useNoteSubFolder();
  return (
    <div>
      {repoStructure?.map((item) => (
        <div key={item.name}>
          <li>{item.name}</li>
        </div>
      ))}
    </div>
  );
};

export default MapRepoFolder;
