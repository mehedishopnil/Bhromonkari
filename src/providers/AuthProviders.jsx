import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config"; // Ensure this path is correct
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

// Create a context for authentication
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState(null);
  const [spendingData, setSpendingData] = useState(null);

  console.log(spendingData)

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userData = await fetchUserData(currentUser.email);
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user data from the backend
  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/users?email=${email}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const users = await response.json();
      return users.find((user) => user.email === email);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error;
    }
  };

  // Create a new user with email and password
  const createUser = async (name, photoUrl, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: photoUrl });
      const saveUser = { name, email, photoUrl };
      const response = await fetch("https://bhromonkari-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userCreateData = await response.json();
      if (userCreateData.insertedId) {
        Swal.fire({
          title: "Registration Success",
          showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
          hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" },
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

  // Update user information
  const updateUser = async (email, updates) => {
    try {
      setLoading(true);
      const response = await fetch(`https://bhromonkari-server.vercel.app/users/${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        showClass: { popup: "animate__animated animate__fadeInDown" },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
      });

      return updatedUser;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Please try again later.",
      });
      console.error("Error updating user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Send budget data to the backend
  const sendBudgetData = async (email, budgetData) => {
    try {
      const response = await fetch("https://bhromonkari-server.vercel.app/tourist-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...budgetData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Budget data sent successfully!");
    } catch (error) {
      console.error("Error sending budget data:", error.message);
      throw error;
    }
  };

// Get budget data from the backend
const fetchBudgetData = async (email) => {
  try {
    const response = await fetch(`https://bhromonkari-server.vercel.app/tourist-wallet?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setBudgetData(data); // Set the fetched data
    console.log("Budget data retrieved successfully!", data);
  } catch (error) {
    console.error("Error retrieving budget data:", error.message);
  }
};

// useEffect to fetch data when the user changes
useEffect(() => {
  if (user && user.email) {
    fetchBudgetData(user.email);
  }
}, [user]);


  // Send today's spending data to the backend
  const sendTodaysSpendingData = async (email, spendingData) => {
    try {
      const response = await fetch("https://bhromonkari-server.vercel.app/regular-spending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, spendingData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Spending data sent successfully!");
    } catch (error) {
      console.error("Error sending spending data:", error.message);
      throw error;
    }
  };



  // Get today's spending data from the backend
  const fetchSpendingData = async (email) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/regular-spending?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSpendingData(data); // Set the fetched data
      console.log("Spending data retrieved successfully!", data);
    } catch (error) {
      console.error("Error fetching spending data:", error.message);
    }
  };

  // useEffect to fetch data when the user changes
  useEffect(() => {
    if (user && user.email) {
      fetchSpendingData(user.email);
    }
  }, [user]);



  // Sign in with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  // Sign out
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    updateUser,
    login,
    googleLogin,
    LogOut,
    sendBudgetData,
    fetchBudgetData,
    sendTodaysSpendingData,
    budgetData,
    spendingData,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
