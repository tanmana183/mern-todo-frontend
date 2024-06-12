import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Todoupdate = ({display,update}) => {
  useEffect(() => {
    
    if (update) {
      setInputs({ title: update.title, body: update.body });
    }
  }, [update]);
  const [Inputs,setInputs]=useState({title:'',body:''})
  const change=(e)=>{
    const {name,value}=e.target
    setInputs({...Inputs,[name]:value})
  }
  const submit=async()=>{
    await axios.put(`http://localhost:5000/api/v2/updateTask/${update._id}`,Inputs).then((response)=>{
      console.log(response);
      toast.success("Task updated")
    })
   
    display("none")
  }
  return (
    <div className='p-5  d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update your task</h3>
      <input type="text"  className='todo-inputs my-4 w-100 p-3'value={Inputs.title} onChange={change} name='title'/>
      <textarea className='todo-inputs w-100 p-3' value={Inputs.body} onChange={change} name='body'/>
      <div>
      <button className='btn btn-dark my-4' onClick={submit}>Update</button>
      <button className='btn btn-danger my-4 mx-3'onClick={()=>{display("none")}}>Close</button>
      </div>
    </div>
  )
}

export default Todoupdate
