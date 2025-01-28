import React, { useEffect, useState,useRef} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Message from './Message'
import { useSelector } from 'react-redux';
import { sendMessage } from "../functions/roomFunctions";



export default function Chatbox() {
  const divRef = useRef(null);
const [msg,setMsg]=useState('')
const [Messages,setMess]=useState(null)


const room_id=useSelector((state)=>state.room.roomData)
const user=useSelector((state) => state.user.userData!==null?state.user.userData.name:null)



useEffect(() => {
  console.log(Messages)
  // Reference the Firestore collection
  const documentRef = doc(db, "rooms",room_id);

  // Listen to real-time updates
  const unsubscribe = onSnapshot(documentRef, (snapshot) => {
    if (snapshot.exists()) {
      const fetchedData = {
        id: snapshot.id, // Add the document ID
        ...snapshot.data(), // Spread the document fields
      };
      setMess(fetchedData); // Update your state with the document data
    } else {
      console.log("No such document!");
    }
  });

  // Cleanup listener on unmount
  return () => unsubscribe();
}, []);

useEffect(() => {
  divRef.current.scrollIntoView({ behavior: 'smooth' });
});

  return (
    <div className='chat scrollbar-true'>
      
{Messages!==null?<div className='msg-container'>{Messages.roomMessages.map(data=><Message user={data.userName} msg={data.message} date={data.timestamp}/>)}</div>:<></>}
<div class="chat-footer">   <textarea onChange={e=>setMsg(e.target.value)} placeholder="Type here..." rows={msg.length>=250?5:2} className="chat-input scrollbar-true" ></textarea>
     {msg!==''?<button className='send-btn' onClick={()=>sendMessage(room_id,user,msg)}><i class="fas fa-paper-plane send-icon"></i></button>:<></>}
      
       {// <i class="fa fa-microphone mic-icon"></i>
}
       
      {// <i class="fa fa-ellipsis-v three-dots" ></i>
}
</div>
<div ref={divRef} />


    </div>
  )
}
