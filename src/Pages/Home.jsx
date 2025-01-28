import React,{useEffect} from 'react'
import Header from '../LayoutComponents/Header'
import Menu from '../LayoutComponents/Menu'
import Join from '../Pages/Join'
import { useSelector } from 'react-redux'
import Chatroom from '../Pages/Chatroom'
export default function Home() {



const room=useSelector((state) => state.room.roomData!==null?state.room.roomData:null)


  



  return (
    <div>
      <Header/>
            <Menu/>

{room?<Chatroom/>:<Join/>}
    </div>
  )
}
