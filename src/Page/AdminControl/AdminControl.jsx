import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import Loading from '../../components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminControl = () => {
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate data loading delay (replace with actual data fetching logic)
    setTimeout(() => {
      if (userData) {
        // Assuming userData is already an array or needs to be converted to an array
        setUsers(userData); // Set users state with userData array
      }
      setIsLoading(false); // Set loading to false after timeout
    }, 2000); // Adjust timeout as needed
  }, [userData]); // Dependency on 'userData' to trigger effect on data change

  const handleRemoveAdmin = async (userId) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/user-data/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: false }), // Send the isAdmin field in the request body
      });
      if (!response.ok) {
        throw new Error('Error updating user to regular user');
      }
      const data = await response.json();
      console.log('User updated successfully:', data);

      // Update the user's isAdmin status in the local state
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isAdmin: false } : user
      );
      setUsers(updatedUsers);

      // Show success message
      toast.success('User demoted to regular user successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to demote user to regular user.');
    }
  };

  if (isLoading) {
    return <div><Loading /></div>; // Render loading indicator while data is loading
  }

  if (!users || users.length === 0) {
    return <div>Error: No user data found.</div>;
  }

  // Filter to show only admin users
  const adminUsers = users.filter(user => user.isAdmin);

  console.log(adminUsers);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Admin Control Panel</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over adminUsers data to render rows */}
            {adminUsers.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td><img src={user.photoUrl} alt={user.name} className="w-10 h-10 rounded-full" /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td>
                  <button className='btn' onClick={() => handleRemoveAdmin(user._id)}>
                    Remove Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminControl;
