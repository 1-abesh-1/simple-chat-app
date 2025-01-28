import React,{useState,useEffect} from 'react'
import { createRoom ,joinRoom} from '../functions/roomFunctions';
import { nanoid } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';


export default function Joincard() {



  const [name, setServerName] = useState("");
  const [details, setServerdetails] = useState("");
  const [roomId, setRoomId] = useState("");
const[act,setAct]=useState('')
const user_id= useSelector((state) => state.user.userData!==null?state.user.userData.id:null);
const user_name= useSelector((state) => state.user.userData!==null?state.user.userData.name:null);




  return (
    <div className='Joincard'>
  
<button className='btn-j' onClick={()=>setAct((act==='' || act==='c')?'j':'')}><i className="fas fa-network-wired"></i> join</button><br/>
<button className='btn-j' onClick={()=>setAct((act===''|| act==='j')?'c':'')}><i class="fas fa-plus"></i> create</button><br/>



{act==='c'?<center>
<input
        className="in-j"
          type="text"
          placeholder="Server name"
          value={name}
          onChange={(e) => setServerName(e.target.value)}
        />
        
         <input
        className="in-j"
          type="text"
          placeholder="Server details"
          value={details}
          onChange={(e) => setServerdetails(e.target.value)}
        />
        <br/>
        {name!==''&&details!==''?<button onClick={()=>{createRoom(nanoid(),user_id,{name,details,user_name})
      
      setServerName("")
      setServerdetails("")
      }} className='btn-j2'>confirm</button>:<></>}<br/>
        </center>:<></>}





{act==='j'?<center>
<input
        className="in-j"
          type="text"
          placeholder="give server id to join"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        
        <br/>
        {roomId!==''?<button className='btn-j2' onClick={()=>{
         joinRoom(roomId,user_id,user_name);
         setRoomId("")
        }}>confirm</button>:<></>}<br/>
        </center>:<></>}
       
    </div>
  )
}
