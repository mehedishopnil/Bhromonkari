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
    setTimeout(() => {
      if (userData) {
        setUsers(userData);
      }
      setIsLoading(false);
    }, 2000);
  }, [userData]);

  const handleMakeAdmin = async (userId) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/user-data/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: true }),
      });
      if (!response.ok) {
        throw new Error('Error updating user to admin');
      }
      const data = await response.json();
      console.log('User updated successfully:', data);

      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isAdmin: true } : user
      );
      setUsers(updatedUsers);

      toast.success('User promoted to admin successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to promote user to admin.');
    }
  };

  const handleMakeUser = async (userId) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/user-data/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: false }),
      });
      if (!response.ok) {
        throw new Error('Error updating user to user');
      }
      const data = await response.json();
      console.log('User updated successfully:', data);

      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isAdmin: false } : user
      );
      setUsers(updatedUsers);

      toast.success('User demoted to user successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to demote user.');
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

      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);

      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.');
    }
  };

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <div className='my-10'>
      <h1 className="text-3xl font-bold text-center mb-6">Update Users</h1>
      <div className="overflow-x-auto p-4">
        <h1 className='text-xl uppercase font-semibold my-4'>Total Users & Admins: {users.length}</h1>
        <table className="table">
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
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td><img src={user.photoUrl} alt={user.name} className="w-10 h-10 rounded-full" /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td>
                  {user.isAdmin ? (
                    <button className="btn" onClick={() => handleMakeUser(user._id)}>
                      Make User
                    </button>
                  ) : (
                    <button className="btn" onClick={() => handleMakeAdmin(user._id)}>
                      Make Admin
                    </button>
                  )}
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
