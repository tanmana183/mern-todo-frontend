import React from 'react'
import "./signup.css";
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const history=useNavigate();
  const [Inputs,setInputs]=useState({
    email:"",
    username:"",
    password:""
  })
  const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value})
  }
  const submit= async(e)=>{
   
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/register", Inputs);
      if(response.data.message==="User with this email already exists"){
        alert(response.data.message)
      }
      else{
        alert(response.data.message)
        setInputs({
          email: "",
          username: "",
          password: ""
        });
        history("/signin")
      }
      
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
    <div className='signup'>
      <div className="port">
        <div className="row">
            <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
                <div className='d-flex flex-column  w-100 p-5'>
                    <input type="email" 
                    name="email" 
                    className="p-2 my-3 input-signup" 
                    placeholder='Enter your email' 
                    onChange={change}
                    value={Inputs.email} />

                    <input type="username" 
                    name="username" 
                    className="p-2 my-3 input-signup" 
                    placeholder='Enter your username' 
                    onChange={change}
                    value={Inputs.username} />

                    <input type="password" 
                    name="password" 
                    className="p-2 my-3 input-signup" 
                    placeholder='Enter your password' 
                    onChange={change}
                    value={Inputs.password} />

                    <button className='btn-signup p-2' onClick={submit}>Sign up</button>
                </div>
            </div>
            <div className="col-lg-4 col-left column d-flex justify-content-center align-items-center " style={{height:"100vh"}}>
                <h1 className='text-center heading'>
                    Sign <br/> Up
                </h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
