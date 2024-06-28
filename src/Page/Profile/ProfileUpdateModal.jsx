import { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from 'sweetalert2';

const ProfileUpdateModal = ({ userData, onClose }) => {
  const { updateUser } = useContext(AuthContext);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl || "");
  const [address, setAddress] = useState(userData.address || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [website, setWebsite] = useState(userData.website || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userData.email, {
        photoUrl,
        address,
        phone,
        website,
      });
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then(() => {
        onClose();
        window.location.reload(); // Reload the page after modal is closed
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Please try again later.'
      });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-3xl font-bold mb-6 text-gray-500">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-500">Photo URL:</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-500">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-500">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2 text-gray-500">Website:</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn mr-2 bg-gray-300 border-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-[#e0a352] border-gray-300 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
