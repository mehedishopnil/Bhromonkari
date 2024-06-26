import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProviders';

const TodaysSpendingForm = ({ onClose }) => {
  const { sendSpendingData, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    spendingAmount: "",
    spendingDate: "",
    spendingReason: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  const handleSubmit = async () => {
    try {
      // Ensure spendingAmount is a number
      const dataToSend = {
        ...formData,
        spendingAmount: parseFloat(formData.spendingAmount)
      };
      // Log the data being sent
      console.log('Submitting the following data:', dataToSend);

      // Send user email and spending data to the backend through the context
      await sendSpendingData(user.email, dataToSend);

      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Spending data submitted successfully!',
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
          // Reset form fields
          setFormData({
            spendingAmount: "",
            spendingDate: "",
            spendingReason: ""
          });
          onClose();
        }
      });
    } catch (error) {
      console.error("Error submitting spending data:", error.message); // Log error for debugging
      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to submit spending data. Please try again later.',
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Today's Spending Form</h1>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spendingAmount">
          Spending Amount:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="spendingAmount"
          type="number"
          name="spendingAmount"
          placeholder="Enter spending amount"
          value={formData.spendingAmount}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spendingDate">
          Spending Date:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="spendingDate"
          type="date"
          name="spendingDate"
          placeholder="Enter spending date"
          value={formData.spendingDate}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spendingReason">
          Spending Reason:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="spendingReason"
          name="spendingReason"
          value={formData.spendingReason}
          onChange={handleChange}
        >
          <option value="" disabled>Select a reason</option>
          <option value="Transport">Transport</option>
          <option value="Hotel/Resort">Hotel/Resort</option>
          <option value="Meal">Meal</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Cancel
        </button>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default TodaysSpendingForm;
