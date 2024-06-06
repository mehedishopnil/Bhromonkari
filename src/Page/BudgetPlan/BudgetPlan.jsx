import { useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';

const BudgetPlan = () => {
    const [budget, setBudget] = useState('');
    const [cost, setCost] = useState('');
    const [balance, setBalance] = useState('');
    const { user, userData } = useContext(AuthContext);

    const handleCalculate = () => {
        const remainingBalance = budget - cost;
        setBalance(remainingBalance);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            console.error("No user is logged in.");
            return;
        }
        const userEmail = user.email;

        const budgetData = {
            email: userEmail,
            budget,
            cost,
            balance
        };

        try {
            const response = await fetch(`http://localhost:5000/users/${userEmail}/budget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(budgetData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Budget data saved successfully:", data);
        } catch (error) {
            console.error("Error saving budget data:", error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Budget Plan</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tour Budget:</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Cost:</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="w-full px-4 py-2 bg-[#e0a352] text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Calculate
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Remaining Balance:</label>
                    <input
                        type="number"
                        value={balance}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Save Budget
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BudgetPlan;
