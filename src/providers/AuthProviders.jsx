import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config"; // Ensure this path is correct
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

// Create a context for authentication
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  // State to store user information
  const [user, setUser] = useState(null);
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // Function to create a new user with email and password
  const createUser = async (name, photoUrl, email, password) => {
    console.log({ name, email, password });
    setLoading(true);
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with the provided name and photo URL
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoUrl,
      });

      // Prepare user data to be saved to your backend
      const saveUser = { name, email };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saveUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userCreateData = await response.json();

      // Show a success message if the user was successfully saved in the backend
      if (userCreateData.insertedId) {
        Swal.fire({
          title: "Registration Success",
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
          },
        });
      }

      // Set the user state with the newly created user
      setUser(userCredential.user);
      return userCredential;

    } catch (error) {
      // Log and rethrow the error for handling
      console.error("Error creating user:", error.message);
      throw error;
    } finally {
      // Set loading to false after operation is complete
      setLoading(false);
    }
  };

  // Function to log in a user with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log in a user with Google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  // Function to log out the current user
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from auth state changes
    return () => unsubscribe();
  }, []);

  // Auth context value to be provided to the rest of the app
  const authInfo = {
    user,
    loading,
    createUser,
    login,
    googleLogin,
    LogOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProviders;
