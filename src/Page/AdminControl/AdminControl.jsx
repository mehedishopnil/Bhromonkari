import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';

const AdminControl = () => {
     const {user} = useContext(AuthContext);
     return (
          <div>
               <h1>This is admin control</h1>
          <div>
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
     
    </tbody>
  </table>
</div>
          </div>
          </div>
     );
};

export default AdminControl;