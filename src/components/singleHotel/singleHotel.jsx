import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

const SingleHotel = () => {
  const [hotels, setHotels] = useState([]);
  const { _id } = useParams(); // Use useParams to get the hotel ID from the URL path

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Fetch hotels data from the server
        const response = await axios.get(`http://localhost:5000/tour-places/${_id}/hotels`); // Update the URL as per your backend route
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [_id]); // Add _id to the dependency array

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-3xl font-bold mb-8">Hotels and Resorts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-4">Location: {hotel.location}</p>
              <p className="text-gray-700">{hotel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleHotel;
