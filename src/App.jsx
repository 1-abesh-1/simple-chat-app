import { useState,useEffect } from 'react'

//importing pages
import Auth from './Pages/Auth'
import Home from './pages/Home'
import { auth } from './firebase/firebase'
import { useDispatch } from 'react-redux';

import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { addUser } from './functions/addUser';
import { fetchUser } from './functions/fetchUser';
import Loading from './LayoutComponents/Loading';
import { useSelector } from 'react-redux';





function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  
  const dispatch = useDispatch();
  const data=useSelector((state)=>state.user.userData)

  const [userObj, setUser] = useState(null);

  // Check if the user is logged in using Firebase's onAuthStateChanged
  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      
      if (user) {
       

        setUser(user); // If the user is logged in, store the user object
        
    addUser(user.uid,{
          "id":user.uid,
          "name":user.displayName,
         "bio": "This is a sample bio.",
         "socialLinks": [],
         "rooms":[],
         "createdAt": Date()
       
     })//adding user data to firestore


     
     fetchUser(dispatch,user.uid)









      } else {
        setUser(null); // If no user is logged in, set user to null
      }
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  });

  useEffect(() => {
    if (localStorage.getItem('theme') === "dark") {
      import("./themes/App-dark.css"); // Dynamically import dark.css
    } else {
      import("./themes/App-light.css"); // Dynamically import light.css
    }
    //localStorage.setItem("theme", theme); // Save theme to localStorage
  }, [theme]);


  const toggleTheme = () => {
    localStorage.setItem('theme',theme === "dark" ? "light" : "dark")
    //setTheme(theme === "dark" ? "light" : "dark");
    location.reload();
  };

  return (
    <><Router>
      <div className='cover'/>
     <button className='theme-toggle' onClick={toggleTheme}>{theme==='dark'?<span><i class="fas fa-moon active"></i><i class="fas fa-sun"></i></span>:<span><i class="fas fa-moon"></i><i class="fas fa-sun active"></i></span>}</button>
    
     <Routes>
        {/* Route for Auth page */}
        <Route
          path="/auth"
          element={userObj ? <Navigate to="/home" /> : <Auth />}
        />
        {/* Route for Home page */}
        <Route
          path="/home"
          element={userObj ?<>{data!==null?<Home/>:<Loading/>}</> : <Navigate to="/auth" />}
  
        />
        {/* Default redirect */}
        <Route path="/" element={userObj ? <Navigate to="/home" /> : <Navigate to="/auth" />} />
      </Routes>
     
    </Router>:
     

   </>
  )
}

export default App
