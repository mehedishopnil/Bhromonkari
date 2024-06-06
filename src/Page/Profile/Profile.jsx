import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Profile = () => {
  const { user, userData } = useContext(AuthContext);

  console.log(userData);

  // Check if user object exists
  if (!user) {
    return <div>Loading...</div>; // Render a loading indicator if user object is not available
  }

  const { name, email, photoUrl, address, phone, website } = userData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-10/12 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
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
              <div className="">
                <div className="">
                  <p className="font-semibold text-gray-500">Email: {email}</p>
                </div>
                <div className="">
                  <p className="font-semibold text-gray-500">Address:</p>
                  <p>{address}</p>
                </div>
                <div className="">
                  <p className="font-semibold text-gray-500">Phone:</p>
                  <p>{phone}</p>
                </div>
                <div className="">
                  <p className="font-semibold text-gray-500">Website:</p>
                  <p>{website}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
