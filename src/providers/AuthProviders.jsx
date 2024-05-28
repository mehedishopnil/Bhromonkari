import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // User Part
  const createUser = async (name, photoUrl, email, password) => {
    setLoading(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update user's display Name
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoUrl,
      });

      // Users for backend server:
      const saveUser = { name: name, email: email };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saveUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! State: ${response.status}`)
      }

      const userCreateData = await response.json();

      if (userCreateData.insertedId) {
          Swal.fire({
               title: "Registration Success ",
               showClass: {
                 popup: `
                 animate__animated
                 animate__fadeInUp
                 animate__faster
               `,
               },
               hideClass: {
                 popup: `
                 animate__animated
                 animate__fadeOutDown
                 animate__faster
               `,
               },
             });
      }

      // Set the user in the state
      setUser(userCredential.user);
      return userCredential;

    } catch (error) {
      // Handle error
      console.log("Error updating profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Login Part
  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  // LogOut Part
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
