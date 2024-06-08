import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Overview = () => {
  const { user,spendingData, budgetData} = useContext(AuthContext);

  // Handle the case when user is null
  if (!user) {
    return <div>Loading...</div>;
  }
console.log(spendingData)
console.log(budgetData)

  return (
    <div className="my-10">
      <h2 className="text-center text-2xl">Welcome <span className="font-bold">{user.name}</span></h2>
    </div>
  );
};

export default Overview;
