import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Loading from "../../components/Loading";

const TourPlan = () => {
  const { tourPlan } = useContext(AuthContext);
  console.log(tourPlan);

  // Helper function to truncate description
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : description;
  };

  if (!tourPlan || tourPlan.length === 0) {
    return <div><Loading/></div>;
  }

  return (
    <div className="container mx-auto max-h-screen my-10 overflow-auto">
      <h1 className="text-center text-3xl mb-10 font-bold">Your tour plan is here</h1>

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
            {tourPlan.map((item) => (
              <tr key={item.tourPlace._id}>
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
                          src={item.tourPlace.image}
                          alt={item.tourPlace.name}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item.tourPlace.name}</div>
                      <div className="text-sm opacity-50">{item.tourPlace.location}</div>
                    </div>
                  </div>
                </td>
                <td>{truncateDescription(item.tourPlace.description, 30)}</td>
                <td>{item.tourPlace.location}</td>
                <td>
                  <button className="btn border btn-xs">details</button>
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

export default TourPlan;
