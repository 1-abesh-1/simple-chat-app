import React from 'react'
import { useSelector } from 'react-redux';

export default function Message({user,msg,date}) {

  const this_user= useSelector((state) => state.user.userData!==null?state.user.userData.name:null);






  return (<>
  
  <div className={this_user===user?'my-msg':'other-msg'}><b>{user}</b><span className='time-stamp'>{date}</span><br/>{msg}</div>
 </> )
}
