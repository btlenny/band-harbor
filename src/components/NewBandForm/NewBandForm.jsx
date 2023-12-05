import React, { useState } from 'react';
import axios from 'axios';
import { createBand } from '../../utilities/bands-api';

const BandForm = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the values before making the request
    console.log('Name:', name);
    console.log('Genre:', genre);

    const response = await createBand({name, genre});
    console.log(response);
    
  }; // <-- Closing brace for handleSubmit

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Band Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Genre:
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Band</button>
    </form>
  );
};

export default BandForm;