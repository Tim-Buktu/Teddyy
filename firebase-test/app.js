// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFdUVm5L9LK2l1SPhxYZwDpdhScAhPNq4",
  authDomain: "chappy-2e656.firebaseapp.com",
  projectId: "chappy-2e656",
  storageBucket: "chappy-2e656.firebasestorage.app",
  messagingSenderId: "1068390426814",
  appId: "1:1068390426814:web:ee58edc161f7018f5b96ef",
  measurementId: "G-8Z2XN4X71F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Function to sign up
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      console.log("User signed up:", user);
    })
    .catch((error) => {
      console.error("Error during sign-up:", error.message);
    });
}

// Function to log in
function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User logged in
      const user = userCredential.user;
      console.log("User logged in:", user);
    })
    .catch((error) => {
      console.error("Error during log-in:", error.message);
    });
}

// Function to log out
function logOut() {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Error during log-out:", error.message);
    });
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("No user is signed in.");
  }
});
