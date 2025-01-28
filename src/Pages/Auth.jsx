
import React, { useState } from "react";
import { fetchUser } from "../functions/fetchUser";
import {addUser} from '../functions/addUser'
import {
  signInWithGoogle,
  signInWithGithub,
  signUpWithEmail,
  signInWithEmail,
  logout,
} from "../firebase/auth"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";





const Auth= () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const handleEmailSignUp = async () => {
    if(name!=="" && email!=="" && password!==""){
    try {
      // Sign up the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Set the displayName for the newly created user
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name, // Replace with a dynamic value if needed
      });
  
      alert("Sign-up successful! Welcome, " + user.displayName);
  
      // Optionally reload the page or perform another action
      location.reload();
    } catch (error) {
      alert(error.message);
    }


  }else{
    alert("fill sign up form properly")
  }

  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      alert("Sign-in successful!");
      
      location.reload();
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
    signInWithGoogle();
      
    } catch (error) {
      alert("Google Sign-In Failed: " + error.message);
      console.log(error)
    }
  };

  const handleGithubSignIn = async () => {
    try {
  signInWithGithub();
      
    } catch (error) {
      console.log(error)
      alert("GitHub Sign-In Failed: " + error.message);
    }
  };

  return (
    <div className="Auth">
      
      <center>
    <div className="card">
      
      <div>
        <input
        className="in"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <input
        className="in"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
        className="in"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
       <button onClick={handleEmailSignUp} className="btn">Sign Up</button>
        <button onClick={handleEmailSignIn} className="btn">Sign In</button><br/>
        <button onClick={handleGoogleSignIn} className="alt-btn"><i class="fab fa-google"></i>            Sign in with Google </button><br/>
      <button onClick={handleGithubSignIn} className="alt-btn"> <i class="fab fa-github"></i>             Sign in with GitHub</button>

      </div>
      </div></center>
    </div>
  );
};

export default Auth;
