import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { AuthContext } from "../../providers/AuthProviders";

const SingleHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { _id } = useParams(); // Ensure useParams hook uses the correct parameter name
  const {user, bookings} = useContext(AuthContext);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Fetch hotels data from the server using the tour place ID
        const response = await axios.get(
          `https://bhromonkari-server.vercel.app/tour-places/${_id}/hotel`
        );
        setHotels(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Error fetching hotels");
        setLoading(false);
      }
    };

    fetchHotels();
  }, [_id]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(hotels);


  const handleBookings = async() => {
    if (!user) {
      alert('You need to be logged in to add to your tour plan.');
      return;
    }

    try {
      const bookings = { 
        email: user.email, 
        bookings 
      };
      const response = await axios.post('https://bhromonkari-server.vercel.app/bookings', tourPlanData);
      if (response.status === 201) {
        alert('Tour plan added successfully!');
      } else {
        alert('Failed to add to tour plan.');
      }
    } catch (error) {
      console.error('Error adding to tour plan:', error);
      alert('Error adding to tour plan.');
    }
  }

  return (
    <div className="container mx-auto bg-slate-100 px-4 py-8">
      <h2 className="text-center text-3xl font-bold mb-8">
        Hotels and Resorts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotelName}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={hotel.hotelImage}
              alt={hotel.hotelName}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold mb-2">{hotel.hotelName}</h3>
              <p className="text-gray-600 mb-4">
                Location: {hotel.hotelLocation}
              </p>
              <p className="text-gray-700">{hotel.hotelDescription}</p>
              <p className="text-gray-800 font-bold">{hotel.hotelPrice}</p>
              <p className="text-gray-600">Contact: {hotel.hotelContact}</p>

              <div className="mt-5">
                <button onClick={handleBookings} className="btn border-gray-400 ">Book Now</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleHotel;
