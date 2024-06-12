import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getBudgetData, setGetBudgetData] = useState(null);
  const [getSpendingData, setGetSpendingData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userData = await fetchUserData(currentUser.email);
          setUser(userData);
        } catch (error) {
          console.error('Error setting user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`https://bhromonkari-server.vercel.app/users?email=${email}`);
      if (!response.ok) {
        throw new Error(`Error fetching user data: HTTP status ${response.status}`);
      }
      const users = await response.json();
      return users.find((user) => user.email === email);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error;
    }
  };

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
        throw new Error(`Error creating user: HTTP status ${response.status}`);
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

  const updateUser = async (email, updates) => {
    try {
      setLoading(true);
      const response = await fetch(`https://bhromonkari-server.vercel.app/users/${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Error updating user: HTTP status ${response.status}`);
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

  const sendBudgetData = async (email, budgetData) => {
    try {
      console.log('Sending budget data for:', email);
      const response = await fetch("https://bhromonkari-server.vercel.app/tourist-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...budgetData }),
      });

      if (!response.ok) {
        throw new Error(`Error sending budget data: HTTP status ${response.status}`);
      }
      console.log("Budget data sent successfully!");
    } catch (error) {
      console.error("Error sending budget data:", error.message);
      throw error;
    }
  };

  const sendSpendingData = async (email, spendingData) => {
    try {
      console.log('Sending spending data for:', email);
      console.log('Spending data:', spendingData);
  
      const response = await fetch("https://bhromonkari-server.vercel.app/regular-spending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...spendingData }), // Include email in the data
      });
  
      if (!response.ok) {
        throw new Error(`Error sending spending data: HTTP status ${response.status}`);
      }
      console.log("Spending data sent successfully!");
    } catch (error) {
      console.error("Error sending spending data:", error.message);
      throw error;
    }
  };

  const fetchBudgetData = async (email) => {
    try {
      console.log('Fetching budget data for:', email);
      const response = await fetch(`https://bhromonkari-server.vercel.app/tourist-wallet?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error fetching budget data: HTTP status ${response.status}`);
      }

      const data = await response.json();
      setGetBudgetData(data);
      console.log("Budget data retrieved successfully!", data);
    } catch (error) {
      console.error("Error retrieving budget data:", error.message);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchBudgetData(user.email);
    }
  }, [user]);

  const fetchSpendingData = async (email) => {
    try {
      console.log('Fetching spending data for:', email);
      const response = await fetch(`https://bhromonkari-server.vercel.app/regular-spending?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error fetching spending data: HTTP status ${response.status}`);
      }

      const data = await response.json();
      setGetSpendingData(data);
      console.log("Spending data retrieved successfully!", data);
    } catch (error) {
      console.error("Error retrieving spending data:", error.message);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchSpendingData(user.email);
    }
  }, [user]);

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const name = user.displayName;
      const photoUrl = user.photoURL;
      const email = user.email;

      const saveUser = { name, email, photoUrl };
      const response = await fetch("https://bhromonkari-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      if (!response.ok) {
        throw new Error(`Error saving user: HTTP status ${response.status}`);
      }

      const userCreateData = await response.json();
      if (userCreateData.insertedId) {
        Swal.fire({
          title: "Login Success",
          showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
          hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" },
        });
      }

      setUser(user);
      return result;
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
    sendSpendingData,
    fetchBudgetData,
    fetchSpendingData,
    getBudgetData,
    getSpendingData
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
