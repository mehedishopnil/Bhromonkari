import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';

const SingleHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { _id } = useParams(); // Ensure useParams hook uses the correct parameter name

  useEffect(() => {

    const fetchHotels = async () => {
      try {
        // Fetch hotels data from the server using the tour place ID
        const response = await axios.get(`http://localhost:5000/tour-places/${_id}/hotel`);
        setHotels(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Error fetching hotels');
        setLoading(false);
      }
    };

    fetchHotels();
  }, [_id]);

  if (loading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(hotels)

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-3xl font-bold mb-8">Hotels and Resorts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div key={hotel.hotelName} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={hotel.hotelImage} alt={hotel.hotelName} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{hotel.hotelName}</h3>
              <p className="text-gray-600 mb-4">Location: {hotel.hotelLocation}</p>
              <p className="text-gray-700">{hotel.hotelDescription}</p>
              <p className="text-gray-800 font-bold">{hotel.hotelPrice}</p>
              <p className="text-gray-600">Contact: {hotel.hotelContact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleHotel;
