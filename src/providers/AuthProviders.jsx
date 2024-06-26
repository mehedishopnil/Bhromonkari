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
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getBudgetData, setGetBudgetData] = useState(null);
  const [getSpendingData, setGetSpendingData] = useState([]);
  const [tourPlaces, setTourPlaces] = useState([]);
  const [tourPlan, setTourPlan] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [userData, setUserData] = useState([]);

  // Fetch all User data
  const fetchUserDatas = async () => {
    try {
      const response = await fetch('https://bhromonkari-server.vercel.app/user-data');
      if (!response.ok) {
        throw new Error(`Error fetching tour places: HTTP status ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching tour places:', error.message);
    }
  };

  useEffect(() => {
    fetchUserDatas(); // Call fetchTourPlaces when the component mounts
  }, []);



  // Fetch all tour places data
  const fetchTourPlaces = async () => {
    try {
      const response = await fetch('https://bhromonkari-server.vercel.app/tour-places');
      if (!response.ok) {
        throw new Error(`Error fetching tour places: HTTP status ${response.status}`);
      }
      const data = await response.json();
      
      setTourPlaces(data);
    } catch (error) {
      console.error('Error fetching tour places:', error.message);
    }
  };

  useEffect(() => {
    fetchTourPlaces(); // Call fetchTourPlaces when the component mounts
  }, []);


  // Fetch Reviews data
  const reviewsDatas = async () => {
    try {
      const response = await fetch('https://bhromonkari-server.vercel.app/reviews-data');
      if (!response.ok) {
        throw new Error(`Error fetching tour places: HTTP status ${response.status}`);
      }
      const data = await response.json();
      
      setReviewsData(data);
    } catch (error) {
      console.error('Error fetching tour places:', error.message);
    }
  };

  useEffect(() => {
    reviewsDatas(); // Call fetchTourPlaces when the component mounts
  }, []);



// Fetch Tour Plan data from the backend
const fetchTourPlan = async (email) => {
  try {
    console.log('Fetching tour plan data for:', email);
    const response = await fetch(`https://bhromonkari-server.vercel.app/tour-plan?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error fetching tour plan data: HTTP status ${response.status}`);
    }

    const data = await response.json();
    setTourPlan(data); // Assuming data is an array of tour plans
    console.log("Tour plan data retrieved successfully!", data);
  } catch (error) {
    console.error("Error retrieving tour plan data:", error.message);
  }
};

useEffect(() => {
  if (user && user.email) {
    fetchTourPlan(user.email);
  }
}, [user]);


// Fetch Tour Plan data from the backend
const fetchBookings = async (email) => {
  try {
    console.log('Fetching tour plan data for:', email);
    const response = await fetch(`https://bhromonkari-server.vercel.app/bookings?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error fetching tour plan data: HTTP status ${response.status}`);
    }

    const data = await response.json();
    setBookings(data); // Assuming data is a single object
    console.log("Tour plan data retrieved successfully!", data);
  } catch (error) {
    console.error("Error retrieving tour plan data:", error.message);
  }
};

useEffect(() => {
  if (user && user.email) {
    fetchBookings(user.email);
  }
}, [user]);


  // Fetch user data based on authentication state
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

  // Fetch user data from the backend
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

  // Create a new user
  const createUser = async (name, email, password) => {
    setLoading(true);
    try {
      // Check if the user already exists
      const existingUserResponse = await fetch(`https://bhromonkari-server.vercel.app/users?email=${email}`);
      if (!existingUserResponse.ok) {
        throw new Error(`Error checking existing user: HTTP status ${existingUserResponse.status}`);
      }
      const existingUsers = await existingUserResponse.json();
      if (existingUsers.length > 0) {
        throw new Error('User already registered');
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name,  });
      const saveUser = { name, email,  };
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

  // Update user data
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

  // Send budget data to the backend
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


  // Send spending data to the backend
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


  // Fetch budget data from the backend
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



  // Fetch spending data from the backend
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

  // Log in with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  

  // Log in with Google
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

    // Check if the user already exists in your backend
    const response = await fetch(`https://bhromonkari-server.vercel.app/users?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error checking user existence: HTTP status ${response.status}`);
    }

    const userData = await response.json();
    if (userData.length === 0) {
      // User doesn't exist, save the user data
      const saveUser = { name, email, photoUrl };
      const saveResponse = await fetch("https://bhromonkari-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      if (!saveResponse.ok) {
        throw new Error(`Error saving user: HTTP status ${saveResponse.status}`);
      }

      const userCreateData = await saveResponse.json();
      if (userCreateData.insertedId) {
        Swal.fire({
          title: "Login Success",
          showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
          hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" },
        });
      }
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

  // Log out
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };




  // Auth context value with all available functions and state
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
    getSpendingData,
    tourPlaces,
    tourPlan,
    bookings,
    reviewsData,
    userData
  };
 

  console.log(userData)
  // Fetch tour places when the component mounts
  useEffect(() => {
    fetchTourPlaces();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
