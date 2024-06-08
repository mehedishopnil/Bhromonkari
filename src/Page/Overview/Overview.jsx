import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { FaBeerMugEmpty } from "react-icons/fa6";
import emptyBucket from "../../../public/wired-lineal-139-basket.gif"

const Overview = () => {
  const { user, budgetData } = useContext(AuthContext);

  // Handle the case when user is null
  if (!user) {
    return <div>Loading...</div>;
  }

  // Handle the case when budgetData is null
  if (!budgetData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img className="w-1/6" src={emptyBucket} alt="" />
        <div className="text-center">
          <h2 className="text-xl mb-10">You didn't input your budget plan yet.</h2>
          <Link to="../budget-plan" className=" border-2 border-blue-300 rounded px-5 py-3 hover:bg-blue-300 ">
            Go to Budget Plan
          </Link>
        </div>
      </div>
    );
  }

  const { hotelBudget, mealBudget, othersBudget, transportBudget, totalBudget } = budgetData;

  // Pie chart data
  const pieChartData = [
    { name: 'Hotel', value: parseFloat(hotelBudget) },
    { name: 'Meal', value: parseFloat(mealBudget) },
    { name: 'Others', value: parseFloat(othersBudget) },
    { name: 'Transport', value: parseFloat(transportBudget) },
  ];

  // Colors for each pie chart section
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Render customized label for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex flex-col items-center w-full h-full">
        <h2 className="text-center text-2xl">Welcome <span className="font-bold">{user.name}</span></h2>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <span className="bg-[#8c40e4] text-white rounded-full px-2 py-1">Total Budget: ${totalBudget}</span>
        </div>
        <div className="card shadow-lg p-6 w-full md:w-10/12 lg:w-10/12 mt-4">
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
            <div className="col-span-3">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col space-y-5 text-sm lg:col-span-2">
              <span className="bg-[#0088FE] text-white rounded-full px-2 py-1">Hotel Budget: ${hotelBudget}</span>
              <span className="bg-[#00C49F] text-white rounded-full px-2 py-1">Meal Budget: ${mealBudget}</span>
              <span className="bg-[#FFBB28] text-white rounded-full px-2 py-1">Others Budget: ${othersBudget}</span>
              <span className="bg-[#FF8042] text-white rounded-full px-2 py-1">Transport Budget: ${transportBudget}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-600 uppercase mt-4">Your Tour Budget Chart</h1>
        </div>
      </div>
    </div>
  );
};

export default Overview;
