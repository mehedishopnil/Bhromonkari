import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileUpdateModal from "./ProfileUpdateModal";
import Loading from "../../components/Loading";
import { AiFillAlert } from "react-icons/ai";

const Profile = () => {
  const { user, getBudgetData, getSpendingData, setUser } = useContext(AuthContext); // Assuming setUser function is provided by AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spendingDataArray, setSpendingDataArray] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user ? user.isAdmin : false;

  useEffect(() => {
    setIsLoading(!user || !getBudgetData || !getSpendingData);
  }, [user, getBudgetData, getSpendingData]);

  useEffect(() => {
    if (Array.isArray(getSpendingData)) {
      setSpendingDataArray(getSpendingData);
    }
  }, [getSpendingData]);

  useEffect(() => {
    const total = spendingDataArray.reduce((sum, item) => sum + item.spendingAmount, 0);
    setTotalSpending(total);
  }, [spendingDataArray]);

  const handleUserUpdate = (updatedUserData) => {
    setUser(updatedUserData); // Update user data in context
  };

  if (isLoading) {
    return <Loading />;
  }

  const { name, email, photoUrl, address, phone, website } = user;

  return (
    <div className="container mx-auto flex flex-col justify-center items-center px-4 py-8">
      <div className="w-10/12 border mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between space-x-5">
          <div className="flex space-x-5">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src={photoUrl} alt={name} />
            </div>
            <div className="py-2">
              <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
                <h1 className="text-xl font-bold">
                  {isAdmin && (
                    <div>
                      {name} <span className="badge badge-secondary">Admin</span>
                    </div>
                  )}
                </h1>
              </div>
              <div className="mt-4">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-500"><span className="font-bold">Email: </span> {email}</p>
                  <p className="font-semibold text-gray-500"><span className="font-bold">Address: </span> {address}</p>
                  <p className="font-semibold text-gray-500"><span className="font-bold">Phone: </span> {phone}</p>
                  <p className="font-semibold text-gray-500"><span className="font-bold">Website: </span> {website}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 text-gray-600 text-2xl">
            <Link onClick={() => setIsModalOpen(true)}>
              <FaEdit />
            </Link>
          </div>
        </div>
      </div>

      {!isAdmin && (
        <>
          <div className="card bg-slate-100 w-1/2 mt-10 border py-5">
            {getBudgetData ? (
              <h1 className="text-center">Your Tour Budget: <span className="font-bold">{getBudgetData.totalBudget} Taka</span></h1>
            ) : (
              <h1 className="text-center text-red-500">You didn't set your budget data. Please set your budget from <Link to="../budget-plan" className="font-bold text-blue-500">here</Link>.</h1>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center card bg-slate-100 w-1/2 mt-4 border py-5">
            <h1 className="text-center">Your Total Spending: <span className="font-bold">{totalSpending} Taka</span></h1>
            {getBudgetData && totalSpending > getBudgetData.totalBudget && (
              <div className="flex gap-3 text-center text-red-500">
                <AiFillAlert className="text-xl" /> You are crossing your budget limit. Be careful on spending.
              </div>
            )}
            {getBudgetData && totalSpending <= getBudgetData.totalBudget && (
              <div className="flex gap-3 text-center text-green-500">
                <AiFillAlert className="text-xl" /> You are in a safe spending position.
              </div>
            )}
          </div>
        </>
      )}
      
      {isModalOpen && (
        <ProfileUpdateModal
          userData={user}
          onUpdate={handleUserUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
