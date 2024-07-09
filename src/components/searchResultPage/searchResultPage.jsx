import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};

const SearchResultPage = () => {
  const location = useLocation();
  const { filteredPlaces } = location.state || { filteredPlaces: [] };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Search Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaces.map((place) => (
          <Link to={`/tour-places/${place._id}`} key={place._id}>
            <div className="bg-white text-black p-4 rounded-lg shadow-md">
              <img src={place.image} alt={place.name} className="w-full h-48 object-cover rounded-lg" />
              <h2 className="text-2xl font-bold mt-2">{place.name}</h2>
              <p className="text-lg">{place.location}</p>
              <p>{truncateDescription(place.description, 100)}</p>
              <p className="text-xs text-red-600">{place.redAlartPlace}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
