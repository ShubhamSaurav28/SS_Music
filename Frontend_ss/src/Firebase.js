import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhOun-_t42aWAz_9momxTgsXESl9A3jWk",
  authDomain: "ss-music-test.firebaseapp.com",
  projectId: "ss-music-test",
  storageBucket: "ss-music-test.appspot.com",
  messagingSenderId: "945115430928",
  appId: "1:945115430928:web:ba396914145f604db4ca95",
  measurementId: "G-F3DSFW47VE"
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

    // Set the display name for the user
    await updateProfile(userCredential.user, { displayName: username });

    // Store additional user information (e.g., username) in Realtime Database
    // const userRef = ref(db, `users/${userId}`);
    // await set(userRef, {
    //   username: username,
    //   email: email,
    // });

    // Return the user's UID
    return userId;
  } catch (error) {
    // Handle errors (e.g., invalid email, weak password, etc.)
    console.error('Error signing up:', error);
    throw error;
  }
};

// Function to handle user login with email and password
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

// Function to handle user login with Google
const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    return user.uid;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
};

// Function to handle user logout
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export { app,signUpUser, loginUser, logoutUser, loginWithGoogle };
