import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProfileUpdateModal from "./ProfileUpdateModal";
import Loading from "../../components/Loading";
import { AiFillAlert } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import ReviewModal from "./ReviewModal";

const Profile = () => {
  const { user, getBudgetData, getSpendingData, setUser, LogOut, reviewsData } =
    useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spendingDataArray, setSpendingDataArray] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const navigate = useNavigate();
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
    const total = spendingDataArray.reduce(
      (sum, item) => sum + item.spendingAmount,
      0
    );
    setTotalSpending(total);
  }, [spendingDataArray]);

  useEffect(() => {
    if (reviewsData && user) {
      const review = reviewsData.find(review => review.email === user.email);
      setUserReview(review);
    }
  }, [reviewsData, user]);

  const handleUserUpdate = (updatedUserData) => {
    setUser(updatedUserData);
  };

  const handleLogout = async () => {
    await LogOut();
    navigate("/login");
  };

  if (isLoading) {
    return <Loading />;
  }

  const { name, email, photoUrl, address, phone, website } = user;

  return (
    <div className="container mx-auto flex flex-col justify-center items-center px-4 py-8">
      <div className="relative w-10/12 bg-[#effaff50] border mx-auto  rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between space-x-5">
          <div className="flex space-x-5">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={photoUrl}
                alt={name}
              />
            </div>
            <div className="py-2">
              <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
                <h1 className="text-xl font-bold">
                  {isAdmin && (
                    <div>
                      {name}{" "}
                      <span className="badge badge-secondary">Admin</span>
                    </div>
                  )}
                </h1>
              </div>
              <div className="">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold">Your Info</h1>
                  <div className="divider"></div>
                  <p className="font-semibold text-gray-500">
                    <span className="font-bold">Email: </span> {email}
                  </p>
                  <p className="font-semibold text-gray-500">
                    <span className="font-bold">Address: </span> {address}
                  </p>
                  <p className="font-semibold text-gray-500">
                    <span className="font-bold">Phone: </span> {phone}
                  </p>
                  <p className="font-semibold text-gray-500">
                    <span className="font-bold">Website: </span> {website}
                  </p>
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

        <div
          className="absolute flex items-center gap-3 border-[2px] rounded-lg p-2 bottom-[10%] right-[2%] cursor-pointer"
          onClick={handleLogout}
        >
          <button>Logout </button>
          <MdLogout className="text-xl" />
        </div>
      </div>

      {!isAdmin && (
        <>
          <div className="w-10/12 flex flex-col items-center border rounded-xl my-5 p-4">
            <h1 className="text-xl font-bold pb-4">Your Budget and Spending</h1>
            <div className="card bg-slate-100 w-1/2  border py-5">
              {getBudgetData ? (
                <h1 className="text-center">
                  Your Tour Budget:{" "}
                  <span className="font-bold">
                    {getBudgetData.totalBudget} Taka
                  </span>
                </h1>
              ) : (
                <h1 className="text-center text-red-500">
                  You didn't set your budget data. Please set your budget from{" "}
                  <Link to="../budget-plan" className="font-bold text-blue-500">
                    here
                  </Link>
                  .
                </h1>
              )}
            </div>

            <div className="flex flex-col items-center justify-center card bg-slate-100 w-1/2 mt-4 border py-5">
              <h1 className="text-center">
                Your Total Spending:{" "}
                <span className="font-bold">{totalSpending} Taka</span>
              </h1>
              {getBudgetData && totalSpending > getBudgetData.totalBudget && (
                <div className="flex gap-3 text-center text-red-500">
                  <AiFillAlert className="text-xl" /> You are crossing your
                  budget limit. Be careful on spending.
                </div>
              )}
              {getBudgetData && totalSpending <= getBudgetData.totalBudget && (
                <div className="flex gap-3 text-center text-green-500">
                  <AiFillAlert className="text-xl" /> You are in a safe spending
                  position.
                </div>
              )}
            </div>
          </div>

          <div className="w-10/12 flex flex-col items-center border rounded-xl my-5 p-4">
            <h1 className="text-xl font-bold pb-4">Your Review and Comment</h1>
            {userReview ? (
              <div className="card bg-slate-100 w-full border py-5">
                <h2 className="text-center text-lg font-bold">Your Review</h2>
                <p className="text-center">{userReview.review_comment}</p>
                <p className="text-center">Rating: {userReview.rating_number}</p>
              </div>
            ) : (
              <Link
                className="btn border btn-primary bg-slate-600"
                onClick={() => setIsReviewModalOpen(true)}
              >
                Leave a Review
              </Link>
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

      {isReviewModalOpen && (
        <ReviewModal
          user={user}
          onClose={() => {
            setIsReviewModalOpen(false);
            window.location.reload(); // Reload the profile page
          }}
        />
      )}
    </div>
  );
};

export default Profile;
