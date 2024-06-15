import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const SingleHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { _id } = useParams(); // Ensure useParams hook uses the correct parameter name
  const { user } = useContext(AuthContext); // Only take user from AuthContext

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

  const handleBookings = async (hotel) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be logged in to add to your tour plan.',
      });
      return;
    }

    try {
      const bookingData = {
        email: user.email,
        hotelImage: hotel.hotelImage,
        hotelName: hotel.hotelName,
        hotelLocation: hotel.hotelLocation,
        hotelPrice: hotel.hotelPrice,
        hotelContact: hotel.hotelContact
      };

      const response = await axios.post('https://bhromonkari-server.vercel.app/bookings', bookingData);
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Booked!',
          text: 'Hotel booked successfully!',
        });
        // Optionally update bookings state or context if needed
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to book the hotel.',
        });
      }
    } catch (error) {
      console.error('Error booking hotel:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error booking hotel.',
      });
    }
  };

  return (
    <div className="container mx-auto bg-slate-100 px-4 py-8">
      <h2 className="text-center text-3xl font-bold mb-8">
        Hotels and Resorts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div
            key={hotel._id} // Use the unique ID of the hotel
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
                <button onClick={() => handleBookings(hotel)} className="btn border-gray-400 ">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleHotel;
