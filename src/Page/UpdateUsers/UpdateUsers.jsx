import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { AuthContext } from '../../providers/AuthProviders';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";

const UpdateUsers = () => {
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

  const handleMakeAdmin = async (userId) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/user-data/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: true }), // Send the isAdmin field in the request body
      });
      if (!response.ok) {
        throw new Error('Error updating user to admin');
      }
      const data = await response.json();
      console.log('User updated successfully:', data);

      // Update the user's isAdmin status in the local state
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isAdmin: true } : user
      );
      setUsers(updatedUsers);

      // Show success message
      toast.success('User promoted to admin successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to promote user to admin.');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/user-data/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      // Remove the deleted user from the local state
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);

      // Show success message
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.');
    }
  };

  if (isLoading) {
    return <div><Loading /></div>; // Render loading indicator while data is loading
  }

  if (!users || users.length === 0) {
    return <div>Error: No user data found.</div>;
  }

  return (
    <div className='my-10'>
      <h1 className="text-3xl font-bold text-center mb-6">Update Users</h1>
      <div className="overflow-x-auto p-4">
        <h1 className='text-xl uppercase font-semibold'>Total Users: {users.length}</h1>
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
            {/* Map over users data to render rows */}
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td><img src={user.photoUrl} alt={user.name} className="w-10 h-10 rounded-full" /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td>
                  <button className="btn" onClick={() => handleMakeAdmin(user._id)}>
                    Make Admin
                  </button>
                </td>

                <td>
                  <button className="btn text-red-600 text-2xl" onClick={() => handleDelete(user._id)}>
                    <MdDelete />
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

export default UpdateUsers;
