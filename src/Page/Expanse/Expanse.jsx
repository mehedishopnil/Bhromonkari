import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import EmptyData from "../../components/EmptyData";
import { Link } from "react-router-dom";

const Expanse = () => {
  const { spendingData } = useContext(AuthContext);
  console.log(spendingData);

  // Handle the case when budgetData is null
  if (!spendingData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <EmptyData />
        <div className="text-center">
          <h2 className="text-xl mb-10">
            You didn't input your budget plan yet.
          </h2>
          <Link
            to="../budget-plan"
            className=" border-2 border-blue-300 rounded px-5 py-3 hover:bg-blue-300 "
          >
            Go to Budget Plan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
        <h1 className="text-2xl mb-5 text-center font-bold text-gray-600">Check Your Daily Expanse</h1>
      <div className="overflow-x-auto flex items-center justify-center">
        <table className="table card w-10/12">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="bg-base-200">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expanse;
