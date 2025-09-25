import React, { useEffect, useState } from 'react';

const MapRepoFolder = () => {
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
