import React from 'react'
import { copyToClipboard } from '../functions/copyToClipboard'
import { fetchRoom } from '../functions/fetchRoom'
import { useDispatch } from 'react-redux'
export default function Room({rooms}) {

const dispatch=useDispatch()

  return (
    <div>
{rooms.map(room=><div className='room'>
    <span className='name '>{room.roomName} </span>
     <span className='id'>{room.roomId}
          <button onClick={()=>copyToClipboard(room.roomId)}><i class="fas fa-copy"></i></button></span>
           <span><button className='visit' onClick={()=>fetchRoom(dispatch,room.roomId)}><i class="fas fa-car"></i> visit</button></span> 



</div>)}
    </div>
  )
}
