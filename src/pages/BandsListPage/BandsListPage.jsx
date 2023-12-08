import React, { useEffect, useState } from "react";
import { getAllBands } from "../../utilities/bands-api";
import { Link } from "react-router-dom";
import "./BandsListPage.css";

const BandsListPage = () => {
  const [bands, setBands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bandsData = await getAllBands();
        setBands(bandsData);
      } catch (error) {
        console.error("Error fetching bands:", error);
      }
    };
    fetchData();
  }, []);

  // Filter bands based on the search term
  const filteredBands = bands.filter((band) =>
    band.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by band name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {filteredBands.map((band, index) => (
          <li
            key={band._id}
            className={`flex justify-between gap-x-6 py-5 fadeInDown`}
          >
            {/* Wrap the entire list item with a Link component */}
            <Link to={`/bands/${band._id}`} className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none bg-gray-50 object-cover"
                src={band.photoUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {band.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {band.album}
                </p>
              </div>
            </Link>
            {/* Additional information as needed */}
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {band.additionalInfo}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BandsListPage;
