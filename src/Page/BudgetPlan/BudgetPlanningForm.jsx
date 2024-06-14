import  { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const BudgetPlanningForm = ({ onClose }) => {
  const { sendBudgetData, user } = useContext(AuthContext);  // Ensure correct naming
  const navigate = useNavigate();  // Get navigate function

  const [formData, setFormData] = useState({
    transportBudget: "",
    hotelBudget: "",
    mealBudget: "",
    othersBudget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Calculate total budget
      const totalBudget = Object.values(formData).reduce((total, currentValue) => {
        return total + (currentValue ? parseFloat(currentValue) : 0);
      }, 0);

      // Add total budget to formData
      const dataToSend = {
        ...formData,
        totalBudget: totalBudget.toFixed(2) // Round to 2 decimal places
      };

      // Send user email and budget data to the backend through the context
      await sendBudgetData(user.email, dataToSend);  // Use correct function name
      
      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Budget data submitted successfully!',
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
          // Reset form fields
          setFormData({
            transportBudget: '',
            hotelBudget: '',
            mealBudget: '',
            othersBudget: ''
          });
          onClose(); // Close the popup after the success message is closed
          navigate('../overview');
        }
      });
    } catch (error) {
      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to submit budget data. Please try again later.',
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Budget Planning Form</h1>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transportBudget">
          Budget for Transport:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="transportBudget"
          type="number"
          name="transportBudget"
          placeholder="Enter budget for transport"
          value={formData.transportBudget}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hotelBudget">
          Budget for Hotel/Resort:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hotelBudget"
          type="number"
          name="hotelBudget"
          placeholder="Enter budget for hotel/resort"
          value={formData.hotelBudget}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mealBudget">
          Budget for Meal:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mealBudget"
          type="number"
          name="mealBudget"
          placeholder="Enter budget for meal"
          value={formData.mealBudget}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="othersBudget">
          Budget for Others:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="othersBudget"
          type="number"
          name="othersBudget"
          placeholder="Enter budget for others"
          value={formData.othersBudget}
          onChange={handleChange}
        />
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

export default BudgetPlanningForm;
