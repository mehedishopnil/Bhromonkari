import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { CiSearch } from 'react-icons/ci';
import Loading from '../Loading';

const SearchFunction = () => {
  const { user, tourPlaces } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const performSearch = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    const filteredPlaces = tourPlaces.filter(place =>
      place.name.toLowerCase().includes(searchTerm) ||
      place.location.toLowerCase().includes(searchTerm) ||
      place.category.toLowerCase().includes(searchTerm)
    );
    setLoading(false);
    navigate('/search-results', { state: { filteredPlaces } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="relative w-full flex bg-transparent justify-center py-5 z-20">
      <div className="w-3/4 md:w-1/2 flex items-center border border-gray-300 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Search by place name or location"
          className="w-full px-4 py-2 rounded-lg bg-transparent text-gray-50 focus:outline-none"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          disabled={loading} // Disable input while loading
        />
        <button 
          className="text-2xl p-2 text-gray-100"
          onClick={performSearch}
          disabled={loading} // Disable button while loading
        >
          <CiSearch />
        </button>
      </div>
      {loading && <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
        <div className="text-white"><Loading/></div>
      </div>}
    </div>
  );
};

export default SearchFunction;
