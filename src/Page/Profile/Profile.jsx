import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileUpdateModal from "./ProfileUpdateModal";

const Profile = () => {
  const { user, userData } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, email, photoUrl, address, phone, website } = userData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-10/12 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between space-x-5">
          <div className="flex space-x-5">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={photoUrl}
                alt={name}
              />
            </div>
            <div className="py-2">
              <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
                <h1>{name}</h1>
              </div>
              <div className="mt-4">
                <div>
                  <p className="font-semibold text-gray-500">Email: {email}</p>
                  <p className="font-semibold text-gray-500">Address: {address}</p>
                  <p className="font-semibold text-gray-500">Phone: {phone}</p>
                  <p className="font-semibold text-gray-500">Website: {website}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 text-gray-600 text-2xl">
            <Link onClick={() => setIsModalOpen(true)}>
              <FaEdit />
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProfileUpdateModal
          userData={userData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
