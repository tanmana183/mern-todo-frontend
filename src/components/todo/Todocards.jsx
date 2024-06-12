import React from 'react'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Todocards = ({title,body,id,delid,display,updateid,tobeUpdated}) => {
  return (
    <div className='p-3 todo-card'>
     <div>
        <h5>{title}</h5>
        <p className='todo-card-p'>{body.split("",77)}...</p>
     </div>
     <div className='d-flex justify-content-around'>
      <div className='d-flex justify-content-center align-items-center card-head px-2 py-1' 
       onClick={()=>{display("block")
       tobeUpdated(updateid);
       }}>
        <CiEdit className='card-icons'/>Update</div>
     <div className='d-flex justify-content-center align-items-center card-head px-2 py-1 text-danger'
      onClick={()=>{delid(id)}}>
      <MdDelete className='card-icons del' />Delete</div>
     </div>
    </div>
  )
}

export default Todocards
