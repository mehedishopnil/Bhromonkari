import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { Link } from 'react-router-dom';

const AdminOverview = () => {
  const { userData } = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    if (userData) {
      setTotalUsers(userData.length);
      const admins = userData.filter(user => user.isAdmin);
      setAdminCount(admins.length);
    }
  }, [userData]);

  return (
    <div className='mt-10 p-6'>
      <h1 className='text-3xl font-bold text-center mb-6'>Admin Overview</h1>
      <div className='flex justify-center gap-6'>
        <Link to='../all-users'>
        <div className='card border-2 text-gray-800 hover:shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title'>Total Tourists</h2>
            <p className='text-4xl font-bold'>{totalUsers}</p>
          </div>
        </div>
        </Link>

        <Link to='../admin-control'>
        <div className='card border-2 text-gray-800 hover:shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title'>Total Admins</h2>
            <p className='text-4xl font-bold'>{adminCount}</p>
          </div>
        </div>
        </Link>


        
      </div>
    </div>
  );
};

export default AdminOverview;
