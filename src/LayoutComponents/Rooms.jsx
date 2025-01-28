import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import Room from './Room'




export default function Rooms() {

 const rooms= useSelector((state) => state.user.userData.rooms!==null?state.user.userData.rooms:null);

  return (
    <div className='Rooms scrollbar-true'>
<div className='head'><center><i class="fas fa-users"></i>  connnections</center></div>












{rooms.length!== 0?<Room rooms={rooms}/>:<div className='no_room'>
  <center>
  <i class="fas fa-exclamation-circle fa-xs text-danger"></i><br/> 
you have not joined or created any server
</center>
</div>}







    </div>
  )
}
