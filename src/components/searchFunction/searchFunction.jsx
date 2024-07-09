import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { CiSearch } from 'react-icons/ci';

const SearchFunction = () => {
  const { tourPlaces } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const performSearch = () => {
    const filteredPlaces = tourPlaces.filter(place =>
      place.name.toLowerCase().includes(searchTerm) ||
      place.location.toLowerCase().includes(searchTerm) ||
      place.category.toLowerCase().includes(searchTerm)
    );
    navigate('/search-results', { state: { filteredPlaces } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="relative w-full flex bg-transparent justify-center py-5 z-20">
      <div className="w-3/4 md:w-1/2 flex items-center border border-gray-300 rounded-lg  shadow-lg">
        <input
          type="text"
          placeholder="Search by name, location, or category"
          className="w-full px-4 py-2 rounded-lg bg-transparent text-gray-50 focus:outline-none"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
        <button 
          className="text-2xl p-2 text-gray-100"
          onClick={performSearch}
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchFunction;
