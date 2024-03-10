// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import Firebase functions for authentication
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the auth context
 const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage authentication state
  const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Firebase authentication
  const auth = getAuth();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Unsubscribe to the listener when the component unmounts
    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth,AuthProvider }