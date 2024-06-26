import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import Loading from '../../components/Loading';

const AdminControl = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate data loading delay (replace with actual data fetching logic)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after timeout
    }, 2000); // Adjust timeout as needed
  }, []);

  if (isLoading) {
    return <div><Loading/></div>; // Render loading indicator while data is loading
  }

  const {name, isAdmin, email, photoUrl} = user

  console.log({name, isAdmin, email, photoUrl});

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Admin Control Panel</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr>
              <th>1</th>
              <td><img src={photoUrl} alt="" /></td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{isAdmin}</td>
            </tr>
            {/* Render more rows based on data */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminControl;
