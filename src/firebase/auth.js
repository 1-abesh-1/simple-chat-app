import React,{useState,useEffect} from 'react'
import { auth } from '../firebase/firebase'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
} from "firebase/auth";


// Google Sign-In
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log("User signed in:", result.user);
  })
  .catch((error) => {
    console.error("Error during sign-in:", error.message);
  });
};

// GitHub Sign-In
export const signInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Error during sign-in:", error.message);
    });
};

// Email Sign-Up
export const signUpWithEmail = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Email Sign-In
export const signInWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign-Out
export const logout = async () => {
  return signOut(auth);
};