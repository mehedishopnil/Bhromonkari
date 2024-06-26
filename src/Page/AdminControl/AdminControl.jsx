import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import Loading from '../../components/Loading';

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

  if (isLoading) {
    return <div><Loading /></div>; // Render loading indicator while data is loading
  }

  if (!users || users.length === 0) {
    return <div>Error: No user data found.</div>;
  }

  console.log(users);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminControl;
