import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Check if user object exists
  if (!user) {
    return <div>Loading...</div>; // Render a loading indicator if user object is not available
  }

  const { name, email, photoUrl, address, phone, website } = user;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={photoUrl}
              alt={name}
            />
          </div>
          <div className="">
            <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
              <h1>{name}</h1>
            </div>
            <div className="mt-4">
              <div className="">
                <div className="w-1/2">
                  <p className="font-semibold">Email: {email}</p>
                </div>
                <div className="w-1/2">
                  <p className="font-semibold">Address:</p>
                  <p>{address}</p>
                </div>
                <div className="w-1/2">
                  <p className="font-semibold">Phone:</p>
                  <p>{phone}</p>
                </div>
                <div className="w-1/2">
                  <p className="font-semibold">Website:</p>
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
