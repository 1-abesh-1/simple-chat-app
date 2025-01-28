import React,{useState} from 'react'
import { logout } from '../firebase/auth';
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/Slices/userSlice";
export default function Menu() {

const[open,setOpen]=useState(false);
const dispatch = useDispatch();



//function to open menubar
const Toggle=()=>{
    if(open){
        setOpen(false);
    }else{
        setOpen(true);
    }
}
//function to open menubar ending
const Logout=()=>{
  dispatch(clearUser());
  location.reload()
  logout()
}




  return (
    <div className='menu'>
       <button onClick={()=>Toggle()} className='menu-toggle-btn'> <i className="fa fa-bars menu-bar-icon" id="toggleButton"></i></button> 
        
        {open?<div id="slidingDiv" className="menu-hidden">
<center><button className="logout" onClick={()=>Logout()} ><i className="fas fa-sign-out-alt"></i>log out</button></center>
        
            </div>:<></>} 

    </div>
  )
}
