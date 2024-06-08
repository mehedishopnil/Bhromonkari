import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import EmptyData from "../../components/EmptyData";
import { Link } from "react-router-dom";
import TodaysSpendingForm from "../BudgetPlan/TodaysSpendingForm";
import Loading from "../../components/Loading";

const Expense = () => {
  const { getSpendingData } = useContext(AuthContext);
  const [spendingDataArray, setSpendingDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSpendingModalOpen, setSpendingModalOpen] = useState(false);

  const toggleSpendingModal = () => {
    setSpendingModalOpen(!isSpendingModalOpen);
  };

  useEffect(() => {
    // Ensure getSpendingData is an array
    if (Array.isArray(getSpendingData)) {
      setSpendingDataArray(getSpendingData);
      setIsLoading(false); // Set loading to false when data is fetched
    }
  }, [getSpendingData]);

  // Render loading indicator while waiting for data
  if (isLoading) {
    return <div><Loading/></div>;
  }

  // Handle the case when spendingDataArray is empty
  if (spendingDataArray.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <EmptyData />
        <div className="text-center">
          <h2 className="text-xl mb-10">
            You don't have any spending data yet.
          </h2>
          <Link
            to="../budget-plan"
            className="border-2 border-blue-300 rounded px-5 py-3 hover:bg-blue-300"
          >
            Go to Budget Plan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h1 className="text-2xl mb-5 text-center font-bold text-gray-600">Check Your Daily Expense</h1>
      <div className="flex justify-center">
        <button onClick={toggleSpendingModal} className="btn text-center text-gray-500">Input your daily expense</button>
      </div>
      <div className="overflow-x-auto flex items-center justify-center">
        <table className="table table-zebra card w-10/12">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {spendingDataArray.map((item, index) => (
              <tr className=" border-t" key={item._id}>
                <th>{index + 1}</th>
                <td>{item.spendingAmount}</td>
                <td>{item.spendingDate}</td>
                <td>{item.spendingReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render the spending modal */}
      {isSpendingModalOpen &&
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-50">
            <TodaysSpendingForm onClose={toggleSpendingModal} />
          </div>
        </div>
      }
    </div>
  );
};

export default Expense;
