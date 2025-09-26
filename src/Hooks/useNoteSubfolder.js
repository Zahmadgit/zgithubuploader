import React, { useEffect, useState } from 'react';

const useNoteSubFolder = () => {
  const [repoStructure, setRepoStructure] = useState([]);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const results = await window.getRepoPath.getRepoPath();
        if (results.success) {
          setRepoStructure(results.data);
          console.log(results.data);
        } else {
          console.log('Error fetching repo:', results.error);
        }
      } catch (e) {
        console.log('Bruh: ', e);
      }
    };
    fetchRepoData();
  }, []);
  return repoStructure;
};

export default useNoteSubFolder;
