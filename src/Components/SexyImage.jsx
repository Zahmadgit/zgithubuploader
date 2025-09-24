import React from 'react';
import sexyAsset from '../../static/assets/degenerateshit.png';

const SexyImage = () => {
  const handleImageClick = () => {
    console.log('Bruh the sexy image was just clicked');
  };
  return (
    <div>
      <img src={sexyAsset} onClick={() => handleImageClick()} />
    </div>
  );
};

export default SexyImage;
