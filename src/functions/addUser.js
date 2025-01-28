import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; // Adjust path to your Firebase configuration file

/**
 * Function to store a user document with bio, linkToSocial, and rooms array in Firestore
 * Only adds a new document if one doesn't already exist for the given userId.
 * @param {string} userId - The ID of the user document
 * @param {Object} userData - The user data to store
 */
export const addUser = async (userId, userData) => {
  try {
    // Reference to the user document
    const userRef = doc(db, "users", userId);

    // Check if the document already exists
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // If the document doesn't exist, create it
      await setDoc(userRef, userData);
      console.log(`User document added successfully for ID: ${userId}`);
    } 
  } catch (error) {
    console.error("Error adding user document:", error);
  }
};
