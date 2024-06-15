import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Link } from "react-router-dom";

const Bookings = () => {

    const {bookings} = useContext(AuthContext);
    console.log(bookings)


    return (
        <div className="my-10">
            <h1 className="text-center text-3xl font-bold">See you booked Hotels</h1>

            <div className="flex items-center justify-center overflow-x-auto">
        <table className="w-10/12 table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>


          <tbody>
            {bookings.map((item) => (
              <tr key={item._id}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.hotelImage}
                          alt={item.hotelName}
                        />
                      </div>
                    </div>
                  </div>
                </td>


                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item.hotelName}</div>
                      <div className="text-sm opacity-50">{item.hotelLocation}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <Link to={`/tour-places/${item.tourPlace._id}`}><button className="btn border btn-xs">details</button></Link>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
        </div>
    );
};

export default Bookings;