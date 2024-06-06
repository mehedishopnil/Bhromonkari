import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleTourPlacePage = () => {
  const { _id } = useParams(); // Use _id instead of id
  const [tourPlace, setTourPlace] = useState(null);

  useEffect(() => {
    const fetchTourPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tour-places/${_id}`); // Use _id
        setTourPlace(response.data);
      } catch (error) {
        console.error('Error fetching tour place data:', error);
      }
    };

    fetchTourPlace();
  }, [_id]); // Add _id to dependency array

  if (!tourPlace) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5">{tourPlace.name}</h2>
      <img src={tourPlace.image} alt={tourPlace.name} className="w-full h-[400px] mb-4" />
      <p className="text-xl mb-2">Location: {tourPlace.location}</p>
      <p className="mb-2">{tourPlace.description}</p>
      <p>{tourPlace.details}</p>
    </div>
  );
};

export default SingleTourPlacePage;
