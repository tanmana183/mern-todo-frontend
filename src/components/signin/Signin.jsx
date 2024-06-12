import React from 'react'
import "./signin.css"
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';


const Signin = () => {
  const dispatch=useDispatch()
  const history=useNavigate();
  const [Inputs,setInputs]=useState({
    email:"",
    
    password:""
  })
  const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value})
  }
  const submit= async(e)=>{
   
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", Inputs);
      
      sessionStorage.setItem("id",response.data.others._id)
      dispatch(authActions.login())
      history("/todo")
      
    } catch (error) {
      if (error.response) {
        
        console.error("Error response:", error.response.data);
        alert(error.response.data.message)
      } else if (error.request) {
    
        console.error("Error request:", error.request);
      } else {

        console.error("Error:", error.message);
      }
    }
  }
  return (
    <div className='signin'>
      <div className="port">
        <div className="row">
            <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
                <div className='d-flex flex-column  w-100 p-5'>
                    <input type="email"
                     name="email"
                      className="p-2 my-3 input-signin" 
                      placeholder='Enter your email'
                      value={Inputs.email}
                      onChange={change} />
                   
                    <input type="password"
                     name="password" 
                     className="p-2 my-3 input-signin"
                      placeholder='Enter your password'
                      value={Inputs.password} 
                      onChange={change}/>

                    <button className='btn-signin p-2' onClick={submit}>Sign In</button>
                </div>
            </div>
            <div className="col-lg-4 col-left column d-flex justify-content-center align-items-center " style={{height:"100vh"}}>
                <h1 className='text-center heading'>
                    Sign <br/> In
                </h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
