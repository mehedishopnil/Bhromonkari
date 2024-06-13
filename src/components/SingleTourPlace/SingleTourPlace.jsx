import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import { AiFillAlert } from "react-icons/ai";
import { AuthContext } from '../../providers/AuthProviders';

const SingleTourPlace = () => {
  const { _id } = useParams();
  const [tourPlace, setTourPlace] = useState(null);
  const { user } = useContext(AuthContext);

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

  const handleAddToTourPlan = async () => {
    if (!user) {
      alert('You need to be logged in to add to your tour plan.');
      return;
    }

    try {
      const tourPlanData = { email: user.email, tourPlaceId: _id };
      const response = await axios.post('https://bhromonkari-server.vercel.app/tour-plan', tourPlanData);
      if (response.status === 201) {
        alert('Tour plan added successfully!');
      } else {
        alert('Failed to add to tour plan.');
      }
    } catch (error) {
      console.error('Error adding to tour plan:', error);
      alert('Error adding to tour plan.');
    }
  };

  if (!tourPlace) {
    return <div><Loading /></div>;
  }

  const formatDescription = (description) => {
    const paragraphs = description.split('\n').filter(paragraph => paragraph.trim() !== '');
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4 text-justify">{paragraph}</p>
    ));
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5">{tourPlace.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={tourPlace.image} alt={tourPlace.name} className="w-full h-auto rounded-lg shadow-md mb-4" />
          <div className="mb-4">
            <p className="text-xl mb-2">Location: {tourPlace.location}</p>
            <div>{formatDescription(tourPlace.description)}</div>
            <p>{tourPlace.details}</p>
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Nearest Hotels and Resorts</h3>
            <Link to={`/hotel/${_id}`}>
              <button className="btn text-white bg-[#e0a352] mt-2">View Hotels</button>
            </Link>
          </div>

          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Tour Guide</h3>
            <p>If you need a tour guide, please contact us for assistance.</p>
            <Link to={`/tour-guide/${_id}`}>
              <button className="btn text-white bg-[#e0a352] mt-2">Request Tour Guide</button>
            </Link>
          </div>

          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl text-red-500 font-semibold mb-2">Red Alert Zone</h3>
            <div className='flex gap-3'>
              <AiFillAlert className='text-red-500 text-2xl' />
              <p className='font-bold'>{tourPlace.redAlartPlace}</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <p>Do you love to visit the place?</p>
            <button onClick={handleAddToTourPlan} className="btn text-white bg-[#e0a352] mt-2">
              Add to Tour Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTourPlace;
