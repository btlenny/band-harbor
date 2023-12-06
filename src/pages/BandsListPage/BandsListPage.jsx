import React, { useEffect, useState } from 'react';
import { getAllBands } from '../../utilities/bands-api';
import { Link } from 'react-router-dom';

const BandsListPage = () => {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bandsData = await getAllBands();
        setBands(bandsData);
        console.log('Fetched bands:', bandsData);
      } catch (error) {
        console.error('Error fetching bands:', error);
      }
    };

    // Fetch bands when the component mounts
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4"> {/* Add padding here */}
      <ul role="list" className="divide-y divide-gray-100">
        {bands.map((band) => (
          <li key={band._id} className="flex justify-between gap-x-6 py-5">
            {/* Wrap the entire list item with a Link component */}
            <Link to={`/bands/${band._id}`} className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none bg-gray-50 object-cover"
                src={band.photoUrl} 
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{band.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{band.genre}</p>
              </div>
            </Link>
            {/* Additional information as needed */}
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{band.additionalInfo}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BandsListPage;
