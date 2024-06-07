import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleTourGuide = () => {
  const { _id } = useParams();
  const [tourGuide, setTourGuide] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourGuide = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tour-places/${_id}/tourGuide`);
        setTourGuide(response.data);
      } catch (error) {
        console.error('Error fetching tour guide data:', error);
        setError('Error fetching tour guide data');
      }
    };

    fetchTourGuide();
  }, [_id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!tourGuide) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5">{tourGuide.guideName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={tourGuide.guideImage} alt={tourGuide.guideName} className="w-full h-auto rounded-lg shadow-md mb-4" />
          <div className="mb-4">
            <p className="text-xl mb-2">Address: {tourGuide.guideAddress}</p>
            <p className="mb-2">{tourGuide.guideProfileDescription}</p>
            <p>Contact: {tourGuide.guideContact}</p>
          </div>
        </div>
        <div>
          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Availability</h3>
            <p>Contact us for booking and availability information.</p>
            <button className="btn btn-primary bg-[#e0a352] mt-2">Book Now</button>
          </div>
          <div className="border rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Reviews</h3>
            <p>No reviews available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTourGuide;
