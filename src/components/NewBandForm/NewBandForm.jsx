import React, { useState } from 'react';
import { createBand } from '../../utilities/bands-api';
import { useNavigate } from 'react-router-dom';

const BandForm = ({ onCreateBand }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the values before making the request
    console.log('Name:', name);
    console.log('Genre:', genre);
    console.log('Photo URL:', photoUrl);

    const bandData = { name, genre, photoUrl };

    const response = await createBand(bandData);

    // Check if the band was created successfully
    if (response.success) {
      // Call the onCreateBand prop with the new band
      onCreateBand(response.data);
      navigate('/bands');
    }

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 space-y-12 bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Band Information</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="band-name" className="block text-sm font-medium leading-6 text-gray-900">
              Band Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="band-name"
                name="band-name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="band-genre" className="block text-sm font-medium leading-6 text-gray-900">
              Genre
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="band-genre"
                name="band-genre"
                autoComplete="off"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="band-photo-url" className="block text-sm font-medium leading-6 text-gray-900">
              Band Photo URL
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="band-photo-url"
                name="band-photo-url"
                autoComplete="off"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Band
        </button>
      </div>
    </form>
  );
};

export default BandForm;
