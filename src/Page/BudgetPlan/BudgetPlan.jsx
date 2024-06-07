import React, { useState } from 'react';
import BudgetPlanningForm from './BudgetPlanningForm'; // Import the BudgetPlanningForm component

const BudgetPlan = () => {
    const [isModalOpen, setModalOpen] = useState(false); // State to track if the modal is open

    const toggleModal = () => {
        setModalOpen(!isModalOpen); // Toggle the state to open/close the modal
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold text-center uppercase text-gray-500">Welcome to the Budget Planning Station</h1>
            <div className="mt-10">
                <h1 className="text-center text-xl">So, What about your budget for the Tour? <br />
                    Let's Input your Budget</h1>

                <div className="flex justify-center mt-5">
                    <button onClick={toggleModal} className="bnt border rounded py-5 px-10 text-white bg-[#c5832d] hover:bg-[#a57536]"> Input Budget Planning</button>
                </div>

            </div>

            {/* Today's Spending */}
            <div className="mt-10">
                <h1 className="text-center text-xl">Did you spend your budget money today? <br />
                    Let's input them </h1>

                <div className="flex justify-center mt-5">
                    <button className="bnt border rounded py-5 px-10 text-white bg-[#c5832d] hover:bg-[#a57536]"> Input Today's Spending</button>
                </div>

            </div>

            {/* Render the modal */}
            {isModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-50">
                        <BudgetPlanningForm onClose={toggleModal} />
                    </div>
                </div>
            }
        </div>
    );
};

export default BudgetPlan;
