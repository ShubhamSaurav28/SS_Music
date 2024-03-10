// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHJs_2UauHiWn5EhdtRaWErOAgUnoQNQI",
  authDomain: "ssmusic-fe377.firebaseapp.com",
  projectId: "ssmusic-fe377",
  storageBucket: "ssmusic-fe377.appspot.com",
  messagingSenderId: "569524890654",
  appId: "1:569524890654:web:bf8a848e25f691ac13920f",
  measurementId: "G-NWCNC618FP",
  databaseURL: "https://ssmusic-fe377-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);


// Function to handle user sign-up
const signUpUser = async (username, email, password) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Get the newly created user's UID
    const { user } = userCredential;
    const userId = user.uid;

    // Store additional user information (e.g., username) in Realtime Database
    const userRef = ref(db, `users/${userId}`);
    await set(userRef, {
      username: username,
      email: email,
    });

    // Return the user's UID
    return userId;
  } catch (error) {
    // Handle errors (e.g., invalid email, weak password, etc.)
    console.error('Error signing up:', error);
    throw error;
  }
};

// Function to handle user login
const loginUser = async (email, password) => {
  try {
    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Return the user's UID
    const { user } = userCredential;
    return user.uid;
  } catch (error) {
    // Handle errors (e.g., invalid email, wrong password, etc.)
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to handle user logout
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export { signUpUser,loginUser,logoutUser }



