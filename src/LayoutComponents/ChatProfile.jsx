import React, { useEffect, useState,useRef} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { useSelector } from 'react-redux';
import { copyToClipboard } from "../functions/copyToClipboard";






export default function ChatProfile() {
const room_id=useSelector((state)=>state.room.roomData)
const [data,setData]=useState([])



useEffect(() => {
  // Reference the Firestore collection
  console.log(data)
  const documentRef = doc(db, "rooms",room_id);

  // Listen to real-time updates
  const unsubscribe = onSnapshot(documentRef, (snapshot) => {
    if (snapshot.exists()) {
      const fetchedData = {
        id: snapshot.id, // Add the document ID
        ...snapshot.data(), // Spread the document fields
      };
      setData(fetchedData); // Update your state with the document data
    } else {
      console.log("No such document!");
    }
  });

  // Cleanup listener on unmount
  return () => unsubscribe();
}, []);






  return (
    <div className='chat-profile scrollbar-true'>
 <center><b className='orange-color'>context board</b></center>

<h4 className='server-segment scrollbar-true orange-color'>{data.roomName}</h4>
<div className='server-segment white-color'>
{data.roomDetails}
</div>
<div className='server-segment white-color'>
 <span className="orange-color">id: </span><button className="btn-hide white-color" onClick={()=>copyToClipboard(room_id)}>{room_id} </button> 
</div>


<center><b className='orange-color'>members onboard</b></center>
{data.roomMembers?<div>{data.roomMembers.map((inside)=><div className="server-segment white-color">{inside.member}</div>)}</div>:<span></span>}
   </div>
  )
}
