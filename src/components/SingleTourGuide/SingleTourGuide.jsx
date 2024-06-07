import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleTourGuide = () => {
  const { _id } = useParams();
  const [tourGuides, setTourGuides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tour-places/${_id}/tourGuide`);
        setTourGuides(response.data);
      } catch (error) {
        console.error('Error fetching tour guide data:', error);
        setError('Error fetching tour guide data');
      }
    };

    fetchTourGuides();
  }, [_id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!tourGuides.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5">Tour Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tourGuides.map((guide) => (
          <div key={guide.guideName} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={guide.guideImage} alt={guide.guideName} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{guide.guideName}</h3>
              <p className="text-gray-600 mb-4">Address: {guide.guideAddress}</p>
              <p className="text-gray-700">{guide.guideProfileDescription}</p>
              <p className="text-gray-800 font-bold">Contact: {guide.guideContact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleTourGuide;
