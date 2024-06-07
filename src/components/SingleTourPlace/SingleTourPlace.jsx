import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleTourPlace = () => {
  const { _id } = useParams();
  const [tourPlace, setTourPlace] = useState(null);

  useEffect(() => {
    const fetchTourPlace = async () => {
      try {
        const response = await axios.get(`https://bhromonkari-server.vercel.app/tour-places/${_id}`);
        setTourPlace(response.data);
      } catch (error) {
        console.error('Error fetching tour place data:', error);
      }
    };

    fetchTourPlace();
  }, [_id]);

  if (!tourPlace) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5">{tourPlace.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={tourPlace.image} alt={tourPlace.name} className="w-full h-auto rounded-lg shadow-md mb-4" />
          <div className="mb-4">
            <p className="text-xl mb-2">Location: {tourPlace.location}</p>
            <p className="mb-2">{tourPlace.description}</p>
            <p>{tourPlace.details}</p>
          </div>
        </div>
        <div>
          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Nearest Hotels and Resorts</h3>
            <Link to={`/hotel/${_id}`}>
            <button className="btn btn-primary bg-[#e0a352] mt-2">View Hotels</button>
            </Link>
          </div>
          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Tour Guide</h3>
            <p>If you need a tour guide, please contact us for assistance.</p>
            <Link to={`/tour-guide/${_id}`}><button className="btn btn-primary bg-[#e0a352] mt-2">Request Tour Guide</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTourPlace;
