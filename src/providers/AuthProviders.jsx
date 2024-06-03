import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config"; // Ensure this path is correct
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";

// Create a context for authentication
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState("defaultCategory"); // Initialize with a default category or as needed

  const createUser = async (name, photoUrl, email, password) => {
    console.log({ name, email, password });
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoUrl,
      });

      const saveUser = { name, email };
      const response = await fetch("https://bhromonkari-server.vercel.app/users", {
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

      setUser(userCredential.user);
      return userCredential;

    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (name, photoUrl, email) => {
    try {
      setLoading(true);
      const response = await fetch(`https://bhromonkari-server.vercel.app/users/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, photoURL: photoUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bhromonkari-server.vercel.app/tourPlace');
        // Filter data based on the category
        const filteredData = response.data.filter(item => item.category.toLowerCase() === category.toLowerCase());
        setCategoryData(filteredData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [category]); // Add category to the dependency array

  const authInfo = {
    user,
    loading,
    createUser,
    updateUser,
    login,
    googleLogin,
    LogOut,
    categoryData
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProviders;
