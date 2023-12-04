import React, { useState } from 'react';


const BandsListPage = () => {
  const [bands, setBands] = useState([]);

  const addBand = (newBandName, newGenre) => {
    // Update state to include the new band
    setBands([...bands, { name: newBandName, genre: newGenre }]);
  };

  return (
    <div>
      <h1>Bands List</h1>
      <ul>
        {bands.map((band, index) => (
          <li key={index}>{band.name} - {band.genre}</li>
        ))}
      </ul>
   
    </div>
  );
};

export default BandsListPage;